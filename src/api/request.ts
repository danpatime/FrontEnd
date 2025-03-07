/* eslint-disable no-console */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
// import { useContext } from "react";
// import { UserInfoContext } from "../contexts/UserInfoContext.tsx";

class Request {
  private api: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshQueue: (() => void)[] = []; // 401 처리 중 다른 요청을 큐에 저장


  constructor() {
    this.api = axios.create({ baseURL: "/" });


    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        console.log("📢 Axios 에러 발생:", error.response); // 추가
        if (error.response?.status === 401) {
          console.log("🔄 401 감지, handle401Error 실행"); // 추가
          return this.handle401Error(error);
        }
        return Promise.reject(error);
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

  // 로그인 시, AccessToken 저장
updateToken(accessToken: string) {
  localStorage.setItem('authToken', accessToken); 
  this.api.defaults.headers.Authorization = `Bearer ${accessToken}`;
}

// 401 처리 함수 (RefreshToken을 사용한 재발급 요청)
private async handle401Error(error: AxiosError) {
  const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

  if (originalRequest._retry) {
    console.warn("🔄 401 감지: 이미 갱신 시도한 요청, 즉시 리턴");
    return Promise.reject(error);
  }
  originalRequest._retry = true;

  if (this.isRefreshing) {
    console.log("🔄 다른 요청이 이미 토큰 갱신 중, 대기열에 추가");
    return new Promise((resolve) => {
      this.refreshQueue.push(() => {
        originalRequest.headers!.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
        resolve(this.api(originalRequest));
      });
    });
  }

  this.isRefreshing = true;
  
  try {
    console.log("🔄 RefreshToken을 사용해 새 AccessToken 요청...");
    
    // ✅ refreshToken은 HttpOnly 쿠키에서 자동 포함됨
    const { data } = await this.api.post(
      "/api/v1/auth/refresh",
      {},
      { withCredentials: true }
    );

    console.log("✅ 토큰 갱신 성공, 새 토큰 저장!");
    localStorage.setItem("authToken", data.accessToken);

    // 🔄 대기 중이던 요청 재시도
    this.refreshQueue.forEach((callback) => callback());
    this.refreshQueue = []; // 큐 초기화

    // 🔄 원래 요청 재시도
    originalRequest.headers!.Authorization = `Bearer ${data.accessToken}`;
    return this.api(originalRequest);
  } catch (refreshError) {
    console.error("❌ 토큰 갱신 실패: ", refreshError);

    // 🚨 리프레시 토큰도 만료된 경우 로그아웃 처리
    console.log("🚨 로그아웃 처리 진행...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/"; // 로그인 페이지로 리디렉션

    return Promise.reject(refreshError);
  } finally {
    this.isRefreshing = false; // 갱신 상태 종료
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