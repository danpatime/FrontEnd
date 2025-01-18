import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import MypageLayout from '../../components/layout/MypageLayout';
import ScheduleCalendar from '../../components/common/ScheduleCalendar';
import defaultProfileImage from "../../assets/images/default-profile.jpg";


const MyResume = () => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // 테스트 데이터
    const testData = {
      profileImage: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjZfMTAw%2FMDAxNjkzMDQ4MTgwMzg2.0VBcbQc9LNhiudLzdUizVK3-UpU8YCq-cOY3s-c5Pn8g.4GPuscETBrJax8vWP3nvsWC0pMAIaEvR6bcPeLkBknIg.PNG.bj2604%2F%25C0%25CE%25BD%25BA%25C5%25B8%25BF%25EB.png&type=sc960_832",
      name: "김단팥",
      birthDate: "2000.01.01",
      email: "mail@naver.com",
      phoneNumber: "010-1111-2222",
      availableTime: "09:00 - 18:00",
      address: "부산광역시 남구 대연동",
      gender: "여성",
      introduction: "긍정적인 마인드를 가지고 매 순간 집중하며 최선을 다하여 맡은 일을 깔끔하게 해내겠습니다.",
      workLocations: ["대연동", "용호동"],
      jobPreferences: ["카페", "편의점", "패스트푸드"],
      externalExperience: ["카페 10회", "편의점 5회"],
      internalExperience: [
        { company: "크리스피크림도넛 부산 본점", date: "2024.10.04" },
        { company: "크리스피크림도넛 부산 본점", date: "2024.10.04" },
      ],
    };

    // 데이터를 로드했다고 가정
    setResumeData(testData);
    // setResumeData(null);
  }, []);

  return (
    <MypageLayout>
      <Page>
        {resumeData ? (
          <>
            <Title>나의 이력서 <ButtonContainer>
              <button>수정</button>
              <button>삭제</button>
            </ButtonContainer></Title>

            <Profile>
            <img src={resumeData.profileImage || defaultProfileImage} alt="프로필 사진" />
              <div>
                <h1>{resumeData.name}</h1>
                <div className="profile-items">
                  <span>생년월일</span> <p>{resumeData.birthDate}</p>
                </div>
                <div className="profile-items">
                  <span>이메일</span> <p>{resumeData.email}</p>
                </div>
                <div className="profile-items">
                  <span>전화번호</span> <p>{resumeData.phoneNumber}</p>
                  <Call><p>통화가능시간</p> <span>{resumeData.availableTime}</span></Call>
                </div>
                <div className="profile-items">
                  <span>주소</span> <p>{resumeData.address}</p>
                </div>
                <div className="profile-items">
                  <span>성별</span> <p>{resumeData.gender}</p>
                </div>
              </div>
            </Profile>

            <Section>
              <h3>자기소개서</h3>
              <p>{resumeData.introduction}</p>
            </Section>

            <Section>
              <h3>희망근무조건</h3>
              <div id="preferences">
                <div>
                  <span>근무지</span> <p>{resumeData.workLocations.join(", ")}</p>
                </div>
                <div>
                  <span>희망업직종</span> <p>{resumeData.jobPreferences.join(", ")}</p>
                </div>
              </div>
            </Section>

            <Section>
              <h3 id="worktime">근무가능시간</h3>
              <ScheduleCalendar isClickEnabled={false} />  {/* 날짜와 일정 클릭 비활성화 */}
            </Section>

            <Section>
              <h3>외부 경력</h3>
              <div id="external-experience-container">
                {resumeData.externalExperience.map((exp, index) => (
                  <div className="external-experience" key={index}>
                    {exp}
                  </div>
                ))}
              </div>
            </Section>

            <Section>
              <h3>내부 경력</h3>
              <div id="internal-experience-container">
                {resumeData.internalExperience.map((exp, index) => (
                  <div className="internal-experience" key={index}>
                    <h3>{exp.company}</h3>
                    <p>{exp.date}</p>
                  </div>
                ))}
              </div>
            </Section>
          </>
        ) : (
          <NoResume>
            <p>아직 이력서를 등록하지 않았습니다.</p>
            <button>이력서 등록</button>
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
    background-color: #D9D9D9;
    background-size;
    border-radius: 50px;
    width: 160px;
    height: 160px;
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