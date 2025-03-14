/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WorkLocation from '../modal/WorkLocation';
import JobCategory from '../modal/JobCategory';
import request from '../../api/request.ts';

import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import ExternalExperience from '../modal/ExternalExperience';


const AddKeyword = ({ title, initialKeywords = [] }) => {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setKeywords(initialKeywords);
  }, [initialKeywords]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 직종만 추출하는 함수 (횟수 부분 제외)
  const extractJobType = (keyword) => {
    return keyword.replace(/\s\d+회$/, '').trim(); // " n회" 형식 제거
  };

  const formatLocation = ({ sido, sigugun, dong }) => {
    if (dong) return dong;
    if (sigugun) return `${sigugun} 전체`;
    if (sido) return `${sido} 전체`;
    return "";
  };

  const formatCategory = ({ subCategoryName }) => {
    if (subCategoryName === '전체') return `${subCategoryName} 전체`;
    return subCategoryName;
  }

  const formatExternalCarrer = ({ subCategory, workCount }) => {
    return `${subCategory.subCategoryName} ${workCount}회`;
  }

  // 키워드 추가 핸들러
  const handleAddKeyword = async (newKeyword, extraData = null) => {
    if (!newKeyword) {
      return; // 빈 값이면 무시
    }

    const jobType = extractJobType(newKeyword); // 직종만 추출

    // "외부경력"인 경우, 직종만으로 중복 체크
    if (title === "외부 경력") {
      const isDuplicate = keywords.some((existingKeyword) => existingKeyword.subCategory.subCategoryName === jobType);
      if (isDuplicate) {
        alert("이미 추가된 외부 경력입니다."); // 중복 값 경고
        return;
      }
    } else {
      // "근무지"나 "희망업직종"에서는 단순히 키워드 값으로 중복 체크
      if (keywords.includes(newKeyword)) {
        alert("이미 있는 값입니다."); // 중복 값 경고
        return;
      }
    }

    // 외부경력일 경우 개수 제한을 두지 않음
    if (title !== "외부 경력" && keywords.length >= 5) {
      alert("최대 5개까지 추가할 수 있습니다."); // 최대 개수 초과 경고
      return;
    }

    let url = "";
    let payload = {};

    if (title === "근무지") {
      url = "/api/v1/possible-board/work-preferences/districts";
      payload = { locations: [...keywords, extraData] };
    } else if (title === "희망업직종") {
      url = "/api/v1/possible-board/work-preferences/category";
      payload = { categoryIds: [...keywords, extraData] };
    } else if (title === "외부 경력") {
      // 기존 데이터 변환
      const formattedKeywords = keywords.map(exp => ({
        subCategoryId: exp.subCategory.subCategoryId,
        workCount: exp.workCount
      }));

      // 새로 추가할 데이터 변환
      const formattedExtraData = {
        subCategoryId: extraData.subCategory.subCategoryId,
        workCount: extraData.workCount
      };

      url = "/api/v1/possible-board/external-career";
      payload = { newExternalCareers: [...formattedKeywords, formattedExtraData] };
    }

    try {
      await request.post(url, payload);
      setKeywords((prev) => [...prev, extraData]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("추가 요청 실패:", error);
    }
  };

  const handleDeleteKeyword = async (index) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);

    let url = "";
    let payload = {};

    if (title === "근무지") {
      url = "/api/v1/possible-board/work-preferences/districts";
      payload = { locations: updatedKeywords };
    } else if (title === "희망업직종") {
      url = "/api/v1/possible-board/work-preferences/category";
      payload = { categoryIds: updatedKeywords };
    } else if (title === "외부 경력") {
      const externalCareerData = updatedKeywords.map(exp => ({
        subCategoryId: exp.subCategory.subCategoryId,
        workCount: exp.workCount
      }));
  
      url = "/api/v1/possible-board/external-career";
      payload = { newExternalCareers: externalCareerData };
    }
    
    try {
      await request.post(url, payload);
      setKeywords(updatedKeywords);
    } catch (error) {
      console.error("삭제 요청 실패:", error);
    }
  };

  const renderModal = () => {
    if (title === "근무지") {
      return <WorkLocation onClose={(newKeyword, locationData) => {
        handleAddKeyword(newKeyword, locationData);
        handleCloseModal(); // 모달 닫기
      }} />;
    }
    if (title === "희망업직종") {
      return <JobCategory onClose={(newKeyword, categoryData) => {
        handleAddKeyword(newKeyword, categoryData);
        handleCloseModal(); // 모달 닫기
      }} />;
    }
    if (title === "외부 경력") {
      return <ExternalExperience onClose={(newKeyword, externalCareerData) => {
        handleAddKeyword(newKeyword, externalCareerData); 
        handleCloseModal();
      }} />;
    }
    return null;
  };

  return (
    <Container>
      <Title>{title === "외부 경력" ? "" : title}</Title>
      <div id="keyword-arr">
        {keywords.map((keyword, index) => (
          <KeywordTag key={index}>
            {title === "근무지" ? formatLocation(keyword) : title === "희망업직종" ? formatCategory(keyword) : formatExternalCarrer(keyword)}
            <DeleteButton onClick={() => handleDeleteKeyword(index)}><IoIosClose /></DeleteButton>
          </KeywordTag>
        ))}
        {keywords.length < 5 && ( 
          <AddButton onClick={() => setIsModalOpen(true)}>
            <IoIosAdd />
          </AddButton>
        )}

      </div>

      {isModalOpen && renderModal()}
    </Container>
  );
};

export default AddKeyword;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;

  #keyword-arr {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.h4`
  font-size: 16px;
  color: #6D6D6D; 
`;

const KeywordTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 5px 15px;
  margin-right: 10px;
  gap: 12px;
  font-size: 15px;
`;

const DeleteButton = styled.button`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  background: #B6B6B6;
  border-radius: 50%;
  color: #6D6D6D;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #e0e0e0;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  &:hover {
    background-color: #7B4B42;
    color: #ffffff;
  }
`;