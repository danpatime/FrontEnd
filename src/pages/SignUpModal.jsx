import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from "../components/common/Modal";

import IcWorker from '../assets/icons/ic_worker.png';
import IcOwner from '../assets/icons/ic_owner.png';
import { IoIosArrowForward } from "react-icons/io";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";


function SignUpModal({ onClose }) {
  const navigate = useNavigate();

  const handleSignUp = (type) => {
    navigate('/signup', { state: { userType: type } });
  };

  return (
      <Modal onClose={onClose} title="회원가입" width="600px">
        <UserType>
          <TypeOption onClick={() => handleSignUp('worker')}>
            <div class="option-info">
              <img id="worker" src={IcWorker} alt="worker" />
              <span>개인 회원</span>
              <p>원하는 시간, 딱 맞는 알바,<br/>지금 시작해보세요!</p>
            </div>

            <div class="signup-button">
              <p>개인회원 가입하기</p>
              <IoIosArrowForward/>
            </div>

            <div id="sns-signup">
              <SNSSignUpButton>
                <SiNaver size={10}/>
                네이버
              </SNSSignUpButton>
              <div id="line"></div>
              <SNSSignUpButton>
                <RiKakaoTalkFill size={14}/>
                카카오톡
              </SNSSignUpButton>
            </div>
          </TypeOption>
          <TypeOption onClick={() => handleSignUp('owner')}>
            <div class="option-info">
              <img id="owner" src={IcOwner} alt="owner" />
              <span>기업 회원</span>
              <p>필요한 순간, 바로 투입<br/>가능한 알바를 찾고 있다면?</p>
              <p id="small">*알바를 채용하시려는 개인사업, 사업체직원 포함</p>
            </div>

            <div class="signup-button">
              <p>기업회원 가입하기</p>
              <IoIosArrowForward />
            </div>

            <div class="filler" />
          </TypeOption>
        </UserType>
      </Modal>
  );
}

export default SignUpModal;


const UserType = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 590px;
  margin-top: 15px;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const TypeOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: center;
  width: 245px;
  height: 295px;
  border: 1px solid #E7E7E7;
  border-radius: 15px;

  #worker {
    width: 40px;
    height: 40px;
    margin: 36px 0 18px;
  }

  #owner {
    width: 65px;
    height: 65px;
    margin-top: 28px;
  }

  .option-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 178px;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }

  p {
    color: #707070;
    margin-bottom: 2px;
  }

  #small {
    font-size: 10px;
  }

  .signup-button {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  #sns-signup {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-evenly;
    border-top: 1px solid #E7E7E7;
  }

  #line {
    width: 1px;
    height: 100%;
    background-color: #E7E7E7;
  }

  .filler {
    height: 40px;
  }

  &:hover .signup-button, &:hover .signup-button p {
    color: #D4A017; 
  }
`;

const SNSSignUpButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
