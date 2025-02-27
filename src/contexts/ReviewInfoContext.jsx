import React, { createContext, useState,useEffect } from "react";
import request from '../api/request.ts';

const ReviewInfoContext = createContext();

export const ReviewProvider = ({ children }) => {

  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [filteredReviews, setFilteredReviews] = useState([]); // 필터링된 리뷰 상태
  const [myStores,setMyStores]=useState([]); // 가게 데이터
  const [CurContractId,setCurContractId]=useState(4);

  // 가게 목록 받아오기
  const fetchStores = async () => {
    try {
      const response = await request.get("/api/v1/employer/businesses");
      setMyStores(response || []);
    } catch (error) {
      console.error("가게 목록을 가져오는 데 실패했습니다.", error);
      setMyStores([]);
    }
  };

  useEffect(() => {
    fetchStores(); // 컴포넌트 값이 변화할 때마다 데이터를 요청
  }, []);

  // 기존 리뷰 데이터 요청
  const fetchReviews=async() => {
    try {
      const fetchedReviews = await request.get("/api/v1/review"); 
      setReviews(fetchedReviews);
      setFilteredReviews(fetchedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews(); // 컴포넌트 값이 변화할 때마다 데이터를 요청
  }, []);

  // 필터링 및 정렬된 리뷰 반환
  const getFilteredReviews = () => {
    return reviews
      .filter((review) => review.employeeNickname?.includes(searchQuery)) // 검색 쿼리로 필터링
      .sort((a, b) => {
        if (sortOption === "latest") {
          return new Date(b.contractStartTime) - new Date(a.contractStartTime); // 계약 시작 시간으로 정렬
        } else if (sortOption === "star") {
          return b.reviewStarPoint - a.reviewStarPoint; // 별점으로 정렬
        }
        return 0;
      });
  };

  // reviews가 변경될 때마다 필터링 및 정렬 수행
  useEffect(() => {
    if (reviews.length > 0) {
      setFilteredReviews(getFilteredReviews()); // 필터링된 리뷰 상태 업데이트
    }
  }, [reviews, searchQuery, sortOption]);

  // 리뷰 추가
  const addReview = async (newReview) => {
    try {
      const contractId = CurContractId;
      const businessId = parseInt(newReview.businessId);
      const employeeId = parseInt(newReview.employeeId);
      const reviewScore = newReview.reviewStarPoint;
      const reviewContent = newReview.reviewContent;
  
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
          employeeId: employeeId,
        });
  
        if (completeResult.status === 200) {
          setReviews((prevReviews) => [...prevReviews, newReview]);
          setCurContractId((prevId) => prevId + 1);
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

  
  // 리뷰 수정
  const editReview = async (updatedReview) => {
    try {
      const contractId=updatedReview.reviewId;
      const businessId=updatedReview.businessId;
      const employeeId=updatedReview.employeeId;
      const reviewScore=updatedReview.reviewStarPoint;
      const reviewContent=updatedReview.reviewContent;
      /*eslint-disable*/
      console.log(contractId,businessId,employeeId,reviewScore,reviewContent);

      const response = await request.post("/api/v1/contracts/review", {
        contractId: contractId,
        businessId: businessId,
        employeeId: employeeId,
        reviewScore: reviewScore, 
        reviewContent: reviewContent,
      });
  
      if (response.status === 200) {
        // 리뷰 수정 성공
        setReviews((prevReviews) => {
          return prevReviews.map((review) => {
            if (review.contractId === updatedReview.contractId) {
              return {
                ...review,
                reviewScore: updatedReview.reviewStarPoint,
                reviewContent: updatedReview.reviewContent,
              };
            }
            return review;
          });
        });
      }
    } catch (error) {
      console.error("리뷰 수정 중 오류가 발생했습니다.", error);
    }
  };

  // 리뷰 삭제
  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // 리뷰 신고(서버 전송 로직 필요)
  const reportReview = (reviewId, reportReason) => {
    alert(`${reviewId}를 ${reportReason}의 사유로 신고 접수`);
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
        myStores,
        sortOption,
        setSortOption,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ReviewInfoContext.Provider>
  );
};

export default ReviewInfoContext;