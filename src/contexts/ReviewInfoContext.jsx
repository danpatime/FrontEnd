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
      const fetchedReviews = await request.get('/api/v1/review'); 
      setReviews(fetchedReviews);
      //console.log(fetchedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  // 필터링 및 정렬된 리뷰 반환
  const getFilteredReviews = () => {
    return reviews
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
  };

  useEffect(() => {
    const fetchAndFilterReviews = async () => {
      await fetchReviews(); // 리뷰 데이터 요청
    };
  
    fetchAndFilterReviews();
  }, []); // 컴포넌트 마운트 시 한 번만 실행
  
  // reviews가 변경될 때마다 필터링 및 정렬 수행
  useEffect(() => {
    if (reviews.length > 0) {
      setFilteredReviews(getFilteredReviews(reviews)); // 필터링된 리뷰 상태 업데이트
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
  const editReview = (updatedReview) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === updatedReview.id ? updatedReview : review
      )
    );
    return reviews;
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