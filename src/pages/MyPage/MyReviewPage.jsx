import React, { useState } from 'react';
import { useReviewInfo } from '../../contexts/useReviewInfo';
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import ReviewForm from '../../components/common/ReviewForm';
import MypageLayout from '../../components/layout/MypageLayout';

const MyReviewPage = () => {
  const { role,editReview,deleteReview,reportReview,myStores,sortOption,setSortOption,filteredReviews } = useReviewInfo();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);
  const [reportingReview, setReportingReview] = useState(null);
  const [reportReason, setReportReason] = useState('');

  const filteredReviewsForStore = selectedStore 
    ? filteredReviews.filter(review => review.businessId === parseInt(selectedStore,10)) 
    : filteredReviews;

  const openModalForEdit = (review) => {
    setModalOpen(true);
    setEditingReview(review);
  };

  const openModalForDel = (reviewId) => {
    setDeleteModalOpen(true)
    setDeletingReview(reviewId);
  };

  const openModalForRep=(review)=>{
    setReportModalOpen(true);
    setReportingReview(review);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDeleteModalOpen(false);
    setReportModalOpen(false);
    setDeletingReview(null);
    setEditingReview(null);
    setReportReason('');
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleDeleteReview = () => {
    deleteReview(deletingReview);
    closeModal();
  };

  // 서버에 신고 전송
  const handleReport = () => {
    reportReview(reportingReview.reviewId,reportReason);
    closeModal();
  };

  return (
    <MypageLayout>
      <h1>리뷰 관리</h1>
      <Container>
        <SelectContainer>
          <SortSelect value={sortOption} onChange={handleSortChange}>
              <option value="latest">최신계약순</option>
              <option value="starDesc">별점 내림차순</option>
              <option value="starAsc">별점 오름차순</option>
          </SortSelect>
          {role==='ROLE_EMPLOYER'&&(
          <SelectCell>
            <select onChange={(e) => setSelectedStore(e.target.value)}>
              <option value="">전체 리뷰</option>
              {myStores.map((store) => (
                <option key={store.businessId} value={store.businessId}>{store.businessName}</option>
              ))}
            </select>
          </SelectCell>
        )}
        </SelectContainer>

        {filteredReviewsForStore.map((review) => (
          <ReviewCell key={review.reviewId}>
            <Row>
              <ProfilePic src={logo} alt="프로필" />
              <InfoContainer>
                <AlbaID>{review.employeeName} ({review.employeeNickname})</AlbaID>
                <BoldText>매장</BoldText>{review.businessName}<br />
                <BoldText>근무 시작 시각</BoldText>
                <PlainText>{`${new Date(review.contractStartTime).toLocaleDateString()} ${new Date(review.contractStartTime).toLocaleTimeString()}`}</PlainText>
                <BoldText>근무 종료 시각</BoldText>
                <PlainText>{`${new Date(review.contractEndTime).toLocaleDateString()} ${new Date(review.contractEndTime).toLocaleTimeString()}`}</PlainText>
              </InfoContainer>
            </Row>

            <StarRating>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} filled={index < review.reviewStarPoint}>★</Star>
              ))}
              <Content>{review.reviewStarPoint}/5</Content>
            </StarRating>
            <Content>{review.reviewContent}</Content>

{/*            <TagContainer>
              {review.tags?.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagContainer>
*/}
            
            {role==='ROLE_EMPLOYER' ? (
              // 사장
            <ActionButtons>
              <Button onClick={(e) => { e.stopPropagation(); openModalForEdit(review); }}>수정</Button>
              <Button onClick={(e) => { e.stopPropagation(); openModalForDel(review.reviewId); }}>삭제</Button>
            </ActionButtons>
            ):(
              // 알바
            <ActionButtons>
              <Button onClick={(e) => { e.stopPropagation(); openModalForRep(review); }}>리뷰 신고</Button>
            </ActionButtons>
          )}
          </ReviewCell>
        ))}
      </Container>

      {isModalOpen && (
        <Modal>
          <ReviewForm
            onClose={closeModal}
            initialData={editingReview}
            editReview={editReview}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteContent>
            <h3>정말로 리뷰를 삭제하시겠습니까?</h3>
            <h3>삭제하신 리뷰는 복구할 수 없습니다.</h3>
            <ButtonContainer>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <ConfirmButton onClick={handleDeleteReview}>확인</ConfirmButton>
            </ButtonContainer>
          </DeleteContent>
        </Modal>
      )}

      {isReportModalOpen && (
        <Modal>
          <ReportContent>
            <h3>리뷰 신고</h3>
            <ReportTextarea
              placeholder="신고 사유를 입력해주세요."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <ButtonContainer>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <ConfirmButton onClick={handleReport}>신고</ConfirmButton>
            </ButtonContainer>
          </ReportContent>
        </Modal>
      )}
    </MypageLayout>
  );
};

export default MyReviewPage;

const StarRating = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const Star = styled.span`
  font-size: 25px;
  color: ${({ filled }) => (filled ? "#F7B32B" : "#E0E0E0")};
`;
/*
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color:rgb(210, 185, 179);;
  color: #5c3a32;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
`;
*/
const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width:70%;
`;

const ReviewCell = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  display: space-between;
  font-size:15px;
  flex-direction: column;
  margin-left: 16px;
`;

const BoldText = styled.span`
  margin:10px;
  font-weight: bold;
`;

const PlainText=styled.p`
  margin-left:10px;
`;

const AlbaID = styled.p`
  font-size:17px;
  font-weight: bold;
`;

const Content = styled.p`
  margin-top: 10px;
  font-size:15px;
`;

const SelectCell = styled.div`
  padding: 8px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 5px;
`;

const SortSelect = styled.select`
  padding: 8px;
  border: 1px solid black;
  border-radius: 20px;
  margin:5px;
`;

const SelectContainer=styled.div`
  display: flex; 
  justify-content:flex-start;
  margin-bottom: 20px;
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
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: white;
  cursor: pointer;
  color:black;
  margin:10px;

  &:hover {
    background-color: white;
    text-decoration: underline;
  }
`;

const DeleteContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  height: 150px;
  text-align: center;
`;

const ReportContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  height: 300px;
  text-align: center;
`;

const ReportTextarea = styled.textarea`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: none;
  height: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const CancelButton = styled.button`
  background-color: #5c3a32;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color:white;

  &:hover {
    background-color: #f7b32b;
  }
`;

const ConfirmButton = styled.button`
  background-color: #5c3a32;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #f7b32b;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
