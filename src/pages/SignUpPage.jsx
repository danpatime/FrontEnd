import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const SignUpPage = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'worker';
  const isOwner = userType === 'owner';
  const [error, setError] = useState(''); // 비밀번호 일치 여부

  const [agreement, setAgreement] = useState({
    all: false,
    age: false,    // 만 15세 이상 동의
    terms: false,  // 이용약관 동의
    privacy: false, // 개인정보 처리방침 동의
    email: false,   // 이메일 수신 동의
  });

  // 전체 동의 상태 변경
  const handleAllChange = (e) => {
    const isChecked = e.target.checked;
    setAgreement({
      all: isChecked,
      age: isChecked,
      terms: isChecked,
      privacy: isChecked,
      email: isChecked,
    });
  };

  // 개별 체크박스 상태 변경
  const handleIndividualChange = (key) => (e) => {
    const isChecked = e.target.checked;
    setAgreement((prev) => {
      const updatedAgreement = { ...prev, [key]: isChecked };
      // 전체 동의 체크 여부 갱신
      const allChecked = Object.values(updatedAgreement).slice(1).every(Boolean); // 첫 항목 제외
      return { ...updatedAgreement, all: allChecked };
    });
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    email: '',
    confirmEmail: '',
    businessNumber: '',
    companyName: '',
    ceoName: '',
    companyAddress: '',
    agreement: false,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    }
  };


  const handleSignUp = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return; 
    }

    if (userType === 'worker') {
      const isFormComplete = Object.keys(formData).every((key) => {
        if (['businessNumber', 'companyName', 'ceoName', 'companyAddress'].includes(key)) {
          return true; // 해당 필드는 비어 있어도 괜찮음
        }
        return formData[key] !== ''; // 그 외의 필드는 비어 있으면 안됨
      });
  
      // 모든 동의가 이루어졌는지 확인
      const isAgreementComplete = Object.values(agreement).every((value) => value === true);
  
      if (!isFormComplete) {
        alert('모든 정보를 입력해주세요.');
        return;
      }
  
      if (!isAgreementComplete) {
        alert('필수 동의 항목에 체크해주세요.');
        return;
      }
  
      alert('worker 회원가입을 진행합니다.');
    }
  
    if (userType === 'owner') {
      const isFormComplete = Object.values(formData).every((value) => value !== '');
      const isAgreementComplete = agreement.terms && agreement.privacy;
  
      if (!isFormComplete) {
        alert('모든 정보를 입력해주세요.');
        return;
      }
  
      if (!isAgreementComplete) {
        alert('필수 동의 항목에 체크해주세요.');
        return;
      }
  
      alert('owner 회원가입을 진행합니다.');
    }
  };

  return (
    <Layout>
      <SignUpForm>
        <Title>{userType === 'worker' ? '개인 회원가입' : '기업 회원가입'}</Title>
        
        <AgreementSection>
          <InputLabel>
            약관 동의 <span>*</span>
          </InputLabel>

          <div id="agreement-box">
            <AgreementCheckbox>
              <input type="checkbox" checked={agreement.all} onChange={handleAllChange}/> 
              <div>
                전체동의
                <p>선택 항목 포함 모든 항목에 동의합니다.</p>
              </div>
            </AgreementCheckbox>

            <div id="line"></div>

            {!isOwner && (
            <AgreementCheckbox>
              <input type="checkbox" checked={agreement.age} onChange={handleIndividualChange('age')}/> <div id="light-color"><span>(필수)</span> 만 15세 이상입니다</div>
            </AgreementCheckbox>
            )}
            <AgreementCheckboxMore>
              <div>
                <input type="checkbox" checked={agreement.terms} onChange={handleIndividualChange('terms')}/> <span>(필수)</span> 서비스 이용약관동의
              </div>
              <IoIosArrowForward/>
            </AgreementCheckboxMore>
            <AgreementCheckboxMore>
              <div>
                <input type="checkbox" checked={agreement.privacy} onChange={handleIndividualChange('privacy')}/> <span>(필수)</span> 개인정보 수집 및 이용 동의
              </div>
              <IoIosArrowForward/>
            </AgreementCheckboxMore>
            <AgreementCheckboxMore>
              <div id="free-select">
                <input type="checkbox" checked={agreement.email} onChange={handleIndividualChange('email')}/> <span>(선택)</span> 이메일 수신 동의
              </div>
              <IoIosArrowForward/>
            </AgreementCheckboxMore>
          </div>
        </AgreementSection>

        <div className="info-section">
          <InputBox>
            <InputLabel>아이디 <span>*</span></InputLabel>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </InputBox>

          <InputBox>
            <InputLabel>비밀번호 <span>*</span></InputLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </InputBox>

          <InputBox>
            <InputLabel>비밀번호 재확인 <span>*</span></InputLabel>
            <div>
              <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              {error && <ErrorText>{error}</ErrorText>}
            </div>
          </InputBox>

          <InputBox>
            <InputLabel>이름 <span>*</span></InputLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </InputBox>

          <InputBox>
            <InputLabel>닉네임 <span>*</span></InputLabel>
            <Input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
          </InputBox>


          {/* TODO: 버튼 클릭 후 요청 성공하면 인증번호 필드 아래에 이메일 확인하라는 문구 추가 */}
          <InputBox className="button">
            <InputLabel>이메일 <span>*</span></InputLabel>
            <div>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              <button>인증번호</button>
            </div>
          </InputBox>


          {/* TODO: 인증번호 확인되면 해당 필드와 버튼 비활성화 */}
          <InputBox className="button">
            <InputLabel></InputLabel>
            <div>
              <Input type="text" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} placeholder="인증번호 입력" required />
              <button>확인</button>
            </div>
          </InputBox>
        </div>

        {isOwner && (
          <div id="store-info" class="info-section">
            <InputBox className="button">
              <InputLabel>사업자등록번호 <span>*</span></InputLabel>
              <div>
                <Input type="text" name="businessNumber" value={formData.businessNumber} onChange={handleChange} required />
                <button>확인</button>
              </div>
            </InputBox>

            <InputBox>
              <InputLabel>회사/상점명 <span>*</span></InputLabel>
              <Input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </InputBox>

            <InputBox>
              <InputLabel>대표자명 <span>*</span></InputLabel>
              <Input type="text" name="ceoName" value={formData.ceoName} onChange={handleChange} required />
            </InputBox>

            <InputBox>
              <InputLabel>회사/상점 주소 <span>*</span></InputLabel>
              <Input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required />
            </InputBox>
          </div>
        )}

        <ConfirmButton onClick={handleSignUp}>가입하기</ConfirmButton>
      </SignUpForm>
    </Layout>
  );
};

