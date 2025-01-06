import React, { useState } from 'react';
import styled from 'styled-components';

/*
<To do List>
1. 시간 30분 단위로 설정
2. 검색/초기화 버튼 따로 설정 -> 스타일링 따로따로
3. 파일경로 원래대로 되돌려놓기
*/

const AlbaSearchFilter = () => {
  const [filters, setFilters] = useState({
    region: { region_1: '', region_2: '', region_3: '' },
    category: { mainJobCategory: '', subJobCategory: '' },
    albaDate: { startDate: '', endDate: '' },
    albaTime: { startTime: '', endTime: '' },
  });

  const handleInputChange = (e, category, key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [key]: e.target.value,
      },
    }));
  };

  const handleSubmit = () => {
    console.log('검색 조건:', filters);
    fetch('/api/mock/alba-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => console.log('검색 결과:', data))
      .catch((error) => console.error('오류 발생:', error));
  };

  const handleReset = () => {
    setFilters({
      region: { region_1: '', region_2: '', region_3: '' },
      category: { mainJobCategory: '', subJobCategory: '' },
      albaDate: { startDate: '', endDate: '' },
      albaTime: { startTime: '', endTime: '' },
    });
  };

  return (
      <div>
          <Container>
          
      <FilterSection>
        <Label>지역</Label>
        <Region onChange={(e) => handleInputChange(e, 'region', 'region_1')}>
          <option value="">시/도</option>
        </Region>
        <Region onChange={(e) => handleInputChange(e, 'region', 'region_2')}>
          <option value="">시/군/구</option>
        </Region>
        <Region onChange={(e) => handleInputChange(e, 'region', 'region_3')}>
          <option value="">동/읍/면</option>
        </Region>
      </FilterSection>
      
      <FilterSection>
        <Label>희망 업종</Label>
        <Category onChange={(e) => handleInputChange(e, 'category', 'mainJobCategory')}>
          <option value="">대분류</option>
        </Category>
        <Category onChange={(e) => handleInputChange(e, 'category', 'subJobCategory')}>
          <option value="">소분류</option>
        </Category>
      </FilterSection>
      
      <FilterSection>
        <Label>날짜</Label>
        <AlbaDate
          type="date"
          onChange={(e) => handleInputChange(e, 'albaDate', 'startDate')}
        />
        <AlbaDate
          type="date"
          onChange={(e) => handleInputChange(e, 'albaDate', 'endDate')}
        />
      </FilterSection>
      
      <FilterSection>
        <Label>시간</Label>
        <AlbaTime
          type="time"
          onChange={(e) => handleInputChange(e, 'albaTime', 'startTime')}
        />
        <AlbaTime
          type="time"
          onChange={(e) => handleInputChange(e, 'albaTime', 'endTime')}
        />
      </FilterSection>
      
      
          </Container>
          <ButtonGroup>
        <Button onClick={handleSubmit}>검색</Button>
        <Button onClick={handleReset} reset>
          초기화
        </Button>
      </ButtonGroup>
      </div>
  );
};

export default AlbaSearchFilter;


const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  top: 20px;
`;

const FilterSection = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items:center;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  padding-right: 200px;
`;

const Region = styled.select`
  width: 20%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px 10px 10px 0;
`;
const Category = styled.select`
  width: 20%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px 10px 0;
  position: relative;
  right: 30px;
`;
const AlbaDate = styled.input`
  width: 20%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px 10px 0;
`;
const AlbaTime = styled.input`
  width: 20%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px 0 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  position: relative;
  width: 20%;
  max-width: 200px;
  justify-content: space-between;
  left: 45%;
  top: 40px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 80px;
  background-color: ${(props) => (props.reset ? '#ccc' : '#7B4B42')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.reset ? '#b5b5b5' : '5A3A2E')};
  }
`;
