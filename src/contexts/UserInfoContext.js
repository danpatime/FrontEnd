// Provider와 Context 정의 (사용자 정보 관련)
<<<<<<< HEAD
/*eslint-disable*/
import React, { createContext, useState, useEffect } from 'react';
=======

import React, { createContext, useState } from 'react';
>>>>>>> eb70e5d2652d150105aa5b6d898226fb96c4a45c

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