/*eslint-disable*/
import React, { useState } from "react";
import styled from "styled-components";

const StarRating = ({ setRating, starPoint, rating, size = 50 }) => {
  const [hoverRating, setHoverRating] = useState(0); // 마우스가 hover 상태인 별점을 저장하는 상태

  // 클릭한 별점 값을 정수로 처리
  const handleStarClick = (value) => {
    if (rating) return; // 이미 존재하는 리뷰라면 클릭을 막음
    setRating(value); // 클릭한 별점 값을 상태에 업데이트
  };

  // 마우스를 별 위에 올렸을 때 hover 상태 처리
  const handleMouseEnter = (value) => {
    if (rating) return; // 이미 존재하는 리뷰라면 hover도 막음
    setHoverRating(value); // hover 위치를 상태에 저장
  };

  const showCurStar=()=>{
    if(rating) return;
    setHoverRating(rating);
  }

  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= (hoverRating || rating || starPoint)} // hover 상태와 고정된 별점을 모두 반영
          onClick={() => handleStarClick(value)} // 클릭 이벤트 처리
          onMouseEnter={() => handleMouseEnter(value)} // hover 시작 처리
          onMouseLeave={()=>showCurStar(value)}
          size={size} // 별 크기 설정
        >
          ★
        </Star>
      ))}
    </StarContainer>
  );
};

export default StarRating;

// 별 컨테이너 스타일
const StarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// 별 스타일
const Star = styled.div`
  font-size: ${(props) => props.size}px; // 동적으로 크기 설정
  cursor: ${(props) => (props.filled ? "default" : "pointer")}; // 채워진 별은 클릭 불가
  color: transparent;
  margin: 4px;
  background: ${(props) => (props.filled ? "#F7B32B" : "lightgray")}; // 채워진 별과 빈 별 처리
  background-size: 100% 100%;
  -webkit-background-clip: text; // 텍스트에 색상 적용
  transition: background 0.1s ease-in-out;
  cursor:pointer;
`;
