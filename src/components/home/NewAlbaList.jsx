import React, { useState } from 'react';
import { AlbaProfileCard } from '../common/AlbaProfileCard';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import React Icons

const dummyProfiles = [
  {
    name: '김철수',
    age: 25,
    gender: '남',
    rating: 4.5,
    danpatTime: 3,
    danpatExperience: ['서빙', '배달'],
    jobExperience: ['편의점', '카페'],
    hopes: ['카페', '베이커리'],
    location: ['서울', '강남'],
    profileImage: 'https://via.placeholder.com/100',
    isBookmarked: false,
  },
  {
    name: '박영희',
    age: 28,
    gender: '여',
    rating: 4.7,
    danpatTime: 2,
    danpatExperience: ['서빙', '배달'],
    jobExperience: ['카페', '레스토랑'],
    hopes: ['베이커리'],
    location: ['서울', '홍대'],
    profileImage: 'https://via.placeholder.com/100',
    isBookmarked: false,
  },
  {
    name: '최민수',
    age: 30,
    gender: '남',
    rating: 4.8,
    danpatTime: 4,
    danpatExperience: ['서빙'],
    jobExperience: ['레스토랑', '호텔'],
    hopes: ['레스토랑'],
    location: ['서울', '종로'],
    profileImage: 'https://via.placeholder.com/100',
    isBookmarked: false,
  },
  {
    name: '이수연',
    age: 22,
    gender: '여',
    rating: 4.6,
    danpatTime: 1,
    danpatExperience: ['서빙'],
    jobExperience: ['편의점'],
    hopes: ['카페'],
    location: ['서울', '강남'],
    profileImage: 'https://via.placeholder.com/100',
    isBookmarked: false,
  },
  {
    name: '김지훈',
    age: 26,
    gender: '남',
    rating: 4.9,
    danpatTime: 5,
    danpatExperience: ['배달'],
    jobExperience: ['카페', '베이커리'],
    hopes: ['베이커리'],
    location: ['서울', '을지로'],
    profileImage: 'https://via.placeholder.com/100',
    isBookmarked: false,
  },
  {
    name: '정하늘',
    age: 27,
    gender: '여',
    rating: 4.7,
    danpatTime: 3,
    danpatExperience: ['배달'],
    jobExperience: ['카페', '음악카페'],
    hopes: ['음악카페'],
    location: ['서울', '합정'],
    profileImage: 'https://via.placeholder.com/100',
    isBookmarked: false,
  },
];

const NewAlbaList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex < dummyProfiles.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Wrapper>
      <Button onClick={handlePrev} disabled={currentIndex === 0}>
        <FaChevronLeft size={24} />
      </Button>
      <CardContainer>
        {dummyProfiles
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((profile, index) => (
            <AlbaProfileCard
              key={index}
              {...{ ...profile, direction: 'column' }}
            />
          ))}
      </CardContainer>
      <Button
        onClick={handleNext}
        disabled={currentIndex >= dummyProfiles.length - itemsPerPage}
      >
        <FaChevronRight size={24} />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  margin: 10px;
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 100px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    cursor: not-allowed;
  }
`;

const CardContainer = styled.div`
  margin: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.5s ease-in-out; /* Adds sliding effect */
  width: 100%;
`;

export default NewAlbaList;
