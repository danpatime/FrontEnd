import axios, { AxiosInstance, AxiosHeaders  } from 'axios';
import { AxiosError } from 'axios';

class Request {
  private api: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshQueue: (() => void)[] = []; // 401 처리 중 다른 요청을 큐에 저장

  constructor() {
    this.api = axios.create({
      baseURL: "/",
    });

    // 요청 전 최신 토큰을 헤더에 추가
    this.api.interceptors.request.use((config) => {
      // 기존 헤더와 새로운 헤더 병합
      config.headers = new AxiosHeaders({
        ...config.headers, // 기존 헤더 유지
        ...this.getHeaders(), // 헤더에 최신 토큰 추가
      });
      return config;
    });

    // 응답 인터셉터: 401 에러 처리
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          return this.handle401Error(error);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  // 헤더에 토큰 추가
  getHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }

  // 토큰 업데이트 함수
  updateToken(newToken : string) {
    localStorage.setItem('authToken', newToken); // 새 토큰을 로컬스토리지에 저장
    this.api.defaults.headers.Authorization = `Bearer ${newToken}`; // Axios 기본 헤더 업데이트
  }

  // 401 에러 발생 시 토큰 재발급 처리
  private async handle401Error(error: AxiosError) {
    if (this.isRefreshing) {
      // 토큰이 갱신되는 동안 대기 후 재요청
      return new Promise((resolve) => {
        this.refreshQueue.push(() => resolve(this.api.request(error.config!)));
      });
    }

    this.isRefreshing = true;

    try {
      const { data } = await axios.post('/api/v1/auth/refresh');
      const newToken = data.refreshToken;
      this.updateToken(newToken);

      // 대기 중인 요청들 재시도
      this.refreshQueue.forEach((callback) => callback());
      this.refreshQueue = [];

      return this.api.request(error.config!); // 401이 발생했던 요청 다시 실행
    } catch (refreshError) {
      return Promise.reject(this.handleError(refreshError));
    } finally {
      this.isRefreshing = false;
    }
  }

  // 에러 핸들링
  handleError(error: any) {
    if (error.response) {
      // 서버가 응답했으나 에러 상태 코드인 경우
      return new Error(error.response.data.message || 'API Error');
    } else if (error.request) {
      // 요청은 보내졌으나 응답을 받지 못한 경우
      return new Error('No response received from server.');
    } else {
      // 기타 오류
      return new Error(error.message || 'Unknown Error');
    }
  }


  // GET 요청
  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params }); 
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST 요청
  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  // PUT 요청
  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  // DELETE 요청
  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }


}

const request = new Request();

export default request;