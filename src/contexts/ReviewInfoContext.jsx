/*eslint-disable*/
import React, { createContext, useState } from "react";

const ReviewInfoContext = createContext();

export const ReviewProvider = ({ children }) => {

  const dummyReviews = [
    {
      id: Date.now() + 1,
      storeID: '크리스피 크림도넛 경성대점',
      albaID: '홍길동',
      starPoint: 5,
      reviewCount: 3,
      date: new Date('2025-01-06T00:00:00'),
      content: '친절하고 일을 정말 잘했어요!',
      tags: ['일을 잘해요', '성실해요', '또 같이 일하고 싶어요'],
    },
    {
      id: Date.now() + 2,
      storeID: '크리스피 크림도넛 경성대점',
      albaID: '홍길동',
      starPoint: 4,
      reviewCount: 3,
      date: new Date('2024-12-15T00:00:00'),
      content: '전반적으로 괜찮았지만 조금 서툴렀어요.',
      tags: ['일이 서툴러요', '신뢰가 가요'],
    },
    {
      id: Date.now() + 3,
      storeID: '크리스피 크림도넛 경성대점',
      albaID: '홍길동',
      starPoint: 5,
      reviewCount: 3,
      date: new Date('2024-11-20T00:00:00'),  
      content: '항상 시간 엄수를 잘하셔서 감사했어요.',
      tags: ['시간 엄수를 잘해요', '또 같이 일하고 싶어요'],
    },
    {
      id: Date.now() + 4,
      storeID: '할리스커피 부경대점',
      albaID: '김철수',
      starPoint: 3,
      reviewCount: 2,
      date: new Date('2024-12-22T00:00:00'),
      content: '일이 조금 서툴렀습니다.',
      tags: ['일이 서툴러요', '근무시간을 못 지켰어요'],
    },
    {
      id: Date.now() + 5,
      storeID: '할리스커피 부경대점',
      albaID: '김철수',
      starPoint: 4,
      reviewCount: 2,
      date: new Date('2024-11-11T00:00:00'), 
      content: '일에 대한 열정이 있어 보였어요.',
      tags: ['성실해요', '일을 잘해요'],
    },
    {
      id: Date.now() + 6,
      storeID: '할리스커피 부경대점',
      albaID: '이영희',
      starPoint: 5,
      reviewCount: 3,
      date: new Date('2024-12-30T00:00:00'), 
      content: '꼼꼼하게 잘 처리해줘서 감사했어요!',
      tags: ['꼼꼼해요', '성실해요'],
    },
    {
      id: Date.now() + 7,
      storeID: '할리스커피 부경대점',
      albaID: '이영희',
      starPoint: 5,
      reviewCount: 3,
      date: new Date('2024-12-05T00:00:00'), 
      content: '항상 신뢰가 가는 분이었어요.',
      tags: ['신뢰가 가요', '또 같이 일하고 싶어요'],
    },
    {
      id: Date.now() + 8,
      storeID: '할리스커피 부경대점',
      albaID: '이영희',
      starPoint: 4,
      reviewCount: 3,
      date: new Date('2024-11-15T00:00:00'), 
      content: '일 처리가 정확해서 좋았습니다.',
      tags: ['꼼꼼해요', '시간 엄수를 잘해요'],
    },
    {
      id: Date.now() + 9,
      storeID: 'GS25 대연점',
      albaID: '박민수',
      starPoint: 3,
      reviewCount: 4,
      date: new Date('2025-01-02T00:00:00'),  
      content: '근무 태도가 조금 부족했어요.',
      tags: ['근무시간을 못 지켰어요', '일이 서툴러요'],
    },
    {
      id: Date.now() + 10,
      storeID: 'GS25 대연점',
      albaID: '박민수',
      starPoint: 4,
      reviewCount: 4,
      date: new Date('2024-12-25T00:00:00'),  
      content: '그래도 일을 열심히 하려고 노력했어요.',
      tags: ['성실해요', '또 같이 일하고 싶어요'],
    },
    {
      id: Date.now() + 11,
      storeID: 'GS25 대연점',
      albaID: '박민수',
      starPoint: 5,
      reviewCount: 4,
      date: new Date('2024-12-01T00:00:00'),  
      content: '항상 밝은 태도로 일했어요.',
      tags: ['일을 잘해요', '신뢰가 가요'],
    },
    {
      id: Date.now() + 12,
      storeID: 'GS25 대연점',
      albaID: '박민수',
      starPoint: 4,
      reviewCount: 4,
      date: new Date('2024-11-10T00:00:00'),  
      content: '시간 엄수를 잘해서 좋았습니다.',
      tags: ['시간 엄수를 잘해요', '꼼꼼해요'],
    },
    {
      id: Date.now() + 13,
      storeID: '크리스피 크림도넛 경성대점',
      albaID: '유재석',
      starPoint: 5,
      reviewCount: 1,
      date: new Date('2025-01-04T00:00:00'), 
      content: '너무나 좋은 태도로 일해줘서 감사했어요.',
      tags: ['또 같이 일하고 싶어요', '성실해요'],
    },
    {
      id: Date.now() + 14,
      storeID: 'GS25 대연점',
      albaID: '강호동',
      starPoint: 4,
      reviewCount: 1,
      date: new Date('2024-12-29T00:00:00'), 
      content: '유쾌하고 밝은 태도가 돋보였어요.',
      tags: ['신뢰가 가요', '일을 잘해요'],
    },
    {
      id: Date.now() + 15,
      storeID: '할리스커피 부경대점',
      albaID: '신동엽',
      starPoint: 3,
      reviewCount: 1,
      date: new Date('2024-12-15T00:00:00'),  
      content: '처음에는 조금 서툴렀지만 나아졌습니다.',
      tags: ['일이 서툴러요', '성실해요'],
    },
    {
      id: Date.now() + 16,
      storeID: '크리스피 크림도넛 경성대점',
      albaID: '하하',
      starPoint: 5,
      reviewCount: 1,
      date: new Date('2024-11-01T00:00:00'), 
      content: '항상 믿음직스럽고 열정적이었어요.',
      tags: ['신뢰가 가요', '또 같이 일하고 싶어요'],
    }
  ];
  

  const [reviews, setReviews] = useState(dummyReviews); // 리뷰 데이터 상태
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(""); // 검색어

  // 사용자명에 맞는 리뷰 검색
  const getReviewsByName = (name) => {
    return reviews.filter((review) => review.albaID === name);
  };

  // 리뷰 추가
  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    updateReviewCount(newReview.albaID);
  };

  // 리뷰 수정
  const editReview = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  // 리뷰 삭제
  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // 리뷰 신고(서버 전송 로직 필요)
  const reportReview=(reviewId,reportReason)=>{
    alert(`${reviewId}를 ${reportReason}의 사유로 신고 접수`);
  };

  // 리뷰 수 업데이트
  const updateReviewCount = (albaID) => {
    setReviewCounts((prevCounts) => {
      return {
        ...prevCounts,
        [albaID]: (prevCounts[albaID] || 0) + 1,
      };
    });
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

  return (
    <ReviewInfoContext.Provider
      value={{
        reviews,
        addReview,
        editReview,
        deleteReview,
        reportReview,
        getFilteredReviews,
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