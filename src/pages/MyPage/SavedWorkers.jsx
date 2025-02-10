import React from 'react';
import styled from 'styled-components';
import MypageLayout from '../../components/layout/MypageLayout';
import BookmarkedWorkerCard from '../../components/common/BookmarkedWorkerCard';

const SavedWorkers = () => {
  // 더미 데이터
  const dummyData = [
    {
      id: 1,
      profileImg: '', // 프로필 이미지가 없는 경우
      name: '원두를 갈아버려',
      age: 25,
      gender: '남성',
      locations: ['서울 전체', '강남구', '송파구'],
      categories: ['서빙', '일반음식점', '커피전문점'],
      experience: [
        { type: 'external', text: '단팥 경력 10회' },
        { type: 'internal', text: '일반음식점 2회' },
      ],
    },
    {
      id: 2,
      profileImg: '', // 기본 이미지가 사용됨
      name: '팥빙수 사주세요',
      age: 22,
      gender: '남성',
      locations: ['부산 전체', '해운대', '수영구'],
      categories: ['배달', '편의점', '주유소'],
      experience: [
        { type: 'external', text: '단팥 경력 15회' },
        { type: 'internal', text: '주유소 3회' },
      ],
    },
    {
      id: 3,
      profileImg: '', // 기본 이미지가 사용됨
      name: '태어나서 일만함',
      age: 27,
      gender: '여성',
      locations: ['대구 전체', '동구', '북구'],
      categories: ['서빙', '카페', '레스토랑'],
      experience: [
        { type: 'external', text: '단팥 경력 8회' },
        { type: 'internal', text: '카페 5회' },
      ],
    },
    {
      id: 4,
      profileImg: '',
      name: '은지지',
      age: 20,
      gender: '여성',
      locations: ['광주 전체', '서구', '남구'],
      categories: ['운전', '청소', '보조'],
      experience: [
        { type: 'external', text: '단팥 경력 5회' },
        { type: 'internal', text: '보조 1회' },
      ],
    },
  ];

  return (
    <MypageLayout>
      <Page>
        <Title>관심알바</Title>
        <Grid>
          {dummyData.map((worker) => (
            <BookmarkedWorkerCard key={worker.id} worker={worker} />
          ))}
        </Grid>
      </Page>
    </MypageLayout>
  );
};

export default SavedWorkers;

const Page = styled.div`
  padding: 20px 30px 40px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1200px;
  max-width: 1430px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  margin-top: 30px;
`;
