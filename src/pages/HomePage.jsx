import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReviewCell from '../components/common/ReviewCell';
import SideBar from '../components/home/SideBar';
import NewAlbaList from '../components/home/NewAlbaList';

const HomePage = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      albaID: 'A001',
      storeID: 'Store01',
      date: new Date(),
      starPoint: 4,
      content: '단팥을 사용하면서 많은 도움을 받았어요!',
      tags: ['유용함', '빠른응답'],
    },
    {
      albaID: 'A002',
      storeID: 'Store02',
      date: new Date(),
      starPoint: 5,
      content: '매장 정보가 정확하고 빠른 알림 기능이 좋아요.',
      tags: ['정확함', '빠른알림'],
    },
    {
      albaID: 'A003',
      storeID: 'Store03',
      date: new Date(),
      starPoint: 5,
      content: '매장 정보가 정확하고 빠른 알림 기능이 좋아요.',
      tags: ['정확함', '빠른알림'],
    },
    {
      albaID: 'A004',
      storeID: 'Store04',
      date: new Date(),
      starPoint: 5,
      content: '매장 정보가 정확하고 빠른 알림 기능이 좋아요.',
      tags: ['정확함', '빠른알림'],
    },
  ];

  return (
    <Container>
      <Banner>
        지금 단팥을 이용하고 있는 <span>단팥러</span>는 <strong>900</strong>{' '}
        명이에요!
      </Banner>

      <ContentWrapper>
        <div>
          <StatsContainer>
            <StatBox onClick={() => navigate('/alba')}>
              <p>{'전체 알바생 >'}</p>
              <strong>1,807명</strong>
            </StatBox>
            <StatBox onClick={() => navigate('/stores')}>
              <p>{'함께하는 매장 >'}</p>
              <strong>120개</strong>
            </StatBox>
          </StatsContainer>

          <MainContent>
            <Section>
              <SectionHeader>
                <h2>최근 리뷰</h2>
                <MoreButton onClick={() => navigate('/reviews')}>
                  더보기
                </MoreButton>
              </SectionHeader>
              <ReviewRow>
                {reviews.map((review, index) => (
                  <ReviewCell key={index} review={review} userType="alba" />
                ))}
              </ReviewRow>
            </Section>

            <Section>
              <SectionHeader>
                <h2>신규 등록 알바생</h2>
                <MoreButton onClick={() => navigate('/workers')}>
                  더보기
                </MoreButton>
              </SectionHeader>
              <NewAlbaList />
            </Section>
          </MainContent>
        </div>

        <StickySidebar>
          <SideBar
            name="김철수"
            profileImage="https://example.com/profile.jpg"
            buttons={['홈', '설정', '알림', '즐겨찾기', '문의하기', '로그아웃']}
          />
        </StickySidebar>
      </ContentWrapper>
    </Container>
  );
};

export default HomePage;

const ReviewRow = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Banner = styled.div`
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
  font-weight: bold;

  span {
    font-weight: normal;
  }

  strong {
    font-size: 22px;
    color: yellow;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: left;
  margin-bottom: 50px;
`;

const StatBox = styled.div`
  background: #ffffff;
  padding: 18px;
  border-radius: 8px;
  width: 200px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px #eeeeee solid;

  &:hover {
    background: #c3c3c3;
  }

  p {
    font-size: 16px;
    margin-bottom: 5px;
  }

  strong {
    font-size: 24px;
    color: var(--primary-color);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const MainContent = styled.div`
  flex: 3;
`;

const Section = styled.section`
  margin-bottom: 30px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    font-size: 20px;
  }
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StickySidebar = styled.div`
  flex: 1;
  position: sticky;
  top: 100px;
  height: fit-content;
`;
