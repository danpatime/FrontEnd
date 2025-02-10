import React, { useState } from "react";
import styled from 'styled-components';
import DefaultProfileImage from '../../assets/images/default-profile.jpg';
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { GiJellyBeans } from "react-icons/gi";



function BookmarkedWorkerCard() {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const dummyData = {
    userInfo: {
      profileImg: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MjZfMTAw%2FMDAxNjkzMDQ4MTgwMzg2.0VBcbQc9LNhiudLzdUizVK3-UpU8YCq-cOY3s-c5Pn8g.4GPuscETBrJax8vWP3nvsWC0pMAIaEvR6bcPeLkBknIg.PNG.bj2604%2F%25C0%25CE%25BD%25BA%25C5%25B8%25BF%25EB.png&type=sc960_832", // 프로필 이미지 URL
      nickname: "팥빙수가 너무 먹고 싶은데 이걸 어떡하지",
      details: "남성 24세",
    },
    workPreferences: {
      locations: ["부산 전체", "대연동", "화명동"],
      categories: ["서빙", "일반음식점", "커피전문점"],
    },
    workExperience: {
      external: "단팥 경력 12회",
      internal: [
        { text: "커피전문점 2회" },
        { text: "커피전문점 3회" },
        { text: "일반음식점 1회" },
      ],
    },
  };

  const { userInfo, workPreferences, workExperience } = dummyData;


  // 찜 상태 변경 핸들러
  const handleBookmarkToggle = async () => {
    // try {
    //   // 서버 요청 (찜 상태 변경)
    //   if (isBookmarked) {
    //     // 찜 해제 요청
    //     await axios.post("/api/unbookmark", { userId: 1 }); // 적절한 API로 수정
    //   } else {
    //     // 찜 요청
    //     await axios.post("/api/bookmark", { userId: 1 }); // 적절한 API로 수정
    //   }

      // 상태 업데이트
      setIsBookmarked(!isBookmarked);
    // } catch (error) {
    //   console.error("서버 요청 실패:", error);
    //   alert("찜 상태 변경에 실패했습니다. 다시 시도해주세요.");
    // }
  };

  return (
    <Container>
      <Headline>
        <div id="user-info">
          <img src={userInfo.profileImg || DefaultProfileImage} alt="프로필 사진" />
          <div>
            <p>{userInfo.nickname}</p>
            <span>{userInfo.details}</span>
          </div>
        </div>
        <BookmarkIcon onClick={handleBookmarkToggle}>
          {isBookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
        </BookmarkIcon>
      </Headline>

      <WorkPreferences>
        <div>
          <FaLocationDot /> <p>{workPreferences.locations.join(", ")}</p>
        </div>
        <div>
          <MdWork /> <p>{workPreferences.categories.join(", ")}</p>
        </div>
      </WorkPreferences>

      <WorkExperience>
        {/* 외부 경력 */}
        <div id="external">
          <GiJellyBeans />
          {workExperience.external}
        </div>

        {/* 내부 경력 */}
        {workExperience.internal.map((experience, index) => (
          <div id="internal" key={index}>
            {experience.text}
          </div>
        ))}
      </WorkExperience>
    </Container>
  );
}

export default BookmarkedWorkerCard;

const Container = styled.div`
  width: 450px;
  border: 1px solid #EAEAEA;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 17px 22px 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Headline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  #user-info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  p {
    font-size: 16px;
    color: #000000;
  }

  span {
    font-size: 13px;
    color: #6D6D6D;
  }
`

const WorkPreferences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  padding-left: 10px;

  div {
    display: flex;
    align-items: center;
    gap: 13px;
  }

  svg {
    color: #ACACAC;
    font-size: 16px;
  }
`

const WorkExperience = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap:7px; 
  width: 100%;

  div {
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 13px;
    width: fit-content;
  }

  #external {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #D3BDB8;
    color: #6E3C3B;
    font-weight: 600;
  }

  #internal {
    border: 1px solid #E0E0E0;
    color: #9C9C9C;
  }
`

const BookmarkIcon = styled.div`
  margin-bottom: 15px;
  font-size: 23px;
  cursor: pointer;
`
