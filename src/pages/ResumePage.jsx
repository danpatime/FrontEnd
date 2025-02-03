import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ScheduleCalendar from '../components/common/ScheduleCalendar';
import defaultProfileImage from "../assets/images/default-profile.jpg";
import { ReactComponent as Bookmark } from "../assets/icons/bookmark.svg";
import KeyboardArrowDown from '../assets/icons/keyboard_arrow_down.svg';

// ReviewToggle 컴포넌트 추가
const ReviewToggle = ({ reviewData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('리뷰자세히보기');

  const toggleReview = () => {
    setIsOpen(!isOpen);
    setButtonText(isOpen ? '리뷰자세히보기' : '간단히 보기');
  };

  return (
    <ReviewWrapper>
      <DropdownButton onClick={toggleReview}>
        {buttonText}
        <Icon src={KeyboardArrowDown} alt="arrow icon" isOpen={isOpen} />
      </DropdownButton>
      {isOpen && (
        <ReviewContent>
          <p>{reviewData.review}</p>
        </ReviewContent>
      )}
    </ReviewWrapper>
  );
};

const ResumePage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        { company: "크리스피크림도넛 부산 본점", date: "2024.10.04",boss:"홍길동", rating: 3.5, review: "성실하고 지각을 하지 않는 직원입니다~" },
        { company: "크리스피크림도넛 부산 본점", date: "2024.10.04",boss:"홍길동", rating: 4.0, review: "손님 응대를 친절하고 밝게 잘해요" },
      ],
      rating: 3.5,
      danpatTime: 2, // 단팥 경력
      isBookmarked: false,
      isRequested:false,
    };

    // 데이터를 로드했다고 가정
    setResumeData(testData);
  }, []);

  if (!resumeData) return (<div>Loading ... </div>);

  const onToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFull = i < Math.floor(rating);
      const isHalf = i < rating && i >= Math.floor(rating);

      stars.push(
        <Star key={i} isFull={isFull} isHalf={isHalf}>★</Star>
      );
    }

    return (
      <RatingSection>
        <StarContainer>{stars}</StarContainer>
        <RatingText>{rating} / 5</RatingText>
      </RatingSection>
    );
  };
  
   const onToggleRequest = () => {
    setResumeData(prevData => ({
      ...prevData,
      isRequested: true, // 계약 요청 클릭 시 isRequested를 true로 변경
    }));
  };

  return (
    <Page>
      <Tag>
        <DanpatlerTag>단팥경력 {resumeData.danpatTime}회</DanpatlerTag>
        <BookmarkButton
          isBookmarked={resumeData.isBookmarked}
          onClick={onToggleBookmark}
        >
          <Bookmark /> 알바생 저장하기
        </BookmarkButton>
      </Tag>
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
          <div className="profile-items">
            <span>평균별점</span><RatingSection>{renderStars(resumeData.rating)}</RatingSection>
          </div>
        </div>
      </Profile>

 <Section>
        <h3 id="worktime">근무가능시간</h3>
        <ScheduleCalendar isClickEnabled={false} /> {/* 날짜와 일정 클릭 비활성화 */}
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
              <Exp>
                <h4>일한 날짜</h4>
              <p>{exp.date}</p>
              <h4>사장님</h4>
              <p>{exp.boss}</p>
              </Exp>
              <RatingSection id="internal">{renderStars(exp.rating)}</RatingSection>
              <ReviewToggle reviewData={exp} /> {/* ReviewToggle 컴포넌트 사용 */}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <AlbaRequestButton>{onToggleRequest}계약 요청</AlbaRequestButton>
      </Section>

    </Page>
  );
};


const Page = styled.div`
  padding: 20px 30px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  //min-width: 1000px;
  //max-width: 1400px;
  width:100vw;
  
`;

const Tag=styled.div`
  display: flex;
  position: absolute;
  top: 110px;
  padding-left: 10px;
  gap: 10px;
  @media (min-width:1450px){
    margin-left: 25%;
  }
`

const Profile = styled.div`
  display: flex;
  gap: 35px;
  padding: 20px 10px;
  margin-top: 80px;

  img {
    background-color: #D9D9D9;
    border-radius: 50px;
    margin-top: 20px;
    width: 60px;
    height: 60px;
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
  @media (min-width:1450px){
    margin-left: 25%;
  }
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Star = styled.span`
  display: flex; 
  justify-content: center; 
  align-items: center;
  width: 24px; 
  height: 24px; 
  font-size: 24px; 
  background: ${({ isFull, isHalf }) => 
    isHalf
      ? "linear-gradient(to right, var(--secondary-color) 50%, var(--gray_light) 50%)" 
      : isFull
      ? "var(--secondary-color)" 
      : "lightgray"}; 
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2px;
`;

const RatingText = styled.span`
  font-size: 16px;
    color: #333;
  padding: 2px;
  font-weight: 500;
`;

const DanpatlerTag = styled.div`
  background: var(--primary-color-light);
  color: #fff;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 12px;
  width: fit-content;
  margin-bottom: 13px;
  height: 30px;
`;

const BookmarkButton = styled.button`
  background: #ffeca1;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary-color-dark);
  height: 30px;
  padding: 5px;
  border: solid var(--secondary-color-light) 1px;
  border-radius: 12px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${({ isBookmarked }) => (isBookmarked ? "var(--secondary-color)" : "var(--gray_light)")};
  }
  &:focus {
    outline: none;
  }
  
`;

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
    font-size: 16px;
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
    display: flex;
    align-items: baseline;
    justify-content: baseline;
    flex-direction: column;
    gap: 7px;
  }

  @media (min-width:1450px){
    margin-left: 25%;
  }
`;

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

  
`;

const ReviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 150px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const ReviewContent = styled.div`
  position: relative;
  top: calc(100% + 10px);
  padding: 10px;
  width: fit-content;
  width: 100%;
`;

const AlbaRequestButton =styled.button`
  padding: 15px;
  width: 300px;
  height: 70px;
  color: #fff;
  background-color: ${({ isRequested }) => (isRequested ? 'var(--secondary-color)' : 'var(--primary-color-dark)')}; 
  font-size: 17px;
  font-weight: 600;
  border-radius: 20px;
  position: relative;
  margin-left: 35%;
@media (min-width:1450px){
    margin-left: 25%;
  }
  cursor: pointer;
`

const Exp=styled.div`
  display: flex;
  gap: 10px;
`

export default ResumePage;