import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from '../contexts/useUserInfo.js';
import request from "../api/request.ts";

const SocialLoginCallbackKakao = () => {
  const navigate = useNavigate();
  const { updateUser } = useUserInfo();

  useEffect(() => {
    const handleSocialLogin = async () => {
      // 현재 URL에서 code 값 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        alert("로그인 코드가 없습니다.");
        navigate("/login");
        return;
      }

      try {
        // 백엔드 API에 GET 요청 보내기
        const response = await request.get(`/oauth2/callback/naver?code=${code}`);

        // 받은 데이터에서 필요한 값 추출
        const { accessToken, userId, userRole, name, profile, email } = response.data;

        // 사용자 정보 업데이트
        updateUser({ id: userId, role: userRole, name: name, profileImage: profile, email: email });


        // Axios 헤더 업데이트
        request.updateToken(accessToken);

        // 로그인 성공하면 홈으로 이동
        navigate("/");
      } catch (error) {
        console.error("소셜 로그인 처리 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    handleSocialLogin();
  }, [navigate]);

  return <div>네이버 로그인 중입니다...</div>;
};

export default SocialLoginCallbackKakao;
