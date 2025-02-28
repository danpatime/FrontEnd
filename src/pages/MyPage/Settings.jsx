/* eslint-disable no-console */

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MypageLayout from "../../components/layout/MypageLayout";
import request from '../../api/request.ts';

const Settings = () => {
  // const [owner, setOwner] = useState('');

  // useEffect(() => {
  //   const userData = localStorage.getItem('user'); // 로컬스토리지에서 user 데이터를 가져옴

  //   if (userData) {
  //     const parsedUser = JSON.parse(userData); // JSON 문자열을 객체로 변환
  //     const role = parsedUser.role;

  //     if (role === 'ROLE_EMPLOYEE') {
  //       setOwner('worker');
  //     } else if (role === 'ROLE_EMPLOYER') {
  //       setOwner('owner');
  //     }
  //   }
  // }, []);
  
  const [selectedOption, setSelectedOption] = useState({
    // "resume-access": "", // 이력서 열람 설정
    "email-notification": "", // 이메일 알림 설정
    "account-deletion": "", // 회원탈퇴 동의
  });

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const emailResponse = await request.get("/api/v1/setting/email-consent");
        const emailReceivable = emailResponse.emailReceivable ?? false;
  
        setSelectedOption((prev) => ({
          ...prev,
          "email-notification": emailReceivable ? "yes" : "no",
        }));
  
      } catch (error) {
        console.error("⚠️ Error fetching settings data:", error.message);
      }
    };
  
    fetchSettingsData();
  }, []);


  const handleRadioChange = async (section, value) => {
    try {
      setSelectedOption((prev) => ({ ...prev, [section]: value }));
  
      const response = await request.post("/api/v1/setting/email-consent", {
        emailReceivable: value === "yes", 
      });
        
      console.log("✅ 이메일 수신 동의 변경 성공:", response);
      alert("변경사항이 적용되었습니다.");
    } catch (error) {
      console.error("⚠️ 이메일 수신 동의 변경 실패:", error.message);
      alert("변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAccountDeletion = async () => {
    if (selectedOption["account-deletion"] !== "agree") {
      alert("회원탈퇴를 진행하려면 안내사항에 동의해야 합니다.");
      return;
    }
  
  
    const isConfirmed = window.confirm("정말로 회원탈퇴를 진행하시겠습니까?");
    if (!isConfirmed) return;
  
    try {
      const response = await request.delete("/api/v1/account/my");
  
      if (response.status === 200) {
        alert("회원탈퇴가 완료되었습니다.");
        window.location.href = "/"; 
      } else {
        alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("⚠️ 회원탈퇴 요청 실패:", error.message);
      alert("회원탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  
  return (
    <MypageLayout>
      <Page>
        <Title>설정</Title>
        <div>
          {/* 이력서 열람 설정 섹션: 사장일 경우 숨김 */}
          {/* {owner !== 'owner' && (
            <Section>
              <SubTitle>이력서 열람 설정</SubTitle>
              <p>기업의 제안을 계속 받으시겠습니까?</p>
              <div className="select-box">
                <label>
                  <input
                    type="radio"
                    name="resume-access"
                    checked={selectedOption["resume-access"] === "yes"}
                    onChange={() => handleRadioChange('resume-access', 'yes')}
                  />
                  네
                </label>
                <label>
                  <input
                    type="radio"
                    name="resume-access"
                    checked={selectedOption["resume-access"] === "no"}
                    onChange={() => handleRadioChange('resume-access', 'no')}
                  />
                  아니오
                </label>
              </div>
            </Section>
          )} */}

          {/* 이메일 알림 수신 동의 섹션 */}
          <Section>
            <SubTitle>이메일 알림 설정</SubTitle>
            <div className="select-box">
              <label>
                <input
                  type="radio"
                  name="email-notification"
                  checked={selectedOption["email-notification"] === "yes"}
                  onChange={() => handleRadioChange('email-notification', 'yes')}
                />
                수신 동의
              </label>
              <label>
                <input
                  type="radio"
                  name="email-notification"
                  checked={selectedOption["email-notification"] === "no"}
                  onChange={() => handleRadioChange('email-notification', 'no')}
                />
                수신 비동의
              </label>
            </div>
          </Section>

          {/* 회원탈퇴 안내 섹션 */}
          <Section>
            <SubTitle>회원탈퇴 안내</SubTitle>
            <p>회원탈퇴 전 꼭 확인해주세요.</p>
            <div id="description">
              <p className="number">1. 동일한 아이디로 재가입 불가</p>
              <p className="no-number">
                탈퇴 신청 시 즉시 처리되며, 해당 아이디로 재가입/로그인이 불가능합니다.
              </p>
              <p className="number">2. 탈퇴 즉시 회원정보 삭제</p>
              <p className="no-number">
                탈퇴 즉시 이력서 및 구직활동 정보가 모두 삭제되며, 삭제된 정보는 복구되지 않습니다.
                <br />
                단, 공공적 성격의 게시물은 삭제되지 않으므로 탈퇴 전 미리 삭제해주세요.
              </p>
              <p className="number">3. 이용 정보 일정기간 보관</p>
              <p className="no-number">
                계약 기록은 5년간 보관합니다. 부적합 정보, 이용제한 및 징계에 관한 기록은 일정기간 보관합니다.
              </p>
            </div>
            <div className="select-box">
              <label>
                <input
                  type="checkbox"
                  name="account-deletion"
                  checked={selectedOption["account-deletion"] === "agree"}
                  onChange={() =>
                    setSelectedOption((prev) => ({
                      ...prev,
                      "account-deletion": prev["account-deletion"] === "agree" ? "" : "agree",
                    }))
                  }
                />
                위 안내사항을 숙지했으며 이에 동의합니다.
              </label>
            </div>
            <button onClick={handleAccountDeletion}>회원탈퇴</button>
          </Section>
        </div>
      </Page>
    </MypageLayout>
  );
};

export default Settings;


const Page = styled.div`
  padding: 30px 30px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1000px;
  max-width: 1400px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 35px;
    padding-left: 10px;
  }
`

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;
  margin-bottom: 25px;
`

const Section = styled.div`

  p {
    font-size: 16px;
  }

  #description {
    padding: 5px 10px 15px;
    margin-top: 20px;
  }

  .number {
    font-size: 15px; 
  }

  .no-number {
    font-size: 14px;
    color: #9C9C9C;
    margin-bottom: 10px;
  }

  label {
    display: flex;
    gap: 10px;
  }

  button {
    margin-top: 35px;
    width: 105px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;

    &: hover {
      background-color: #6E3C3B;
      color: #ffffff;
    }
  }

  .select-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const SubTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

