import React, { useState,useEffect } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";

const mockMappingData = {
  "가게1": ["홍길동", "박지훈", "장미숙", "홍유진", "최수빈", "김서연"],
  "가게2": ["김민수", "최유나", "김하늘", "오지훈", "이수연", "박진영"],
  "가게3": ["이영희", "정수빈", "박성민", "김지수", "박준호"],
};

const ReviewForm = ({ onClose, addReview,initialData }) => {
  const [review,setReview]=useState(initialData ||{});
  const [starPoint, setStarPoint] = useState(0);
  const [content, setContent] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedAlba, setSelectedAlba] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedRCount,setSelectedRCount]=useState(0);
  const [reviewTag,setReviewTag]=useState([
    '일을 잘해요', 
    '시간 엄수를 잘해요',
    '일이 서툴러요',
    '근무시간을 못 지켰어요', 
    '성실해요',
    '꼼꼼해요',
     '신뢰가 가요', 
     '또 같이 일하고 싶어요']);

  useEffect(() => {
    if (initialData) {
      setReview(initialData);
      setStarPoint(initialData.starPoint || 0);
      setContent(initialData.content || "");
      setSelectedStore(initialData.storeID || "");
      setSelectedAlba(initialData.albaID || "");
      setSelectedTag(initialData.tags || []);
    }
  }, [initialData]);


  const handleSubmit = () => {
    const newReview = {
      id: Date.now(),
      storeID: selectedStore,
      albaID: selectedAlba,
      starPoint: starPoint,
      reviewCount: selectedRCount+1,
      date: new Date().toISOString().split("T")[0],
      content: content,
      tags: selectedTag, // 태그 추가
    };
  
    addReview(newReview); // 부모 컴포넌트에 리뷰 전달
    onClose(); // 모달 닫기
  };

  const toggleTagSelection = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag((prev) => prev.filter((t) => t !== tag)); // 태그 해제
    } else {
      setSelectedTag((prev) => [...prev, tag]); // 태그 선택
    }
  };

  const handleStoreChange = (e) => {
    const store = e.target.value;
    setSelectedStore(store);
    setSelectedAlba(""); // 가게 변경 시, 알바 선택 초기화
  };
  

  return (
    <Overlay>
      <FormContainer>
        <CloseButton onClick={onClose}>x</CloseButton>
        <Header>
          <Title>알바 후기 작성</Title>
        </Header>
        <FieldContainer>
          <Field>
            <Label>근무지</Label>
            <Select value={selectedStore} onChange={handleStoreChange}>
              <option value="" disabled>
                선택하세요
              </option>
              <option value="가게1">가게 1</option>
              <option value="가게2">가게 2</option>
              <option value="가게3">가게 3</option>
            </Select>
          </Field>

          <Field>
            <Label>근무자</Label>
            <Select
              value={selectedAlba}
              onChange={(e) => setSelectedAlba(e.target.value)}
              disabled={!selectedStore} // 가게가 선택되지 않으면 비활성화
            >
              <option value="" disabled>
                선택하세요
              </option>
              {selectedStore &&
                mockMappingData[selectedStore].map((alba) => (
                  <option key={alba} value={alba}>
                    {alba}
                  </option>
                ))}
            </Select>
          </Field>
        </FieldContainer>

        <Field>
          <Label>알바 리뷰 별점</Label>
          <StarRating setRating={setStarPoint} starPoint={starPoint}/>
        </Field>

        <Field>
          <Label>한줄 평을 작성해주세요</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder=""
          />
        </Field>

        <Field>
          <Label>평가 태그</Label>
          <TagContainer>
            {reviewTag.map((tag) => (
              <Tag
                key={tag}
                isSelected={selectedTag.includes(tag)}
                onClick={() => toggleTagSelection(tag)}
              >
                {tag}
              </Tag>
            ))}
          </TagContainer>
        </Field>

        <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
      </FormContainer>
    </Overlay>
  );
};

export default ReviewForm;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width:80%;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 15pt;
  margin: 0;
`;

const FieldContainer = styled.div`
  display: flex; 
  justify-content:space-between;
  gap: flex-start;
  margin-bottom: 20px;
`;

const Field = styled.div`
  flex:1;
  display: flex;
  flex-direction: column; 
`;

const Label = styled.label`
  margin-bottom: 8px; 
  font-weight: bold;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background:#5c3a32;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
  margin-bottom:20px;
`;

const Tag = styled.div`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.isSelected ? "rgb(166, 113, 103)" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? "rgb(140, 96, 88)" : "rgb(230, 230, 230)"};
  }
`;
