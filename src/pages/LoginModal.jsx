import React, { useState } from "react";
import styled from 'styled-components';
import request from "../api/request.ts";
import { useUserInfo } from '../contexts/useUserInfo';
import { useNavigate } from 'react-router-dom';
import Modal from "../components/common/Modal";

import IcNaver from '../assets/icons/ic-naver.png';
import IcKakao from '../assets/icons/ic-kakao.png';


function LoginModal({ onClose }) {
  const [selectedUserType, setSelectedUserType] = useState("worker");  // 개인/기업 회원 선택
  const [loginId, setLoginId] = useState(""); 
  const [password, setPassword] = useState("");
  const { updateUser } = useUserInfo();
  const navigate = useNavigate();

  // 로그인 버튼 클릭 핸들러
  const handleLogin = async () => {
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const requestData = {
      loginId: loginId,
      password: password,
    };

    try {
      const response = await request.post("/api/v1/auth/login", requestData);

      const { accessToken, userId, userRole, name, profile, nickname } = response;

      // 사용자 정보 업데이트 (나중에 이름 추가)
      updateUser({ id: userId, role: userRole, name: name, profileImage: profile, nickname: nickname });

      // 토큰 저장 및 Axios 헤더 업데이트
      request.updateToken(accessToken);

      navigate('/');
      onClose(); // 로그인 후 모달 닫기
      } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
      <Modal onClose={onClose} title="로그인">
        <UserType>
          <UserTypeOption
            isSelected={selectedUserType === "worker"}
            onClick={() => setSelectedUserType("worker")}
          >
            <h3>개인 회원</h3>
            <span>(알바생)</span>
          </UserTypeOption>

          <UserTypeOption
            isSelected={selectedUserType === "owner"}
            onClick={() => setSelectedUserType("owner")}
          >
            <h3>기업 회원</h3>
            <span>(사장님)</span>
          </UserTypeOption>
        </UserType>

        <LoginForm>
          <InputSection>
            <Input
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputSection>
          <Button onClick={handleLogin}>로그인</Button>
        </LoginForm>
        
        <OptionSection>
          <span>회원가입</span>
          |
          <span>아이디 찾기</span>
          |
          <span>비밀번호 찾기</span>
        </OptionSection>

        {selectedUserType === "worker" && (
          <SimpleLogin>
            <Guide>
              <div></div>
              <span>간편 로그인</span>
              <div></div>
            </Guide>
            <div id="sns-button-section">
              <NaverButton id="naver" />
              <KakaoButton id="kakao" />
            </div>
          </SimpleLogin>
        )}
      </Modal>
  );
}

export default LoginModal;

const Input = styled.input`
  width: 230px;
  height: 40px;
  box-sizing: border-box;
  padding: 5px 18px;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  font-size: 14px;
  outline: none; 
`;

const Button = styled.button`
  width: 115px;
  padding: 10px;
  background-color: #9C6B60; /* 버튼 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #774F46; /* 버튼 hover 색상 */
  }
`;

const UserType = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin-bottom: 30px;
`;

const UserTypeOption = styled.div`
  width: 170px;
  text-align: center;
  padding-bottom: 10px;
  cursor: pointer;
  border-bottom: ${({ isSelected }) => (isSelected ? "2px solid #9C6B60" : "none")};
  color: ${({ isSelected }) => (isSelected ? "black" : "#9F9F9F")};

  h3 {
    font-size: 16px;
    font-weight: 500;
  }

  span {
    font-size: 13px;
  }
`;

const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const OptionSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 310px;
  margin-bottom: 45px;
  color: #999999;
  font-size: 12px;

  span {
    cursor: pointer;

    &:hover {
    color: #000;
    }
  }
`

const SimpleLogin = styled.div`
  width: 100%;

  #sns-button-section {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 60px;
  }
`

const Guide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999999;
  padding: 0 30px;
  margin-bottom: 23px;

  div {
    height: 1px;
    width: 130px;
    background-color: #C8C8C8;
  }

  span {
    padding: 0 14px;
    font-size: 12px;
  }
`

const SNSButton = styled.button`
  background-color: revert-layer;
  border-radius: 100%;
  border: none;
  padding: 0;
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
`

const NaverButton = styled(SNSButton)`
  background-image: url(${IcNaver});
`;

const KakaoButton = styled(SNSButton)`
  background-image: url(${IcKakao});
`;