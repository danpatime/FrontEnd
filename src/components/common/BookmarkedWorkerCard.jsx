import React, { useState } from "react";
import styled from 'styled-components';
import DefaultProfileImage from '../../assets/images/default-profile.jpg';
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { GiJellyBeans } from "react-icons/gi";
import request from "../../api/request.ts";



function BookmarkedWorkerCard({ worker }) {
  const [isBookmarked, setIsBookmarked] = useState(true);


  const handleBookmarkToggle = async () => {
    try {
      const endpoint = `/api/v1/employer/favorites/employee/${worker.id}`;
  
      if (!isBookmarked) {
        await request.put(endpoint);
      } else {
        await request.delete(endpoint);
      }
  
      setIsBookmarked(!isBookmarked); 
    } catch (error) {
      console.error("서버 요청 실패:", error);
      alert("찜 상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Headline>
        <div id="user-info">
          <img src={worker.profileImg || DefaultProfileImage} alt="프로필 사진" />
          <div>
            <p>{worker.nickname}</p>
            <span>{`${worker.sex} ${worker.age}세`}</span>
          </div>
        </div>
        <BookmarkIcon onClick={handleBookmarkToggle}>
          {isBookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
        </BookmarkIcon>
      </Headline>

      <WorkPreferences>
        <div>
          <FaLocationDot /> <p>{worker.locations}</p>
        </div>
        <div>
          <MdWork /> <p>{worker.categories}</p>
        </div>
      </WorkPreferences>

      <WorkExperience>
        {worker.experience.map((exp, index) => (
          <div key={index} id={exp.type}>
            {exp.type === 'internal' && <GiJellyBeans />}
            {exp.text}
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

  #internal {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #D3BDB8;
    color: #6E3C3B;
    font-weight: 600;
  }

  #external {
    border: 1px solid #E0E0E0;
    color: #9C9C9C;
  }
`

const BookmarkIcon = styled.div`
  margin-bottom: 15px;
  font-size: 23px;
  cursor: pointer;
`
