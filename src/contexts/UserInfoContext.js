// Provider와 Context 정의 (사용자 정보 관련)
<<<<<<< HEAD
/*eslint-disable*/
import React, { createContext, useState, useEffect } from 'react';
=======
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../api/request.ts';
>>>>>>> develop

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 페이지 새로고침 시 로컬스토리지에서 user 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // 로컬스토리지에서 user 정보를 불러와서 상태 설정
    }
  }, []);

  // 사용자 정보를 업데이트하는 함수
  const updateUser = (userData) => {
    setUser(userData);
    // user 정보를 로컬스토리지에 저장
    localStorage.setItem('user', JSON.stringify(userData));  // 로그인 후 user를 로컬스토리지에 저장
  };

  // 로그아웃 함수
  const logoutUser = async () => {
    try {
      await request.post('/api/v1/auth/logout', {}); // 서버로 로그아웃 요청 보내기
      
      // 성공하면 로컬스토리지에서 user 정보 & 토큰 삭제
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error.message);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.'); // 에러 알림
    }
  };

  // 로그인 여부 체크 (user 값이 있으면 로그인 상태)
  const isAuthenticated = !!user;

  return (
    <UserInfoContext.Provider value={{ user, isAuthenticated, updateUser, logoutUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;
