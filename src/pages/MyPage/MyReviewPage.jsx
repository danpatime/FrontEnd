import React, { useState } from 'react';
import { useReviewInfo } from '../../contexts/useReviewInfo';
import styled from 'styled-components';
import ReviewForm from '../../components/common/ReviewForm';
import MypageLayout from '../../components/layout/MypageLayout';
import ReviewCell from '../../components/common/ReviewCell';

const MyReviewPage = () => {
  const { reviews, editReview, deleteReview, reportReview, getReviewsByName } =
    useReviewInfo();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);
  const [reportingReview, setReportingReview] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const userType = 'owner'; // 페이지 구분을 위한 임의 타입 설정(alba/owner)
  const userName = '홍길동'; // 페이지 구분 테스트를 위한 임의 알바 이름

  const filteredReviews = selectedStore
    ? reviews.filter((review) => review.storeID === selectedStore)
    : reviews;

  const sortedReviews = filteredReviews.sort((a, b) => {
    if (selectedSort === 'latest') return b.date - a.date;
    if (selectedSort === 'starAsc') return a.starPoint - b.starPoint;
    if (selectedSort === 'starDesc') return b.starPoint - a.starPoint;
    return 0;
  });

  const openModalForEdit = (review) => {
    setModalOpen(true);
    setEditingReview(review);
  };

  const openModalForDel = (reviewId) => {
    setDeletingReview(reviewId);
    setDeleteModalOpen(true);
  };

  const openModalForRep = (review) => {
    setReportingReview(review);
    setReportModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDeleteModalOpen(false);
    setReportModalOpen(false);
    setDeletingReview(null);
    setEditingReview(null);
    setReportReason('');
  };

  const handleDeleteReview = () => {
    deleteReview(deletingReview);
    closeModal();
  };

  const handleReport = () => {
    reportReview(reportingReview.id, reportReason);
    closeModal();
  };

  return (
    <MypageLayout>
      <h1>리뷰 관리</h1>
      <Container>
        <SelectContainer>
          <SelectCell>
            <select onChange={(e) => setSelectedSort(e.target.value)}>
              <option value="latest">최신순</option>
              <option value="starAsc">별점 낮은 순</option>
              <option value="starDesc">별점 높은 순</option>
            </select>
          </SelectCell>
          {userType === 'owner' && (
            <SelectCell>
              <select onChange={(e) => setSelectedStore(e.target.value)}>
                <option value="">전체 리뷰</option>
                <option value="크리스피 크림도넛 경성대점">
                  크리스피 크림도넛 경성대점
                </option>
                <option value="할리스커피 부경대점">할리스커피 부경대점</option>
                <option value="GS25 대연점">GS25 대연점</option>
              </select>
            </SelectCell>
          )}
        </SelectContainer>

        {(userType === 'alba' ? getReviewsByName(userName) : sortedReviews).map(
          (review) => (
            <ReviewCell
              key={review.id}
              review={review}
              userType={userType}
              openModalForEdit={openModalForEdit}
              openModalForDel={openModalForDel}
              openModalForRep={openModalForRep}
            />
          ),
        )}
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

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 70%; //얼마나 길게 해야될지 모르겠어서
`;

const SelectCell = styled.div`
  padding: 8px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 5px;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
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
  color: white;
  background-color: #5c3a32;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

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
