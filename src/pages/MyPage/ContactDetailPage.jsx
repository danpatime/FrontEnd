import React from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

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
    experience: '단팥 경력 12회',
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

const ContactDetailPage = () => {
  const { workCondition, albaInfo } = dummyData;

  return (
    <Container>
      <Section>
        <Title>{workCondition.title}</Title>
        <Card>
          <Row>
            <StoreName>
              <LogoWrapper>
                <StoreLogo src={workCondition.storeLogo} alt="Store Logo" />
              </LogoWrapper>
              {workCondition.storeName}
            </StoreName>
          </Row>
          <InfoRow>
            <Label>주소</Label>
            <Info>{workCondition.address}</Info>
          </InfoRow>
          <InfoRow>
            <Label>사장님</Label>
            <Info>{workCondition.owner}</Info>
          </InfoRow>
          <InfoRow>
            <Label>번호</Label>
            <Info>{workCondition.phone}</Info>
          </InfoRow>
          <InfoRow>
            <Label>시급</Label>
            <Wage>{workCondition.hourlyWage}</Wage>
          </InfoRow>
          <InfoRow>
            <Label>근무 일정</Label>
            <Schedule>
              {workCondition.schedule.map((item, index) => (
                <Info key={index}>{item}</Info>
              ))}
            </Schedule>
          </InfoRow>
        </Card>
      </Section>

      <Section>
        <Title>{albaInfo.title}</Title>
        <Card>
          <Tag>{albaInfo.experience}</Tag>
          <Profile>
            <ProfileImage src={albaInfo.profileImage} alt="Profile" />
            <ProfileDetails>
              <Name>{albaInfo.name}</Name>
              <SubInfo>
                {albaInfo.gender} {albaInfo.age}세
              </SubInfo>
              <Rating>
                {renderStars(albaInfo.ratings)}
                <RatingValue>{albaInfo.ratings}/5</RatingValue>
              </Rating>
            </ProfileDetails>
          </Profile>
          <InfoRow>
            <Label>희망</Label>
            <Tags>
              {albaInfo.hopes.map((hope, i) => (
                <HopeTag key={i}>{hope}</HopeTag>
              ))}
            </Tags>
          </InfoRow>
          <InfoRow>
            <Label>지역</Label>
            <Info>{albaInfo.region}</Info>
          </InfoRow>
          <InfoRow>
            <Label>전화번호</Label>
            <Info>{albaInfo.phone}</Info>
          </InfoRow>
          <CenteredButton>자세히 보기</CenteredButton>
        </Card>
      </Section>
    </Container>
  );
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} size={18} color="#f9c74f" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} size={18} color="#f9c74f" />);
    } else {
      stars.push(<FaRegStar key={i} size={18} color="#e9ecef" />);
    }
  }
  return stars;
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
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StoreName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoreLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f3f5;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #868e96;
`;

const Info = styled.div`
  font-size: 14px;
  color: #495057;
  text-align: left;
`;

const Wage = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #d9534f;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Tag = styled.div`
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: bold;
  color: #495057;
  background: #e9ecef;
  border: 1px solid #adb5bd;
  border-radius: 16px;
  margin-right: 4px;
`;

const HopeTag = styled.div`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  color: #495057;
  background: #fff;
  border: 1px solid #adb5bd;
  border-radius: 8px;
  margin-right: 4px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #dee2e6;
  margin-right: 16px;
  object-fit: cover;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #495057;
`;

const SubInfo = styled.div`
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

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const CenteredButton = styled.button`
  display: block;
  width: 50%;
  color: #adadad;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #acacac;
  }
`;
