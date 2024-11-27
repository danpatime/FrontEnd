import React,{useState} from 'react';
import styled from "styled-components";

const StarRating=()=>{
    //내가 입력한 별점을 저장하는 변수
    const [rating,setRating]=useState(0);
    //마우스를 올린 별의 위치를 저장하는 변수
    const [hoverRating,setHoverRating]=useState(0);

    //별점 렌더링 제어 공통 함수
    const commonRatingFun=(event,value,callback)=>{
        const {offsetX,target}=event.nativeEvent;
        const starWidth=target.offsetWidth;
        const division=offsetX/starWidth;
        const adjustedRating=value-1+Math.round(division*2)/2;
        console.log("adjustedRating:", adjustedRating); // 디버깅
        callback(adjustedRating);
    };

    //마우스로 별을 클릭했을 때 해당 위치까지의 별 색칠(이후 고정)
    const handleStarClick=(event,value)=>{
      commonRatingFun(event,value,setRating);
    };

    //마우스를 올렸을 때 해당 위치까지의 별 색칠
    const handleMouseEnter=(event,value)=>{
      commonRatingFun(event,value,setHoverRating);
    };

    //마우스를 떼면 별 색칠 취소
    const handleMouseLeave=()=>{
      setHoverRating(0);
    };


    // 별점 전송 함수
    const submitRating = async () => {
      const response = await fetch("API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({
          starPoint: rating
      }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
    } else {
        console.error("Failed to submit rating");
    }
  };

    return(
        <StarContainer>
        {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              filled={value <= Math.floor(hoverRating||rating)}
              halfFilled={value - 0.5 <= (hoverRating||rating) && value > (hoverRating||rating)}
              onClick={(e) => handleStarClick(e,value)}
              onMouseEnter={(e)=>handleMouseEnter(e,value)}
              onMouseLeave={()=>handleMouseLeave()}
            >
              ★
            </Star>
      ))}
      </StarContainer>
    );
};

export default StarRating;

const StarContainer=styled.div`
  display:flex;
  justify-content:center;
`;
const Star = styled.div`
  font-size: 100px; //임시 크기
  cursor: pointer;
  position: relative;
  color: transparent;
  margin:4px;
  //linear-gradient로 반개 별 구현
  background: ${(props) =>
    props.halfFilled
      ? 'linear-gradient(to right, #F7B32B 50%, lightgray 50%)'  // 반만 노란색
      : props.filled
      ? '#F7B32B'
      : 'lightgray'
  };

  background-size: 100% 100%;
  -webkit-background-clip: text;
  display: inline-block;
  transition: background 0.1s ease-in-out;
  `;