export default SignUpPage;


const SignUpForm = styled.div`
  background-color: #ffffff;
  padding: 55px 42px;
  border-radius: 20px;
  width: 740px;
  margin: 0 auto;
  color: #000000;

  display: flex;
  flex-direction: column;
  align-items: center;

  .info-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  #store-info {
    margin-top: 60px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 60px;
`;

const AgreementSection = styled.div`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;

  #agreement-box {
    width: 100%;
    border: 1px solid #E9E9E9;
    border-radius: 10px;
    padding: 22px 20px;
    margin-top: 12px;
  }

  #line {
    width: 100%;
    height: 1px;
    background-color: #E9E9E9;
    margin: 18px 0;
  }
`;

const AgreementCheckbox = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0 12px;

  input {
    margin-top: 4px;
  }

  div {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: #858585;
  }

  span {
    color: #4E4E4E;
  }

  #light-color {
    color: #757575;
  }
`;

const AgreementCheckboxMore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 12px;
  color: #B3B3B3;

  div {
    display: flex;
    gap: 10px;
    color: #858585;
  }

  span {
    color: #4E4E4E;
  }

  #free-select {
    color: #A4A4A4;

    span {
      color: #A4A4A4;
    }
  }

  svg {
    cursor: pointer;
  }
` 

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.button {
    input {
      width: 400px;
    }

    button {
      width: 90px;
      padding: 10px 0;
      border-radius: 10px;
      background-color: #E9E9E9;
      color: #000000;
      font-weight: 500;
    }

    div {
      display: flex;
      gap: 10px;
    }
  }
`

const InputLabel = styled.label`
  font-size: 16px;
  padding-left: 10px;
  display: block;
  min-width: fit-content;

  span {
    color: #F45D42;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 500px;
  padding: 10px;
  border: 1px solid #E9E9E9;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
`;

const ConfirmButton = styled.button`
  background-color: #9C6B60; 
  color: #ffffff;
  margin-top: 68px;
  padding: 13px 90px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

const ErrorText = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red;
`;