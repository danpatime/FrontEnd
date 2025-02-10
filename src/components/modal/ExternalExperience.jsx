import React, { useState } from "react";
import styled from "styled-components";
import { jobCategories } from "../../assets/data/jobCategories";
import Modal from "../common/Modal";


function ExternalExperience({ onClose }) {
  const [primaryCategory, setPrimaryCategory] = useState(null);
  const [secondaryCategory, setSecondaryCategory] = useState(null);
  const [experienceCount, setExperienceCount] = useState("");

  // 1차 직종 변경 시, 2차 직종 및 횟수 초기화
  const handlePrimaryChange = (e) => {
    const selected = jobCategories.find(cat => cat.id === parseInt(e.target.value));
    setPrimaryCategory(selected);
    setSecondaryCategory(null); // 2차 직종 초기화
    setExperienceCount(""); // 경력 횟수 초기화
  };

  // 2차 직종 변경 시
  const handleSecondaryChange = (e) => {
    setSecondaryCategory(e.target.value);
  };

  const handleAddExperience = () => {
    if (!primaryCategory || !secondaryCategory) {
      alert("1차 직종과 2차 직종을 모두 선택해야 합니다.");
      return;
    }

    if (!experienceCount || experienceCount <= 0) {
      alert("경력 횟수는 1회 이상이어야 합니다.");
      return;
    }

    if (secondaryCategory === "전체") {
      alert("정확한 직종을 선택해주세요.");
      return;
    }

    const experienceText = `${secondaryCategory} ${experienceCount}회`;

    onClose(experienceText);
  };

  return (
    <Modal onClose={() => onClose(null)} title="외부 경력" width="530px">
      <SelectContainer>
        <label>업직종</label>
        {/* 1차 직종 */}
        <Select onChange={handlePrimaryChange} value={primaryCategory?.id || ""}>
          <option value="">1차 직종</option>
          {jobCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>

        {/* 2차 직종 */}
        <Select
          onChange={handleSecondaryChange}
          value={secondaryCategory || ""}
          disabled={!primaryCategory} // 1차 직종 선택되지 않으면 2차 직종 비활성화
        >
          <option value="">2차 직종</option>
          {primaryCategory?.subCategories.map((sub, index) => (
            <option key={index} value={sub.name}>{sub.name}</option>
          ))}
        </Select>
      </SelectContainer>

      <WorkCount>
        <label>업무횟수</label>
        <input
          type="number"
          value={experienceCount}
          onChange={(e) => setExperienceCount(e.target.value)}
          disabled={!secondaryCategory} // 2차 직종이 선택되지 않으면 입력 비활성화
          placeholder="횟수를 입력하세요"
        />
        <span>회</span>
      </WorkCount>

      <ButtonContainer>
        <button onClick={handleAddExperience}>추가</button>
      </ButtonContainer>
    </Modal>
  );
}

export default ExternalExperience;

const SelectContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  width: 378px;
`

const Select = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  width: 150px;
  height: 42px;
  outline: none;
`;

const ButtonContainer = styled.div`
  width: 378px;
  display: flex;
  justify-content: end;
  margin-top: 30px;

  button {
    background-color: #7B4B42;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
`;

const WorkCount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 378px; 
  margin-top: 20px;

  input {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 5px 15px;
    width: 220px;
    height: 42px;
    outline: none;
  }
`