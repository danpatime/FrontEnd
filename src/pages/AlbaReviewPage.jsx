import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewForm from "../components/common/ReviewForm";

const mockReviews = [
  {
    id: Date.now() + 1,
    storeID: "가게1",
    albaID: "홍길동",
    starPoint: 4,
    reviewCount: 5,
    date: "2024-12-01",
    content: "좋아요! 제품이 좋아요.",
    tags: ["성실해요", "신뢰가 가요"],
  },
  {
    id: Date.now() + 2,
    storeID: "가게2",
    albaID: "김민수",
    starPoint: 3,
    reviewCount: 3,
    date: "2024-12-02",
    content: "별로예요. 다시는 구매하지 않을 것 같아요.",
    tags: ["일이 서툴러요", "근무시간을 못 지켰어요"],
  },
  {
    id: Date.now() + 3,
    storeID: "가게3",
    albaID: "이영희",
    starPoint: 5,
    reviewCount: 8,
    date: "2024-12-03",
    content: "정말 좋아요! 또 구매할게요.",
    tags: ["성실해요", "시간 엄수를 잘해요"],
  },
  {
    id: Date.now() + 4,
    storeID: "가게1",
    albaID: "박지훈",
    starPoint: 4,
    reviewCount: 4,
    date: "2024-12-04",
    content: "좋아요, 제품 품질이 좋습니다.",
    tags: ["꼼꼼해요", "또 같이 일하고 싶어요"],
  },
  {
    id: Date.now() + 5,
    storeID: "가게2",
    albaID: "최유나",
    starPoint: 2,
    reviewCount: 2,
    date: "2024-12-05",
    content: "별로예요. 품질이 기대보다 낮았어요.",
    tags: ["일이 서툴러요", "근무시간을 못 지켰어요"],
  },
  {
    id: Date.now() + 6,
    storeID: "가게3",
    albaID: "정수빈",
    starPoint: 5,
    reviewCount: 10,
    date: "2024-12-06",
    content: "완벽해요! 정말 추천해요.",
    tags: ["성실해요", "신뢰가 가요", "시간 엄수를 잘해요"],
  },
  {
    id: Date.now() + 7,
    storeID: "가게1",
    albaID: "장미숙",
    starPoint: 3,
    reviewCount: 6,
    date: "2024-12-07",
    content: "보통이에요, 더 개선이 필요합니다.",
    tags: ["일이 서툴러요", "꼼꼼해요"],
  },
  {
    id: Date.now() + 8,
    storeID: "가게2",
    albaID: "김하늘",
    starPoint: 4,
    reviewCount: 7,
    date: "2024-12-08",
    content: "정말 좋아요! 품질이 우수합니다.",
    tags: ["신뢰가 가요", "성실해요"],
  },
  {
    id: Date.now() + 9,
    storeID: "가게3",
    albaID: "박성민",
    starPoint: 5,
    reviewCount: 9,
    date: "2024-12-09",
    content: "완벽한 제품, 적극 추천합니다.",
    tags: ["또 같이 일하고 싶어요", "시간 엄수를 잘해요"],
  },
  {
    id: Date.now() + 10,
    storeID: "가게1",
    albaID: "홍유진",
    starPoint: 3,
    reviewCount: 4,
    date: "2024-12-10",
    content: "괜찮았어요. 다시 구매할지 고민될 정도입니다.",
    tags: ["근무시간을 못 지켰어요", "일이 서툴러요"],
  },
  {
    id: Date.now() + 11,
    storeID: "가게2",
    albaID: "오지훈",
    starPoint: 5,
    reviewCount: 8,
    date: "2024-12-11",
    content: "매우 만족합니다! 다시 구매할 예정입니다.",
    tags: ["성실해요", "또 같이 일하고 싶어요"],
  },
  {
    id: Date.now() + 12,
    storeID: "가게3",
    albaID: "김지수",
    starPoint: 4,
    reviewCount: 6,
    date: "2024-12-12",
    content: "좋은 품질, 만족스럽습니다.",
    tags: ["신뢰가 가요", "성실해요"],
  },
  {
    id: Date.now() + 13,
    storeID: "가게1",
    albaID: "최수빈",
    starPoint: 3,
    reviewCount: 4,
    date: "2024-12-13",
    content: "그저 그렇습니다.",
    tags: ["일이 서툴러요"],
  },
  {
    id: Date.now() + 14,
    storeID: "가게2",
    albaID: "이수연",
    starPoint: 4,
    reviewCount: 7,
    date: "2024-12-14",
    content: "만족합니다.",
    tags: ["성실해요", "또 같이 일하고 싶어요"],
  },
  {
    id: Date.now() + 15,
    storeID: "가게3",
    albaID: "박준호",
    starPoint: 2,
    reviewCount: 2,
    date: "2024-12-15",
    content: "아쉬운 점이 많아요.",
    tags: ["근무시간을 못 지켰어요"],
  },
  {
    id: Date.now() + 16,
    storeID: "가게1",
    albaID: "김서연",
    starPoint: 5,
    reviewCount: 9,
    date: "2024-12-16",
    content: "정말 훌륭한 제품이에요!",
    tags: ["성실해요", "신뢰가 가요"],
  },
  {
    id: Date.now() + 17,
    storeID: "가게2",
    albaID: "박진영",
    starPoint: 4,
    reviewCount: 6,
    date: "2024-12-17",
    content: "완벽한 상품!",
    tags: ["꼼꼼해요"],
  },
];

