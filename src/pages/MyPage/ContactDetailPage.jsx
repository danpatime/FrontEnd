// ContactDetailPage.jsx
import React from 'react';
import styled from 'styled-components';
import { renderStars } from '../../utils/RenderStars';
import ExperienceTag from '../../components/common/ExperienceTag';

// Dummy Data
const dummyData = {
  workCondition: {
    title: '근무조건',
    storeName: '할리스 송정점',
    storeLogo: 'https://via.placeholder.com/48',
    address: '부산광역시 남구 용소로 123',
    owner: '홍길동',
    phone: '010-9876-5432',
    hourlyWage: '12,000원',
    schedule: ['2024년 2월 4일 12:00 ~ 13:00', '2024년 2월 5일 14:00 ~ 15:00'],
  },
  albaInfo: {
    title: '알바 정보',
    experience: '12',
    ratings: 4.5,
    name: '김OO',
    gender: '남성',
    age: 24,
    hopes: ['카페', '베이커리'],
    region: '부산 남구 용호동, 부산 남구 대연동',
    phone: '010-1234-5678',
    profileImage: '',
  },
};

const InfoRow = ({ label, content }) => (
  <Row>
    <Label>{label}</Label>
    <Info>{content}</Info>
  </Row>
);

const ContactDetailPage = () => {
  const { workCondition, albaInfo } = dummyData;

  return (
    <Container>
      <Section>
        <Title>{workCondition.title}</Title>
        <Card>
          <Row>
            <StoreName>
              <RoundImg src={workCondition.storeLogo} alt="Store Logo" />
              {workCondition.storeName}
            </StoreName>
          </Row>
          <InfoRow label="주소" content={workCondition.address} />
          <InfoRow label="사장님" content={workCondition.owner} />
          <InfoRow label="번호" content={workCondition.phone} />
          <InfoRow
            label="시급"
            content={<Wage>{workCondition.hourlyWage}</Wage>}
          />
          <InfoRow
            label="근무 일정"
            content={
              <Schedule>
                {workCondition.schedule.map((item, index) => (
                  <Info key={index}>{item}</Info>
                ))}
              </Schedule>
            }
          />
        </Card>
      </Section>

      <Section>
        <Title>{albaInfo.title}</Title>
        <Card>
          <ExperienceTag experience={albaInfo.experience} />
          <Profile>
            <RoundImg src={albaInfo.profileImage} alt="Profile" />
            <ProfileDetails>
              <Rating>
                {renderStars(albaInfo.ratings, 14)}
                <RatingValue>{albaInfo.ratings}/5</RatingValue>
              </Rating>
              <Name>{albaInfo.name}</Name>
              <SubInfo>
                {albaInfo.gender} {albaInfo.age}세
              </SubInfo>
            </ProfileDetails>
          </Profile>
          <InfoRow
            label="희망"
            content={
              <Tags>
                {albaInfo.hopes.map((hope, i) => (
                  <HopeTag key={i}>{hope}</HopeTag>
                ))}
              </Tags>
            }
          />
          <InfoRow label="지역" content={albaInfo.region} />
          <InfoRow label="전화번호" content={albaInfo.phone} />
          <CenteredButton>자세히 보기</CenteredButton>
        </Card>
      </Section>
    </Container>
  );
};

export default ContactDetailPage;

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #343a40;
  margin-bottom: 16px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  min-width: 100px;
  color: #343a40;
`;

const Info = styled.div`
  font-size: 14px;
  color: #495057;
  text-align: left;
  flex: 1;
`;

const StoreName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RoundImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #dee2e6;
  border: 1px solid #adb5bd;
  object-fit: cover;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

const ProfileDetails = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #495057;
`;

const SubInfo = styled.span`
  font-size: 14px;
  color: #868e96;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RatingValue = styled.span`
  font-size: 14px;
  color: #495057;
`;

const HopeTag = styled.div`
  padding: 2px 8px;
  font-size: 12px;
  border: 1px solid #adb5bd;
  border-radius: 8px;
  color: #495057;
`;

const Wage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const CenteredButton = styled.button`
  align-self: center;
  padding: 10px 50px;
  font-size: 14px;
  border: 1px solid #adb5bd;
  background-color: #fff;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #dddddd;
  }
`;
