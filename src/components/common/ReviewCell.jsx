import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

const ReviewCell = ({
  review,
  userType,
  openModalForEdit,
  openModalForDel,
  openModalForRep,
}) => {
  return (
    <ReviewCellWrapper>
      <Row>
        <ProfilePic src={logo} alt="프로필" />
        <InfoContainer>
          <AlbaID>{review.albaID}</AlbaID>
          <InfoText>
            <BoldText>매장</BoldText>
            {review.storeID}
          </InfoText>
          <InfoText>
            <BoldText>일한 날짜</BoldText>
            {review.date.toLocaleDateString()}
          </InfoText>
        </InfoContainer>
      </Row>

      <StarRating>
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} filled={index < review.starPoint}>
            ★
          </Star>
        ))}
        <Content>{review.starPoint}/5</Content>
      </StarRating>
      <Content>{review.content}</Content>

      <TagContainer>
        {review.tags?.map((tag, index) => (
          <Tag key={index}>#{tag}</Tag>
        ))}
      </TagContainer>

      {userType === 'owner' ? (
        // 사장
        <ActionButtons>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              openModalForEdit(review);
            }}
          >
            수정
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              openModalForDel(review.id);
            }}
          >
            삭제
          </Button>
        </ActionButtons>
      ) : (
        // 알바
        <ActionButtons>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              openModalForRep(review);
            }}
          >
            신고
          </Button>
        </ActionButtons>
      )}
    </ReviewCellWrapper>
  );
};

export default ReviewCell;

const ReviewCellWrapper = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
  &:hover {
    border-color: var(--primary-color);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const InfoText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const AlbaID = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Content = styled.p`
  margin-top: 10px;
  font-size: 15px;
`;

const StarRating = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const Star = styled.span`
  font-size: 25px;
  color: ${({ filled }) => (filled ? '#F7B32B' : '#E0E0E0')};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: rgb(210, 185, 179);
  color: #5c3a32;
  border-radius: 15px;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: bold;
`;

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 15px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: white;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: white;
    text-decoration: underline;
  }
`;