const AlbaReviewPage = ()=> {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [reviews, setReviews] = useState(mockReviews); // 리뷰 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [reviewsPerPage] = useState(15); // 한 페이지에 보여줄 리뷰 수
  const [reviewCounts, setReviewCounts] = useState({}); // 알바생별 리뷰 수 관리
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [isEdit,setIsEdit]=useState(false); // 이미 작성된 리뷰
  const [editingReview, setEditingReview] = useState(null); // 리뷰 열람 및 수정

  const openModal = () => {
    setModalOpen(true);
    setIsEdit(false);
    setEditingReview(null);
  };

  // 이미 작성한 리뷰 열람 및 수정
  const openModalForEdit = (review) => {
    setModalOpen(true);
    setIsEdit(true);
    setEditingReview(review);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEdit(false);
    setEditingReview(null);
  };

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    updateReviewCount(newReview.albaID);
  };

  const editReview = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
    closeModal();
  };

  const updateReviewCount = (albaID) => {
    setReviewCounts((prevCounts) => {
      return {
        ...prevCounts,
        [albaID]: (prevCounts[albaID] || 0),
      };
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  //리뷰 정렬 기능
  const filteredReviews = reviews
    .filter((review) => review.albaID.includes(searchQuery))
    .sort((a, b) => {
      if (sortOption === "latest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOption === "star") {
        return b.starPoint - a.starPoint;
      } else if (sortOption === "reviewCount") {
        return b.reviewCount - a.reviewCount;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div>
      <Container>
        <HeaderSection>
          <h1>알바 후기</h1>
          <HeaderTextSection>
            <p>이 페이지는 사장님들이 고용 후기를 공유함으로써 구인 환경을 개선하고, 알바생 선정에 보다 나은 판단을 돕기 위해 운영됩니다.</p>
            <p>후기를 남기실 때에는 사실에 기반한 신뢰성 있는 정보만을 제공해 주시길 부탁드립니다.</p>
            <p>허위사실, 비방성 내용 또는 명예훼손이 포함된 리뷰는 신고 접수 및 검토 후 별도의 고지 없이 삭제될 수 있습니다.</p>
          </HeaderTextSection>
        </HeaderSection>
        <TopBar>
        <InfoSection>
          <span>후기 수: {filteredReviews.length}개</span>
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
            <option value="reviewCount">후기 수순</option>
          </SortSelect>
        </FilterSection>
      </TopBar>
        <ReviewList>
          <ReviewHeader>
            <HeaderCell>번호</HeaderCell>
            <HeaderCell>알바생 닉네임</HeaderCell>
            <HeaderCell>후기 수</HeaderCell>
            <HeaderCell>별점</HeaderCell>
            <HeaderCell>후기 작성일</HeaderCell>
          </ReviewHeader>
          {currentReviews.map((review, index) => (
            <ReviewItem
            key={review.id}
            onClick={() => openModalForEdit(review)} // 클릭 시 수정 모달 열기
          >
              <ReviewCell>{index + 1}</ReviewCell>
              <ReviewCell>{review.albaID}</ReviewCell>
              <ReviewCell>{review.reviewCount}</ReviewCell>
              <ReviewCell>{review.starPoint}</ReviewCell>
              <ReviewCell>{review.date}</ReviewCell>
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
              addReview={isEdit ? editReview : addReview}
              initialData={editingReview} // 초기값 전달
            />
          </Modal>
        )}
      </Container>
    </div>
  );
}

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
`;

export default AlbaReviewPage;
