import axios, { AxiosInstance, AxiosHeaders  } from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class Request {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });

    // 요청 전 최신 토큰을 헤더에 추가
    this.api.interceptors.request.use((config) => {
      // 기존 헤더와 새로운 헤더 병합
      config.headers = new AxiosHeaders({
        ...config.headers, // 기존 헤더 유지
        ...this.getHeaders(), // 새로운 헤더 추가
      });
      return config;
    });
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
  updateToken(newToken) {
    localStorage.setItem('authToken', newToken); // 새 토큰을 로컬스토리지에 저장
    this.api.defaults.headers.Authorization = `Bearer ${newToken}`; // Axios 기본 헤더 업데이트
  }

  // 에러 핸들링
  handleError(error) {
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

export default Request;