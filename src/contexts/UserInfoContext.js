// Provider와 Context 정의 (사용자 정보 관련)

import React, { createContext, useState, useEffect } from 'react';

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 사용자 정보를 업데이트하는 함수
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserInfoContext.Provider value={{ user, updateUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;