import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageLayout from "../../components/layout/MypageLayout"
import AddKeyword from '../../components/common/AddKeyword';
import ScheduleCalendar from '../../components/common/ScheduleCalendar';
import CallTimeInput from "../../components/modal/CallTimeInput";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DefaultProfile from "../../assets/images/default-profile.jpg";
import EditIcon from "../../assets/icons/ic_edit.png";

// 더미 데이터 (수정 모드에서만 사용)
const dummyData = {
  profileImage: 'https://dummyimage.com/100x100/000/fff', // 더미 프로필 이미지 URL
  name: '홍길동',
  birthdate: { year: '1990', month: '01', day: '01' },
  email: 'hong@domain.com',
  phoneNumber: '010-1234-5678',
  address: '서울특별시 강남구 테헤란로',
  detailAddress: '123-45',
  gender: 'male',
  callTime: '9:00 AM - 6:00 PM',
  addressSearch: '서울특별시 강남구 테헤란로', // 주소 검색할 때 사용
};

const ResumeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.modeType || 'register';
  const [isEditingEmail, setIsEditingEmail] = useState(mode === "register");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  // const [bname, setBname] = useState(""); // 동 이름 (법정동명)


  // 상태 초기화 (등록 모드일 경우 빈 값, 수정 모드일 경우 더미 데이터)
  const [profileImage, setProfileImage] = useState(mode === "edit" ? dummyData.profileImage : DefaultProfile);
  const [name, setName] = useState(mode === "edit" ? dummyData.name : '');
  const [birthdate, setBirthdate] = useState(mode === "edit" ? dummyData.birthdate : { year: '', month: '', day: '' });
  const [email, setEmail] = useState(mode === "edit" ? dummyData.email : '');
  const [phoneNumber, setPhoneNumber] = useState(mode === "edit" ? dummyData.phoneNumber : '');
  const [address, setAddress] = useState(mode === "edit" ? dummyData.address : '');
  const [detailAddress, setDetailAddress] = useState(mode === "edit" ? dummyData.detailAddress : '');
  // const [gender, setGender] = useState(mode === "edit" ? dummyData.gender : '');
  const [callTime, setCallTime] = useState(mode === "edit" ? dummyData.callTime : '');
  // const [addressSearch, setAddressSearch] = useState(mode === "edit" ? dummyData.addressSearch : '');

  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["png", "jpg", "jpeg"];

      if (!allowedExtensions.includes(fileExtension)) {
        alert("PNG 또는 JPG 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const enableEmailEdit = () => {
    setIsEditingEmail(true);
  };

  // 전화번호 입력을 처리하는 함수
  const handlePhoneNumberChange = (e) => {
    // 숫자만 필터링
    let value = e.target.value.replace(/[^0-9]/g, '');

    // 000-0000-0000 형식으로 변환
    if (value.length <= 3) {
      // 3자리 이하일 경우 그냥 그대로 두기
    } else if (value.length <= 7) {
      value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    } else {
      value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
    }

    setPhoneNumber(value); // 새로운 전화번호 값을 상태에 업데이트
  };

  // 통화가능시간 모달 열기
  const openCallModal = () => {
    setIsCallModalOpen(true);
  };

  // 통화가능시간 모달 닫기
  const closeCallModal = () => {
    setIsCallModalOpen(false);
  };

  // 통화 가능 시간 업데이트 함수
  const updateCallTime = (start, end) => {
    setCallTime(`${start}~${end}`);
  };

  const handleAddressSearch = () => {
    // 다음 우편번호 API 호출
    new window.daum.Postcode({
      oncomplete: (data) => {
        // 도로명 주소 또는 지번 주소 설정
        setAddress(data.address);

        // 법정동명 설정 (data.bname에 동 이름 있어요)
        // if (data.bname !== "") {
        //   setBname(data.bname);
        // } else {
        //   setBname("");
        // }
      },
    }).open();
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <MypageLayout>
      <Page>
        <Title>
          <IoIosArrowBack size={26} onClick={goBack}/>
          {mode === "edit" ? "이력서 수정" : "이력서 등록"}
        </Title>

        <ProfileUpload>
          <img id="upload" src={profileImage} alt="프로필 사진" />
          <label htmlFor="file-upload">
            <img id="edit" src={EditIcon} alt="이미지 등록" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
          />
        </ProfileUpload>

        <Section>
          <h3>회원정보</h3>
          <UserInfo>
            <div className='userinfo-items'>
              <label>이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='userinfo-items'>
              <label>생년월일</label>
              <div id="birthdate-input">
                <div><input id="year" type="number" value={birthdate.year} onChange={(e) => setBirthdate({ ...birthdate, year: e.target.value })} /><span>년</span></div>
                <div><input id="month" type="number" value={birthdate.month} onChange={(e) => setBirthdate({ ...birthdate, month: e.target.value })} /><span>월</span></div>
                <div><input id="day" type="number" value={birthdate.day} onChange={(e) => setBirthdate({ ...birthdate, day: e.target.value })} /><span>일</span></div>
              </div>
            </div>

            {mode === "register" || isEditingEmail ?  (
              <div className="userinfo-items item-grid">
                <div className="button-grid">
                  <label>이메일</label>
                  <div className="button-input">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="이메일을 입력하세요"
                    />
                    <button>인증번호</button>
                  </div>
                </div>
                <div className="button-grid">
                  <div></div>
                  <div className="button-input">
                    <input
                      type="text"
                      placeholder="인증번호를 입력하세요"
                    />
                    <button>확인</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="userinfo-items">
                <label>이메일</label>
                <div className="button-input">
                  <input
                    type="email"
                    value={email}
                    readOnly={mode === "edit"}
                    onChange={handleEmailChange}
                  />
                  <button onClick={enableEmailEdit}>변경하기</button>
                </div>
              </div>
            )}

            <div className='userinfo-items item-grid'>
              <div className="phone-number">
                <label>전화번호</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength="13" // 최대 길이 설정 (000-0000-0000 형식으로 13자리)
                  placeholder="000-0000-0000"
                />
              </div>
              <div className="phone-number">
                <div></div>
                <Call>
                  <div onClick={openCallModal}>
                    <p>통화가능시간</p>
                    <span>{callTime}</span> 
                    <IoIosArrowForward />
                  </div>
                </Call>
              </div>
            </div>

            <div className="userinfo-items item-grid">
              <div className="button-grid">
                <label>주소</label>
                <div className="button-input">
                  <input
                    type="text"
                    value={address} // 도로명 주소 또는 지번 주소 표시
                    readOnly
                    placeholder="주소를 입력해주세요"
                  />
                  <button type="button" onClick={handleAddressSearch}>
                    주소찾기
                  </button>
                </div>
              </div>
              {address && (
                <div className="button-grid">
                  <div></div>
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={handleDetailAddressChange}
                    placeholder="상세주소를 입력해주세요"
                  />
                </div>
              )}
              
              {/* {bname && ( <div> <span>동 이름: {bname}</span> </div> )} */}
            </div>

            

            <div className="userinfo-items">
              <label>성별</label>
              <div id="ismale">
                <div>
                  <input type="radio" id="male" name="gender" value="male" />
                  <label htmlFor="male">남성</label>
                </div>
                <div>
                  <input type="radio" id="female" name="gender" value="female" />
                  <label htmlFor="female">여성</label>
                </div>
              </div>
            </div>
          </UserInfo>
        </Section>

        <Section>
          <h3>자기소개서</h3>
          <textarea></textarea>
        </Section>

        <Section>
          <h3>희망근무조건<span>(최대 5개)</span></h3>
          <AddKeyword title="근무지" />
          <AddKeyword title="희망업직종" />
        </Section>

        <Section>
          <h3>근무가능시간</h3>
          <ScheduleCalendar />
        </Section>

        <Section>
          <h3>외부 경력</h3>
          <div id="description">
            단팥 플랫폼 외 다른 플랫폼을 통해 체결된 계약으로 근무하신 경력을 작성해 주세요.
            <ul>
              <li>경력은 근무 기간과 상관없이 근무 횟수를 기준으로 기재해 주시기 바랍니다.</li>
              <li>작성 시 모든 내용은 사실에 근거해 정확히 입력해 주세요.</li>
            </ul>
          </div>
          <AddKeyword title="외부경력"/>
        </Section>

        <ButtonContainer>
          <button>완료</button>
        </ButtonContainer>
        {isCallModalOpen && (
           <CallTimeInput
            onClose={closeCallModal}
            onSave={updateCallTime}
            initialStartTime={callTime.split("~")[0] || "00:00"} // 시작 시간
            initialEndTime={callTime.split("~")[1] || "00:00"}   // 종료 시간
          />
        )}
      </Page>
    </MypageLayout>
  );
};

