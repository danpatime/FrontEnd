import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import MypageLayout from '../../components/layout/MypageLayout';
import ScheduleCalendar from '../../components/common/ScheduleCalendar';
import defaultProfileImage from "../../assets/images/default-profile.jpg";
import useResumeData from "../../hooks/useResumeData";


const MyResume = () => {
  const navigate = useNavigate();
  const resumeData = useResumeData();
  const BASE_URL = "https://danpat.s3.ap-northeast-2.amazonaws.com"; 
  const profileImageUrl = resumeData?.profileImage
  ? `${BASE_URL}/${resumeData.profileImage}`
  : defaultProfileImage;

  const handleNavigation = (mode) => {
    navigate("/mypage/resume-form", { state: { modeType: mode } });
  };

  // 근무지 데이터 쉼표로 구분된 문자열로 변환
  const workLocationText = resumeData?.workLocations?.length > 0
  ? resumeData.workLocations.join(", ")
  : "데이터 없음";


  return (
    <MypageLayout>
      <Page>
        {resumeData ? (
          <>
            <Title>나의 이력서 <ButtonContainer>
              <button onClick={() => handleNavigation("edit")}>수정</button>
              {/* <button>삭제</button> */}
            </ButtonContainer></Title>

            <Profile>
              <img src={profileImageUrl} alt="프로필 사진" />
              <div>
                <h1>{resumeData.name || '데이터 없음'}</h1>
                <div className="profile-items">
                  <span>생년월일</span> <p>{resumeData.birthDate || '데이터 없음'}</p>
                </div>
                <div className="profile-items">
                  <span>이메일</span> <p>{resumeData.email || '데이터 없음'}</p>
                </div>
                <div className="profile-items">
                  <span>전화번호</span> <p>{resumeData.phoneNumber || '데이터 없음'}</p>
                  <Call><p>통화가능시간</p> <span>{resumeData.availableTime || '데이터 없음'}</span></Call>
                </div>
                <div className="profile-items">
                  <span>주소</span> <p>{resumeData.address || '데이터 없음'} {resumeData.detailAddress || ''}</p>
                </div>
                <div className="profile-items">
                  <span>성별</span> <p>{resumeData.gender || '데이터 없음'}</p>
                </div>
              </div>
            </Profile>

            <Section>
              <h3>자기소개서</h3>
              <p>{resumeData.introduction || '데이터 없음'}</p>
            </Section>

            <Section>
              <h3>희망근무조건</h3>
              <div id="preferences">
                <div>
                  <span>근무지</span>
                  <p>{workLocationText}</p>
                </div>
                <div>
                  <span>희망업직종</span>
                  <p>{Array.isArray(resumeData.jobPreferences) ? resumeData.jobPreferences.join(", ") : '데이터 없음'}</p>
                </div>
              </div>
            </Section>

            <Section>
              <h3 id="worktime">근무가능시간</h3>
              <ScheduleCalendar isClickEnabled={false} events={resumeData.workHours}/>  {/* 날짜와 일정 클릭 비활성화 */}
            </Section>

            <Section>
              <h3>외부 경력</h3>
              <div id="external-experience-container">
                {resumeData.externalCareerResponse && Array.isArray(resumeData.externalCareerResponse) && resumeData.externalCareerResponse.length > 0 ? (
                  resumeData.externalCareerResponse.map((exp, index) => (
                    <div className="external-experience" key={index}>
                      {exp || '데이터 없음'}
                    </div>
                  ))
                ) : (
                  <p>등록한 경력이 없습니다.</p>
                )}
              </div>
            </Section>

            <Section>
              <h3>내부 경력</h3>
              <div id="internal-experience-container">
                {resumeData.internalExperience && Array.isArray(resumeData.internalExperience) && resumeData.internalExperience.length > 0 ? (
                  resumeData.internalExperience.map((exp, index) => (
                    <div className="internal-experience" key={index}>
                      <h3>{exp.company || '데이터 없음'}</h3>
                      <p>{exp.date || '데이터 없음'}</p>
                    </div>
                  ))
                ) : (
                  <p>데이터 없음</p>
                )}
              </div>
            </Section>

          </>
        ) : (
          <NoResume>
            <p>아직 이력서를 등록하지 않았습니다.</p>
            <button onClick={() => handleNavigation("register")}>이력서 등록</button>
          </NoResume>
        )}
      </Page>
    </MypageLayout>
  );
};

export default MyResume;


const Page = styled.div`
  padding: 20px 30px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1000px;
  max-width: 1400px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;
`

const Profile = styled.div`
  display: flex;
  gap: 35px;
  padding: 20px 10px;

  img {
    background-size: cover;
    border-radius: 50px;
    width: 160px;
    height: 160px;
    border-radius: 50px;
    object-fit: cover; 
    object-position: center;
  }

  h1 {
    margin: 10px 0 15px;
  }

  .profile-items {
    height: 34px;
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;

    span {
      font-weight: 600;
      color: #6D6D6D;
    }

    p {
      font-weight: 500;
      color: #767676;
    }
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
  }

  #worktime {
    margin-bottom: 0;
  }

  #preferences {
    display: flex;
    flex-direction: column;
    gap: 5px;

    div {
      display: flex;
      gap: 17px;
      margin: 5px 0;
    }

    span {
      font-weight: 600;
      color: #6D6D6D;
    }
  }

  #external-experience-container {
    display: flex;
    gap: 6px;
  }

  .external-experience {
    border: 1px solid #767676;
    border-radius: 20px;
    padding: 6px 20px;
    font-size: 16 px;
  }

  #internal-experience-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .internal-experience {
    width: 814px;
    border: 1px solid #E8E8E8;
    border-radius: 10px;
    padding: 20px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  button {
    padding: 10px 15px;
    font-size: 14px;
    color: #767676;
    border: 1px solid #E8E8E8;
    border-radius: 10px;
    background-color: unset;
    cursor: pointer;

    &:hover {
      background-color: #7B4B42;
      color: #ffffff;
    }
  }
`

const NoResume = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
  }

  button {
    border-radius: 15px;
    font-size: 16px;
    font-weight: 600;
    padding: 15px 55px;
  }
`

const Call = styled.div`
  display: flex;
  gap: 5px;
  background-color: #F7F8FA;
  border-radius: 10px;
  padding: 5px 15px;
  font-size: 16px;

  span {
    color: #767676;
  } 

  p {
    color: #6D6D6D;
  }
`