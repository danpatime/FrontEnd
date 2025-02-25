import React, { createContext, useState,useEffect } from "react";
import request from '../api/request.ts';

const ReviewInfoContext = createContext();

export const ReviewProvider = ({ children }) => {

  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [filteredReviews, setFilteredReviews] = useState([]); // 필터링된 리뷰 상태
  
  // 리뷰 요청
  const fetchReviews=async() => {
    try {
      const fetchedReviews = await request.get("/api/v1/review"); 
      setReviews(fetchedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  // 필터링 및 정렬된 리뷰 반환
  const getFilteredReviews = () => {
    return reviews
      .filter((review) => review.businessName?.includes(searchQuery)) // 검색 쿼리로 필터링
      .sort((a, b) => {
        if (sortOption === "latest") {
          return new Date(b.contractStartTime) - new Date(a.contractStartTime); // 계약 시작 시간으로 정렬
        } else if (sortOption === "star") {
          return b.reviewStarPoint - a.reviewStarPoint; // 별점으로 정렬
        }
        return 0;
      });
  };

  useEffect(() => {
    fetchReviews(); // 컴포넌트가 마운트될 때 리뷰 데이터 요청
  }, []);

  // reviews가 변경될 때마다 필터링 및 정렬 수행
  useEffect(() => {
    if (reviews.length > 0) {
      setFilteredReviews(getFilteredReviews()); // 필터링된 리뷰 상태 업데이트
    }
  }, [reviews, searchQuery, sortOption]);

  // 사용자명에 맞는 리뷰 검색
  const getReviewsByName = (name) => {
    return reviews.filter((review) => review.albaID === name);
  };

  // 리뷰 추가
  const addReview = (newReview) => {
    setReviews((prevReviews) => {
      // 알바 ID가 이미 존재하는지 확인
      const albaExists = prevReviews.some((review) => review.albaID === newReview.albaID);
  
      if (albaExists) {
        // 기존 알바ID가 있으면 그 알바ID의 reviewCount만 +1 증가
        const updatedReviews = prevReviews.map((review) => {
          if (review.albaID === newReview.albaID) {
            // 해당 albaID의 reviewCount만 증가
            return {
              ...review,
              reviewCount: review.reviewCount + 1,
            };
          }
          return review;
        });
  
        // 새 리뷰 추가
        updatedReviews.push({
          ...newReview,
          reviewCount: updatedReviews.find((review) => review.albaID === newReview.albaID).reviewCount, // 해당 albaID의 reviewCount 계승
        });
  
        return updatedReviews;
      } else {
        // 알바ID가 처음 작성되는 경우
        return [
          ...prevReviews,
          {
            ...newReview,
            reviewCount: 1, // 처음 작성되는 리뷰는 reviewCount 1로 설정
          },
        ];
      }
    });
  };  
  
  // 리뷰 수정
  const editReview = async (updatedReview) => {
    try {
      const response = await request.post("/api/v1/contracts/review", {
        contractId: updatedReview.contractId,
        reviewScore: updatedReview.reviewStarPoint, 
        reviewContent: updatedReview.reviewContent,
      });
  
      if (response.status === 200) {
        setReviews(response.data);
        fetchReviews();
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
        getReviewsByName,
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