export default ResumeForm;

const Page = styled.div`
  padding: 20px 30px 30px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1000px;
  max-width: 1400px;

  button {
    cursor: pointer;
  }
`

const Title = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;

  svg {
    cursor: pointer;
  }
`

const ProfileUpload = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 20px 10px;

  #upload {
    width: 160px;
    height: 160px;
    border-radius: 50px;
    object-fit: cover; 
    object-position: center;
  }

  #edit {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40px;
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }
`

const Section = styled.div`
  margin: 40px 0 50px;
  padding-left: 20px;
  font-size: 16px;

  h3 {
    margin-bottom: 8px;
    font-size: 17px;
    color: #000000;

    span {
      font-size: 14px;
      font-weight: 500;
      margin-left: 5px;
      color: #6D6D6D;
    }
  }

  #description {
    color: #999999;
    font-size: 14px;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
  }

  textarea {
    width: 814px;
    height: 100px;
    border: 1px solid #E9E9E9;
    border-radius: 10px;
    outline: none;
    padding: 15px 18px;
    font-size: 16px;
    resize: none; /* 크기 조절 금지 */
  }
`

const UserInfo = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    border: 1px solid #E9E9E9;
    border-radius: 10px;
    padding:  12px 15px;
    font-size: 15px;
    outline: none;
    width: 520px;
  }

  label {
    display: inline-block;
  }

  .userinfo-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    widht: 100%;
  }

  .item-grid {
    flex-direction: column;
    gap: 7px;
  }

  .button-grid {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #birthdate-input {
    width: 520px;
    display: flex;
    gap: 20px;

    div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  #year {width: 140px;}
  #month, #day {width: 85px;}

  .button-input {
    display: flex;
    gap: 10px;
    input {width: 400px;}

    button {
      width: 110px;
      border-radius: 10px;
      background-color: #E9E9E9;
      font-size: 14px;
      color: #000000;
    }
  }

  .phone-number {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #ismale {
    display: flex;
    gap: 45px;
    align-items: center;
    width: 520px;
    height: 43px;

    input {
      width: fit-content;
    }

    div {
      display: flex;
      gap: 12px;
    }
  }
`

const Call = styled.div`
  width: 520px;
  
  div {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #F7F8FA;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 14px;
    cursor: pointer;
  }

  span {
    color: #767676;
    font-weight: 600;
  } 

  p {
    color: #6D6D6D;
  }

  svg {
    margin-top: 2px;
  }
`

const ButtonContainer = styled.div`
  padding-left: 20px;

  button {
    width: 138px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #ffffff;
    background-color: #7B4B42;
    border-radius: 10px;
    outline: none;
  }
`