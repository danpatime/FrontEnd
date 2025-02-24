import React, { useState,useEffect } from "react";
import styled from "styled-components";
import ReviewForm from "../components/common/ReviewForm";
import { useReviewInfo } from "../contexts/useReviewInfo";
import { useUserInfo } from "../contexts/useUserInfo.js";
import { useNavigate } from "react-router-dom";

const AlbaReviewPage = () => {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [editingReview, setEditingReview] = useState(null); // 수정할 리뷰 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const {user,isAuthenticated}=useUserInfo(); // 유저 정보가 사장인 경우에만 페이지를 렌더링링
  const role=user?.role; // 사용자 타입
  const navigate=useNavigate();

  // Context에서 상태와 함수 가져오기
  const { reviews, filteredReviews, sortOption, setSortOption, searchQuery, setSearchQuery } = useReviewInfo();
  
  const reviewsPerPage = 15; // 한 페이지에 보여줄 리뷰 수
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  useEffect(()=>{
    if(!isAuthenticated){
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  },[isAuthenticated,navigate]);

  useEffect(() => {
    if (role&&role === "ROLE_EMPLOYEE") {
      alert("해당 페이지는 기업 회원에게만 제공되는 페이지입니다.\n회원님의 리뷰는 '마이페이지'-'리뷰 관리'에서 확인하실 수 있습니다.");
      navigate("/");
    }
  }, [role, navigate]);

  const openModal = () => {
    setModalOpen(true);
    setEditingReview(null); // 새 리뷰 작성 시, editingReview를 null로 설정
  };

  const openModalForEdit = (review) => {
    setModalOpen(true);
    setEditingReview(review); // 수정할 리뷰 데이터 설정
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingReview(null); // 모달 닫을 때, 수정 데이터 초기화
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      {role&&role!=="ROLE_EMPLOYEE"&&(
      <Container>
        <HeaderSection>
          <h1>알바 리뷰</h1>
          <HeaderTextSection>
            <p>이 페이지는 사장님들이 고용 리뷰를 공유함으로써 구인 환경을 개선하고, 알바생 선정에 보다 나은 판단을 돕기 위해 운영됩니다.</p>
            <p>리뷰를 남기실 때에는 사실에 기반한 신뢰성 있는 정보만을 제공해 주시길 부탁드립니다.</p>
            <p>허위사실, 비방성 내용 또는 명예훼손이 포함된 리뷰는 신고 접수 및 검토 후 별도의 고지 없이 삭제될 수 있습니다.</p>
          </HeaderTextSection>
        </HeaderSection>
        <TopBar>
          <InfoSection>
            <span>리뷰 수: {filteredReviews.length}개</span>
            <span>단팥 수: {new Set(reviews.map((r) => r.albaID)).size}명</span>
          </InfoSection>
          <FilterSection>
            <SearchInput
              type="text"
              placeholder="닉네임을 검색하세요"
              value={searchQuery}
              onChange={handleSearch}
            />
            <SortSelect value={sortOption} onChange={handleSortChange}>
              <option value="latest">최신순</option>
              <option value="star">별점순</option>
              <option value="reviewCount">리뷰 개수순</option>
            </SortSelect>
          </FilterSection>
        </TopBar>
        <ReviewList>
          <ReviewHeader>
            <HeaderCell>번호</HeaderCell>
            <HeaderCell>가게 이름</HeaderCell>
            <HeaderCell>알바생 이름(닉네임)</HeaderCell>
            <HeaderCell>후기 수</HeaderCell>
            <HeaderCell>별점</HeaderCell>
            <HeaderCell>후기 작성일</HeaderCell>
          </ReviewHeader>
          {currentReviews.map((review, index) => (
            <ReviewItem key={review.reviewId} onClick={() => openModalForEdit(review)}>
            <ReviewCell>{index + 1}</ReviewCell>
            <ReviewCell>{review.businessName}</ReviewCell>
            <ReviewCell>추가</ReviewCell>
            <ReviewCell>{review.reviewContent.length}</ReviewCell>
            <ReviewCell>{review.reviewStarPoint}</ReviewCell>
            <ReviewCell>{new Date(review.contractStartTime).toLocaleDateString()}</ReviewCell>
          </ReviewItem>

          ))}
        </ReviewList>
        <AddReviewButton onClick={openModal}>후기 작성</AddReviewButton>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageNumber
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageNumber>
          ))}
        </Pagination>
        {isModalOpen && (
          <Modal>
            <ReviewForm
              onClose={closeModal}
              initialData={editingReview} // 부모 페이지에서 받은 데이터
            />
          </Modal>
        )}
      </Container>
      )}
    </div>
  );
};

export default AlbaReviewPage;

const Container = styled.div`
  padding: 20px 100px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderSection = styled.div`
  background-color: #5c3a32;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  color: white;

  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  p {
    font-size: 18px;
  }
`;

const HeaderTextSection = styled.div`
  margin: 20px;
  padding: 15px;
  border: 1px solid white;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &::placeholder{
    color:rgb(149, 100, 88);
  }
`;

const SortSelect = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ReviewList = styled.div`
  margin-bottom: 30px;
`;

const ReviewHeader = styled.div`
  display: flex;
  background-color:rgb(210, 185, 179);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-weight: bold;
`;

const ReviewItem = styled.div`
  display: flex;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const HeaderCell = styled.div`
  flex: 1;
  text-align: center;
`;

const ReviewCell = styled.div`
  flex: 1;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  margin-top: 20px;
  width:100%;
`;

const PageNumber = styled.button`
  padding: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#5c3a32" : "#fff")}; 
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

   &:hover {
    background-color: #F7B32B;
  }
  `;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AddReviewButton = styled.button`
  display: block;
  text-align:center;
  width:6%;
  padding: 10px 20px;
  background-color: #5c3a32;
  color: white;
  border-radius: 5px;
  margin-left:auto;
  cursor:pointer;

   &:hover {
    background-color: #F7B32B;
  }
`;
