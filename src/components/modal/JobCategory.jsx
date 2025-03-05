import { useState } from "react";
import styled from "styled-components";
import { jobCategories } from "../../assets/data/jobCategories";
import Modal from "../common/Modal";


const CategoryModal = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryChange = (event) => {
    const selected = jobCategories.find(cat => cat.id === parseInt(event.target.value));
    setSelectedCategory(selected);
    setSelectedSubCategory(null); // 하위 카테고리 초기화
  };

  const handleAdd = () => {
    if (!selectedSubCategory) {
      alert("희망하는 직종을 선택하세요.");
      return;
    }

    // 선택된 1차 직종과 2차 직종을 찾기
    const selectedSub = selectedCategory.subCategories.find(sub => sub.name === selectedSubCategory);

    if (!selectedSub) return;

    const keyword =
      selectedSubCategory === "전체"
        ? `${selectedCategory.name} 전체`
        : `${selectedSub.name}`;

    onClose(keyword, { categoryId: selectedCategory.id, categoryName: selectedCategory.name, subCategoryIdm: selectedSub.id, subCategoryName: selectedSub.name });
  };

  return (
    <Modal onClose={() => onClose(null)} title="희망업직종" width="450px">
      <SelectContainer>
        {/* 1차 직종 */}
        <Select onChange={handleCategoryChange}>
          <option value="">1차 직종</option>
          {jobCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>

        {/* 2차 직종 */}
        <Select 
          onChange={(e) => setSelectedSubCategory(e.target.value)} 
          disabled={!selectedCategory} // 1차 직종 선택 전에는 비활성화
          >
          <option value="">2차 직종</option>
          {selectedCategory?.subCategories.map((sub, index) => (
            <option key={index} value={sub.name}>{sub.name}</option>
          ))}
        </Select>
      </SelectContainer>

      <ButtonContainer>
        <button onClick={handleAdd}>추가</button>
      </ButtonContainer>
    </Modal>
  );
};

export default CategoryModal;

const SelectContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  width: 378px;
`

const Select = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  width: 180px;
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