import React, { createContext, useState, useEffect } from "react";
import { useUserInfo } from './useUserInfo';
import request from '../api/request.ts';
/*eslint-disable*/

const ReviewInfoContext = createContext();

export const ReviewProvider = ({ children }) => {
  const {user}=useUserInfo();
  const role=user?.role;
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [filteredReviews, setFilteredReviews] = useState([]); // 필터링된 리뷰 상태
  const [myStores, setMyStores] = useState([]); // 가게 데이터
  const [curReviewId, setCurReviewId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // 가게 목록 받아오기 (사장만 가능)
  const fetchStores = async () => {
    if (role === "ROLE_EMPLOYEE") return;
    try {
      const response = await request.get("/api/v1/employer/businesses");
      setMyStores(response || []);
    } catch (error) {
      console.error("가게 목록을 가져오는 데 실패했습니다.", error);
      setMyStores([]);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [role]); // 로그인 시 역할에 따라 리뷰 불러오기

  // 기존 리뷰 데이터 요청
  const fetchReviews = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const endpoint = role === "ROLE_EMPLOYER" ? "/api/v1/contracts/review/my/employer" : "/api/v1/review/my/employee";
      const fetchedReviews = await request.get(`${endpoint}?page=${currentPage}`);
      setReviews(fetchedReviews);
      setFilteredReviews(fetchedReviews);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchReviews(); // 컴포넌트 값이 변화할 때마다 데이터를 요청
  }, [currentPage,role]);

  // 필터링 및 정렬된 리뷰 반환
  const getFilteredReviews = () => {
    return reviews
      .filter((review) => !review.employeeNickname || review.employeeNickname.includes(searchQuery)) // 검색 쿼리로 필터링
      .sort((a, b) => {
        if (sortOption === "latest") {
          return new Date(b.contractStartTime) - new Date(a.contractStartTime); // 계약 시작 시간으로 정렬
        } else if (sortOption === "starDesc") {
          return b.reviewStarPoint - a.reviewStarPoint; // 별점 내림차순 정렬
        } else if (sortOption === "starAsc") {
          return a.reviewStarPoint - b.reviewStarPoint; // 별점 오름차순 정렬
        }
        return 0;
      });
  };

  useEffect(() => {
    if (reviews.length > 0) {
      setFilteredReviews(getFilteredReviews()); // 필터링된 리뷰 상태 업데이트
    }
  }, [reviews, searchQuery, sortOption]);

  // 리뷰 작성 (사장만 가능)
  const addReview = async (newReview) => {
    if (role === "ROLE_EMPLOYEE") return;

    try {
      const contractId = newReview.contractId; // 이거 추가해야 됨
      const businessId = parseInt(newReview.businessId,10);
      const employeeId = parseInt(newReview.employeeId,10);
      const reviewScore = newReview.reviewStarPoint;
      const reviewContent = newReview.reviewContent;
    
      console.log("reviewId:", newReview.reviewId);
      console.log("reviewId:", newReview.contractId);
      console.log("businessName:", newReview.businessName);
      console.log("businessId:", newReview.businessId);
      console.log("employeeNickname:", newReview.employeeNickname);
      console.log("employeeId:", newReview.employeeId);
      console.log("reviewStarPoint:", newReview.reviewStarPoint);
      console.log("contractStartTime:", newReview.contractStartTime);
      console.log("contractEndTime:", newReview.contractEndTime);
      console.log("reviewContent:", newReview.reviewContent);

      if (!contractId || !businessId || !employeeId || !reviewScore || !reviewContent) {
        return;
      }

      // 첫 번째 요청 실행
      const reviewResult = await request.post("/api/v1/contracts/review", {
        contractId:contractId,
        businessId:businessId,
        employeeId:employeeId,
        reviewScore:reviewScore,
        reviewContent:reviewContent,
      });

      // 첫 번째 요청이 성공하면 두 번째 요청 실행
      if (reviewResult.status === 200) {
        const completeResult = await request.post("/api/v1/offeremployment/complete", {
          suggestId: contractId,
          employeeId:employeeId,
        });

        if (completeResult.status === 200) {
          fetchReviews();
          setCurReviewId((prevId) => prevId + 1);
        } else {
          console.error("계약 종료 요청에서 오류 발생:", completeResult.data);
        }
      } else {
        console.error("리뷰 작성 요청에서 오류 발생:", reviewResult.data);
      }
    } catch (error) {
      console.error("리뷰 작성 실패:", error.response ? error.response.data : error);
    }
  };

  // 리뷰 수정 (사장만 가능)
  const editReview = async (updatedReview) => {
    if (role === "ROLE_EMPLOYEE") return;
    console.log(
      updatedReview.reviewId,
      updatedReview.businessId,
      updatedReview.employeeId,
      updatedReview.reviewStarPoint,
      updatedReview.reviewContent);
    try {
      const response = await request.put("/api/v1/contracts/review/modify", {
        reviewId:updatedReview.reviewId,
        reviewScore:updatedReview.reviewStarPoint,
        reviewContent:updatedReview.reviewContent,
      });

      if (response.status === 200) {
        fetchReviews();
      }
    } catch (error) {
      console.error("리뷰 수정 중 오류가 발생했습니다.", error);
    }
  };

  // 리뷰 삭제 (사장만 가능)
  const deleteReview = async (reviewId) => {
    if (role === "ROLE_EMPLOYEE") return;
    try {
      const response = await request.delete(`/api/v1/contracts/review/delete?reviewId=${parseInt(reviewId, 10)}`);

      if (response.status === 200) {
        fetchReviews();
      }
    } catch (error) {
      console.error("리뷰 삭제 중 오류가 발생했습니다.", error);
    }
  };

  // 리뷰 신고 (알바만 가능)
  const reportReview = async (reviewId, reportReason) => {
    if (role === "ROLE_EMPLOYER") return;
    try{
      const response=await request.post(`/api/v1/info/my/reviews/${reviewId}/report`,{
        reason:reportReason,
      });
      if(response.status===200){
        alert(response.data.message);
      }
    } catch (error) {
      console.error("리뷰 신고 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <ReviewInfoContext.Provider
      value={{
        reviews,
        addReview,
        editReview,
        deleteReview,
        reportReview,
        filteredReviews,
        handlePageChange,
        currentPage,
        curReviewId,
        myStores,
        sortOption,
        setSortOption,
        searchQuery,
        setSearchQuery,
        role,
        isLoading,
      }}
    >
      {children}
    </ReviewInfoContext.Provider>
  );
};

export default ReviewInfoContext;
