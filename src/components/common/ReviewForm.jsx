import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";
import request from "../../api/request.ts";
import { useReviewInfo } from "../../contexts/useReviewInfo";

const ReviewForm = ({ onClose, initialData }) => {
  const isEditing = initialData;
  const [reviewId, setReviewId] = useState(Date.now());
  const [reviewStarPoint, setReviewStarPoint] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  //const [reviewCount, setReviewCount] = useState(1);
  const [contractStartTime, setContractStartTime] = useState("");
  const [contractEndTime, setContractEndTime] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreID, setSelectedStoreID] = useState("");
  const [selectedAlba, setSelectedAlba] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [stores,setStores]=useState([]);
  const [reviewTag] = useState([
    "일을 잘해요", 
    "시간 엄수를 잘해요",
    "일이 서툴러요",
    "근무시간을 못 지켰어요", 
    "성실해요",
    "꼼꼼해요",
    "신뢰가 가요", 
    "또 같이 일하고 싶어요"
  ]);

  const { addReview, editReview } = useReviewInfo();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await request.get("/api/v1/employer/businesses");  // 가게 목록 요청
        setStores(response.data||[]);  // 받아온 데이터로 가게 목록 설정
      } catch (error) {
        console.error("가게 목록을 가져오는 데 실패했습니다.", error);
        setStores([]);
      }
    };

    fetchStores();  // 컴포넌트가 마운트될 때 가게 목록을 가져옵니다.
  }, []);

  useEffect(() => {
    if (initialData) {
      setReviewId(initialData.reviewId || Date.now());
      setReviewStarPoint(initialData.reviewStarPoint || 0); 
      setReviewContent(initialData.reviewContent || ""); 
      //setReviewCount(initialData.reviewCount || 1);
      setContractStartTime(initialData.contractStartTime || ""); 
      setContractEndTime(initialData.contractEndTime || "");
      setSelectedStore(initialData.businessName || ""); 
      setSelectedStoreID(initialData.businessId || ""); 
      //setSelectedAlba(initialData.workerId || ""); 
      //setSelectedTag(initialData.tags || []);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const newReview = {
      reviewId: reviewId,
      businessName: selectedStore,
      businessId: selectedStoreID, 
      //workerId: selectedAlba,
      reviewStarPoint: reviewStarPoint,
      //reviewCount: reviewCount,
      contractStartTime: contractStartTime,
      contractEndTime: contractEndTime,
      reviewContent: reviewContent, 
      //tags: selectedTag,
    };

    //if (!selectedStore || !selectedAlba || !reviewStarPoint || !reviewContent)
    if (!reviewStarPoint || !reviewContent){
      let missingFields = [];
      
      //if (!selectedStore) missingFields.push("가게");
      //if (!selectedAlba) missingFields.push("알바생");
      if (!reviewStarPoint) missingFields.push("평점");
      if (!reviewContent) missingFields.push("한줄평");
  
      alert(`${missingFields.join(", ")}을(를) 입력해 주세요.`);
      return; // 입력 받지 않은 항목에 대해 alert 메시지
    }

    if (initialData) {
      editReview(newReview);
    } else {
      addReview(newReview);
    }

    onClose();
  };

  const toggleTagSelection = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };

  const handleStoreChange = (e) => {
    const store = e.target.value;
    setSelectedStore(store);
    setSelectedAlba(""); // 가게 변경 시 알바 리스트 새로 불러오기
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
            <Label>가게</Label>
            <Select value={selectedStore} onChange={handleStoreChange} disabled={isEditing}>
              <option value="" disabled>선택하세요</option>
              {stores.map((store) => (
                <option key={store.businessId} value={store.businessId}>
                  {store.businessName}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>알바생</Label>
            <Select
              value={selectedAlba}
              onChange={(e) => setSelectedAlba(e.target.value)}
              disabled={!selectedStore || isEditing}
            >
              <option value="" disabled>선택하세요</option>
              {selectedStore &&
                stores[selectedStore] &&
                stores[selectedStore].map((alba) => (
                  <option key={alba} value={alba}>
                    {alba}
                  </option>
                ))}
            </Select>
          </Field>
        </FieldContainer>

        <Field>
          <Label>알바 후기 별점</Label>
          <StarRating setRating={setReviewStarPoint} starPoint={reviewStarPoint} />
        </Field>

        <Field>
          <Label>한줄평을 작성해주세요</Label>
          <Textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
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
  margin: 10px; 
  font-weight: bold;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin:5px;
  background-color:rgb(210, 185, 179);
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
  background-color:#5c3a32;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? "#5c3a32" : "rgb(241, 199, 59)"};
  }
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
