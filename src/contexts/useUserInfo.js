// UserInfoContext를 사용하는 커스텀 훅

import { useContext } from "react";
import { UserInfoContext } from "./UserInfoContext.tsx";

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};