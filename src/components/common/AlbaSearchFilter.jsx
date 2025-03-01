import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
/*
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
    fetch('/api/mock/alba-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
  };

  const handleReset = () => {
    setFilters({
      region: { region_1: '', region_2: '', region_3: '' },
      category: { mainJobCategory: '', subJobCategory: '' },
      albaDate: { startDate: '', endDate: '' },
      albaTime: { startTime: '', endTime: '' },
    });
  };
*/

import { hangjungdong } from '../../assets/data/hangjungdong'; // 지역 데이터
import { jobCategories } from '../../assets/data/jobCategories'; // 직종 데이터

const AlbaSearchFilter = ({ onFilterChange }) => {
  // ✅ 지역 데이터
  const [sigunguList, setSigunguList] = useState([]);
  const [dongList, setDongList] = useState([]);

  // ✅ 희망 업종 데이터
  const [subCategories, setSubCategories] = useState([]);

  const [filters, setFilters] = useState({
    sido: '',
    sigungu: '',
    dong: '',
    subCategory: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // ✅ 1. 시/도 변경 시 → 시/군/구 리스트 업데이트
  const handleSidoChange = (e) => {
    const selectedSido = e.target.value;
    setFilters((prev) => ({ ...prev, sido: selectedSido, sigungu: '', dong: '' }));

    // 시/군/구 필터링
    const filteredSigungu = hangjungdong.sigugun.filter((item) => item.sido === selectedSido);
    setSigunguList(filteredSigungu);
    setDongList([]);
  };

  // ✅ 2. 시/군/구 변경 시 → 동/읍/면 리스트 업데이트
  const handleSigunguChange = (e) => {
    const selectedSigungu = e.target.value;
    setFilters((prev) => ({ ...prev, sigungu: selectedSigungu, dong: '' }));

    // 동/읍/면 필터링
    const filteredDong = hangjungdong.dong.filter(
      (item) => item.sido === filters.sido && item.sigugun === selectedSigungu
    );
    setDongList(filteredDong);
  };

  // ✅ 3. 대분류 변경 시 → 소분류 리스트 업데이트
  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = e.target.value;
    setFilters((prev) => ({ ...prev, subCategory: '' }));

    // 선택한 대분류에 맞는 소분류 필터링
    const filteredSubCategories =
      jobCategories.find((category) => category.id.toString() === selectedMainCategory)?.subCategories || [];

    setSubCategories(filteredSubCategories);
  };

  // ✅ 4. 필터 값 저장
  const handleInputChange = (e, type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  // ✅ 5. 검색 버튼 클릭 시 필터링 실행
  const handleSubmit = () => {
    onFilterChange(filters);
  };

  // ✅ 6. 초기화
  const handleReset = () => {
    setFilters({
      sido: '',
      sigungu: '',
      dong: '',
      mainCategory:'',
      subCategory: '',
      date: '',
      startTime: '',
      endTime: '',
    });
    setSigunguList([]);
    setDongList([]);
    setSubCategories([]);
  };

  return (
    <div>
      <Container>
        <FilterContents>

          {/* ✅ 지역 선택 (시/도 → 시/군/구 → 동/읍/면) */}
          <FilterSection>
            <FilterLabel>지역</FilterLabel>
            <RegionSection>
              <Region value={filters.sido} onChange={handleSidoChange}>
                <option value="">시/도</option>
                {hangjungdong.sido.map((sido) => (
                  <option key={sido.sido} value={sido.sido}>
                    {sido.codeNm}
                  </option>
                ))}
              </Region>
              <Region value={filters.sigungu} onChange={handleSigunguChange} disabled={!filters.sido}>
                <option value="">시/군/구</option>
                {sigunguList.map((sigungu) => (
                  <option key={sigungu.sigugun} value={sigungu.sigugun}>
                    {sigungu.codeNm}
                  </option>
                ))}
              </Region>
              <Region value={filters.dong} onChange={(e) => handleInputChange(e, 'dong')} disabled={!filters.sigungu}>
                <option value="">동/읍/면</option>
                {dongList.map((dong) => (
                  <option key={dong.dong} value={dong.dong}>
                    {dong.codeNm}
                  </option>
                ))}
              </Region>
            </RegionSection>
          </FilterSection>

          {/* ✅ 희망 업종 (대분류 → 소분류) */}
          <FilterSection>
            <FilterLabel>희망 업종</FilterLabel>
            <Category value={filters.mainCategory} onChange={handleMainCategoryChange}>
              <option value="">대분류</option>
              {jobCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Category>
            <Category value={filters.subCategory} onChange={(e) => handleInputChange(e, 'subCategory')} disabled={!subCategories.length}>
              <option value="">소분류</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </Category>
          </FilterSection>

          {/* ✅ 날짜 & 시간 선택 */}
          <FilterSection>
            <FilterLabel>날짜</FilterLabel>
            <AlbaDate type="date" value={filters.date} onChange={(e) => handleInputChange(e, 'date')} />
          </FilterSection>

          <FilterSection>
            <FilterLabel>시간</FilterLabel>
            <AlbaTime type="time" value={filters.startTime} onChange={(e) => handleInputChange(e, 'startTime')} />
            <AlbaTime type="time" value={filters.endTime} onChange={(e) => handleInputChange(e, 'endTime')} />
          </FilterSection>

        </FilterContents>
      </Container>

      {/* ✅ 검색 및 초기화 버튼 */}
      <ButtonGroup>
        <Button onClick={handleSubmit}>검색</Button>
        <Button onClick={handleReset} reset>
          초기화
        </Button>
      </ButtonGroup>
    </div>
  );
};

AlbaSearchFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};



export default AlbaSearchFilter;


const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  top: 20px;
`;
const FilterContents = styled.div`
  margin-right: 30px;
`;
const FilterSection = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items:center;
`;

const FilterLabel = styled.label`
  display: block;
  margin-left:30px;
  font-weight: bold;
  width: 270px;
  padding-right: 200px;
`;
const RegionSection = styled.div`
  position: relative;
  left: 20px;
  width: 500px;
`;
const Region = styled.select`
  width: 30%;
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
  margin-bottom: 50px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 80px;
  background-color: ${(props) => (props.reset ? "var(--disabled-color)" : "var(--primary-color)")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background-color: ${(props) => (props.reset ? "var(--gray_light)" : "var(--primary-color-dark)")};
  }
`;
/*
  return (
      <div>
          <Container>
        <FilterContents>
           <FilterSection>
        <FilterLabel>지역</FilterLabel>
          <RegionSection>
            <Region onChange={(e) => handleInputChange(e, 'region', 'region_1')}>
          <option value="">시/도</option>
        </Region>
        <Region onChange={(e) => handleInputChange(e, 'region', 'region_2')}>
          <option value="">시/군/구</option>
        </Region>
        <Region onChange={(e) => handleInputChange(e, 'region', 'region_3')}>
          <option value="">동/읍/면</option>
        </Region>
          </RegionSection>
      </FilterSection>
      
      <FilterSection>
        <FilterLabel>희망 업종</FilterLabel>
        <Category onChange={(e) => handleInputChange(e, 'category', 'mainJobCategory')}>
          <option value="">대분류</option>
        </Category>
        <Category onChange={(e) => handleInputChange(e, 'category', 'subJobCategory')}>
          <option value="">소분류</option>
        </Category>
      </FilterSection>
      
      <FilterSection>
        <FilterLabel>날짜</FilterLabel>
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
        <FilterLabel>시간</FilterLabel>
        <AlbaTime
          type="time"
          onChange={(e) => handleInputChange(e, 'albaTime', 'startTime')}
        />
        <AlbaTime
          type="time"
          onChange={(e) => handleInputChange(e, 'albaTime', 'endTime')}
        />
      </FilterSection>
          </FilterContents>
     
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
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  top: 20px;
`;
const FilterContents = styled.div`
  margin-right: 30px;
`;
const FilterSection = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items:center;
`;

const FilterLabel = styled.label`
  display: block;
  margin-left:30px;
  font-weight: bold;
  width: 270px;
  padding-right: 200px;
`;
const RegionSection = styled.div`
  position: relative;
  left: 20px;
  width: 500px;
`;
const Region = styled.select`
  width: 30%;
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
  margin-bottom: 50px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 80px;
  background-color: ${(props) => (props.reset ? "var(--disabled-color)" : "var(--primary-color)")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background-color: ${(props) => (props.reset ? "var(--gray_light)" : "var(--primary-color-dark)")};
  }
`;
*/