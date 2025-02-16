import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SideBar from '../components/home/SideBar';
import NewAlbaList from '../components/home/NewAlbaList';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Banner>
        지금 단팥을 이용하고 있는 <span>단팥러</span>는 <strong>900</strong>명
        이에요!
      </Banner>

      {/* 통계 버튼 */}
      <StatsContainer>
        <StatBox onClick={() => navigate('/alba')}>
          <p>{'전체 알바생 >'} </p>
          <strong>1,807명</strong> {/* 단위 추가 */}
        </StatBox>
        <StatBox onClick={() => navigate('/stores')}>
          <p>{'함께하는 매장 > '} </p>
          <strong>120개</strong> {/* 단위 추가 */}
        </StatBox>
      </StatsContainer>

      <ContentWrapper>
        {/* 메인 컨텐츠 */}
        <MainContent>
          {/* 최근 리뷰 섹션 */}
          <Section>
            <SectionHeader>
              <h2>최근 리뷰</h2>
              <MoreButton onClick={() => navigate('/reviews')}>
                더보기
              </MoreButton>
            </SectionHeader>
            최근리뷰들
          </Section>

          {/* 신규 등록 알바생 섹션 */}
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

        {/* 사이드바 (내 정보) */}
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

// 전체 페이지 레이아웃
const Container = styled.div`
  max-width: 1400px;
  margin: auto;
`;

// 배너 스타일
const Banner = styled.div`
  background-color: var(--primary-color); /* Primary 색상 */
  color: white;
  text-align: center;
  padding: 80px 20px; /* 세로 길이 추가 */
  font-size: 18px;
  font-weight: bold;
  /* width: 100vw; */
  span {
    font-weight: normal;
  }

  strong {
    font-size: 22px;
    color: yellow; /* 강조 색상 */
  }
`;

// 통계 버튼 컨테이너
const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

// 통계 버튼 스타일
const StatBox = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e9ecef;
  }

  p {
    font-size: 16px;
    margin-bottom: 5px;
  }

  strong {
    font-size: 24px;
    color: var(--primary-color); /* Primary 색상 적용 */
  }
`;

// 메인 컨텐츠 및 사이드바 레이아웃
const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

// 메인 컨텐츠 영역
const MainContent = styled.div`
  flex: 3;
`;

// 섹션 스타일
const Section = styled.section`
  margin-bottom: 30px;
  width: 100%;
`;

// 섹션 헤더
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    font-size: 20px;
  }
`;

// '더보기' 버튼
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

// 사이드바 (내 정보)
const StickySidebar = styled.div`
  flex: 1;
  position: sticky;
  top: 20px;
  height: fit-content;
`;
