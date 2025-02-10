import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../api/request.ts';
import Layout from "../components/layout/Layout";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const SignUpPage = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'worker';
  const isOwner = userType === 'owner';
  const [error, setError] = useState(''); // 비밀번호 일치 여부
  const [emailVerified, setEmailVerified] = useState(false); 
  const navigate = useNavigate();

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
    loginId: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    email: '',
    phoneNumber: '',
    confirmEmail: '',
    businessRegistrationNumber: '',
    businessName: '',
    representationName: '',
    location: '',
    role: '',
    nationality: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    // 전화번호 입력 필드인 경우 숫자만 필터링 후 포맷 적용
    if (name === "phoneNumber") {
      newValue = value.replace(/[^0-9]/g, ''); // 숫자만 허용
  
      if (newValue.length > 3 && newValue.length <= 7) {
        newValue = newValue.replace(/(\d{3})(\d{0,4})/, '$1-$2');
      } else if (newValue.length > 7) {
        newValue = newValue.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
      }
    }
  
    // 상태 업데이트
    setFormData({
      ...formData,
      [name]: newValue, 
    });
  
    // 비밀번호 확인 처리
    if (name === 'confirmPassword') {
      if (newValue !== formData.password) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    }
  };

  const handleSendEmailCode = async () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    try {
      await request.post("api/v1/account/email/code", {
        email: formData.email,
      });
  
      alert("인증번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      alert("이메일 인증번호 요청에 실패했습니다.");
      console.error(error);
    }
  };

  
  const handleVerifyEmailCode = async () => {
    if (!formData.confirmEmail) {
      alert("인증번호를 입력해주세요.");
      return;
    }
  
    try {
      await request.post("api/v1/account/email/verification", {
        email: formData.email,
        code: formData.confirmEmail,
      });

      alert("이메일 인증이 완료되었습니다.");
      setEmailVerified(true); // 인증 완료 상태 저장
      } catch (error) {
      alert("이메일 인증 요청에 실패했습니다.");
      console.error(error);
    }
  };

  const handleVerifyBusinessNumber = async () => {
    if (!formData.businessRegistrationNumber || !formData.businessName || !formData.representationName || !formData.businessOpenDate) {
      alert("사업자 정보를 모두 입력해주세요.");
      return;
    }
  
    try {
      await request.post("/api/v1/account/validation/business-number", {
        businessRegistrationNumber: formData.businessRegistrationNumber,
        businessName: formData.businessName,
        representationName: formData.representationName,
        businessOpenDate: formData.businessOpenDate,
      });

        alert("사업자등록번호가 인증되었습니다.");
      } catch (error) {
      alert("사업자등록번호 인증 요청에 실패했습니다.");
      console.error(error);
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location, // 기존 location 유지
            zipcode: data.zonecode, // 우편번호 설정 (화면에는 표시 안 함)
            address: data.address,  // 주소 설정 (화면에는 표시)
          },
        }));
      },
    }).open();
  };
  

  const handleSignUp = async () => { // async 키워드 추가
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return; 
    }
  
    const requiredFields = !isOwner
      ? ["loginId", "password", "email", "name", "nickname", "phoneNumber", "nationality"]
      : Object.keys(formData); 
  
    const isFormComplete = requiredFields.every((key) => {
      if (key === "location") {
        return formData.location.address !== "" && formData.location.zipcode !== "";
      }
      return formData[key] !== "";
    });
    const isAgreementComplete = agreement.terms && agreement.privacy;
  
    if (!isFormComplete) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
  
    if (!isAgreementComplete) {
      alert('필수 동의 항목에 체크해주세요.');
      return;
    }

    // 회원가입 요청 데이터 구성
    const requestData = isOwner
    ? {
        loginId: formData.loginId,
        password: formData.password,
        email: formData.email,
        businessRegistrationNumber: formData.businessRegistrationNumber,
        businessName: formData.businessName,
        representationName: formData.representationName,
        businessOpenDate: formData.businessOpenDate || "", // 필요하면 추가
        location: {
          zipcode: formData.location.zipcode,
          address: formData.location.address,
          detailAddress: formData.location.detailAddress || "",
        },
        nationality: formData.nationality || "KOREAN",
        role: "EMPLOYER",
        phoneNumber: formData.phoneNumber,
      }
    : {
        loginId: formData.loginId,
        password: formData.password,
        name: formData.name,
        nickname: formData.nickname,
        email: formData.email,
        nationality: formData.nationality || "KOREAN",
        role: "EMPLOYEE",
        phoneNumber: formData.phoneNumber,
        emailReceivable: agreement.email,
      };
  
    const endpoint = !isOwner
      ? "api/v1/account/sign-up/employee"
      : "api/v1/account/sign-up/employer";
  
    try {
      await request.post(endpoint, requestData);

        alert("회원가입이 완료되었습니다! 로그인 후 이용해주세요.");
        navigate("/");
      } catch (error) {
      alert(error.message || "회원가입에 실패했습니다. 나중에 다시 시도해주세요.");
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
            <Input type="text" name="loginId" value={formData.loginId} onChange={handleChange} required />
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

          {!isOwner && (
            <>
            <InputBox>
              <InputLabel>이름 <span>*</span></InputLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </InputBox>

            <InputBox>
              <InputLabel>닉네임 <span>*</span></InputLabel>
              <Input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
            </InputBox>
            </>
          )}


          <InputBox className="button">
            <InputLabel>이메일 <span>*</span></InputLabel>
            <div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={emailVerified} // 인증 완료되면 입력 비활성화
              />
              <button onClick={handleSendEmailCode} disabled={emailVerified}>인증번호</button>
            </div>
          </InputBox>

          <InputBox className="button">
            <InputLabel></InputLabel>
            <div>
              <Input
                type="text"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                placeholder="인증번호 입력"
                required
                disabled={emailVerified} // 인증 완료되면 입력 비활성화
              />
              <button onClick={handleVerifyEmailCode} disabled={emailVerified}>확인</button>
            </div>
          </InputBox>

          <InputBox>
            <InputLabel>연락처 <span>*</span></InputLabel>
            <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} maxLength="13" placeholder="000-0000-0000" required />
          </InputBox> 
        </div>


        {isOwner && (
          <div id="store-info" className="info-section">
            <InputBox>
              <InputLabel>대표자명 <span>*</span></InputLabel>
              <Input type="text" name="representationName" value={formData.representationName} onChange={handleChange} required />
            </InputBox>

            <InputBox>
              <InputLabel>회사/상점명 <span>*</span></InputLabel>
              <Input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />
            </InputBox>

            <InputBox className="button">
              <InputLabel>
                회사/상점 주소 <span>*</span>
              </InputLabel>
              <div>
                <Input
                  type="text"
                  name="address"
                  value={formData.location.address} // 주소 표시
                  readOnly
                  placeholder="주소를 입력해주세요"
                  required
                />
                <button type="button" onClick={handleAddressSearch}>주소찾기</button>
              </div>
            </InputBox>

            {/* 상세주소 입력 */}
            {formData.location.address && (
              <InputBox>
                <InputLabel></InputLabel>
                <Input
                  type="text"
                  name="detailAddress"
                  value={formData.location.detailAddress || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        detailAddress: e.target.value,
                      },
                    }))
                  }
                  placeholder="상세주소를 입력해주세요"
                  required
                />
              </InputBox>
            )}

            <InputBox>
              <InputLabel>사업시작일<span>*</span></InputLabel>
              <Input type="date" name="businessOpenDate" value={formData.businessOpenDate} onChange={handleChange} required />
            </InputBox>

            <InputBox className="button">
              <InputLabel>사업자등록번호 <span>*</span></InputLabel>
              <div>
                <Input type="text" name="businessRegistrationNumber" value={formData.businessRegistrationNumber} onChange={handleChange} required />
                <button onClick={handleVerifyBusinessNumber}>확인</button>
              </div>
            </InputBox>
          </div>
        )}

        <InputBox>
          <RadioBox>
            <RadioItem>
              <Input
                type="radio"
                name="nationality"
                value="KOREAN"
                checked={formData.nationality === "KOREAN"}
                onChange={handleChange}
              />
              내국인
            </RadioItem>

            <RadioItem>
              <Input
                type="radio"
                name="nationality"
                value="FOREIGNER"
                checked={formData.nationality === "FOREIGNER"}
                onChange={handleChange}
              />
              외국인
            </RadioItem>
          </RadioBox>
        </InputBox>

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
      cursor: pointer;
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

const RadioBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  margin-top: 30px;
  width: 160px;
`

const RadioItem = styled.label`
  display: flex;
  font-size: 14px;
  gap: 8px;

  input {
    width: 14px;
  }
`

const ErrorText = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red;
`;