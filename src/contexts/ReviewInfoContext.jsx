import React, { createContext, useState, useEffect } from "react";
import { useUserInfo } from './useUserInfo';
import request from '../api/request.ts';

const ReviewInfoContext = createContext();

export const ReviewProvider = ({ children }) => {
  const {user}=useUserInfo();
  const role=user?.role;
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태
  const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [filteredReviews, setFilteredReviews] = useState([]); // 필터링된 리뷰 상태
  const [myStores, setMyStores] = useState([]); // 가게 데이터
  const [employmentStatusList,setEmploymentStatusList]=useState([]); // 가게 체결 현황
  const [isLoading, setIsLoading] = useState(true);

  // 가게 목록과 체결 현황 가져오기(사장만 가능)
  const fetchStoresAndContacts = async () => {
    if (role === "ROLE_EMPLOYEE") return;

    const parseWorkTime = (workTime) => {
      // workTime 문자열을 분리
      const timeParts = workTime.match(/(\d{4}\.\d{2}\.\d{2}) (\d{2}:\d{2})~(\d{2}:\d{2})/);
      
      if (!timeParts) {
          throw new Error("올바른 형식의 workTime 문자열이 아닙니다.");
      }
  
      // 날짜와 시간 분리
      const [, date, startTime, endTime] = timeParts;
  
      // 문자열로 반환
      const startDate = `${date.replace(/\./g, '-')} ${startTime}`;
      const endDate = `${date.replace(/\./g, '-')} ${endTime}`;
  
      // 로컬 형식으로 출력
      return {
          start: startDate,
          end: endDate
      };
  };
  

    try {
      // 가게 목록 가져오기
      const response = await request.get("/api/v1/employer/businesses");
      const stores = response || [];
      setMyStores(stores);

      // 각 가게의 체결 현황 요청
      const employmentStatusList = await Promise.all(
        stores.map(async (store) => {
          try {
            const statusResponse = await request.get(
              `/api/v1/employment-suggests/status/${parseInt(store.businessId)}`
            );

            // COMPLETED 상태인 계약만 필터링
            const completedResponses = statusResponse.filter(item => item.status === "COMPLETED");

            return completedResponses.map(item => ({
              businessId: store.businessId,
              status: item.status,
              name: item.name || "UNKNOWN",
              businessName: store.businessName || "UNKNOWN",
              workTimeStart: parseWorkTime(item.workTime).start || null,
              workTimeEnd: parseWorkTime(item.workTime).end || null,
              contractId: item.contractId || null,
            }));
          } catch (error) {
            console.error(
              `체결 현황 가져오기 실패 - 가게 ID: ${store.businessId}`,
              error
            );
            return [];
          }
        })
      );

      const flattenedEmploymentStatusList = employmentStatusList.flat();

      // 체결 현황 저장
      setEmploymentStatusList(flattenedEmploymentStatusList);

    } catch (error) {
      console.error("가게 목록 또는 체결 현황 가져오는 데 실패했습니다.", error);
      setEmploymentStatusList([]);
    }
  };


  useEffect(() => {
    if(role)
      fetchStoresAndContacts();
  }, [role]); // 로그인 시 역할에 따라 리뷰 불러오기


  // 기존 리뷰 데이터 요청
  const fetchReviews = async () => {
    let moreDataToLoad=true;
    let page=1;
    let allReviews=[];

    try {
      setIsLoading(true); // 로딩 시작
      const endpoint = role === "ROLE_EMPLOYER" ? "/api/v1/contracts/review/my/employer" : "/api/v1/review/my/employee";
      while(moreDataToLoad){
        const response = await request.get(`${endpoint}?page=${page}`);
        
        if(response.length>0){
          allReviews=[...allReviews,...response];
          page++;
        } else{
          moreDataToLoad=false;
        }
    }
      setReviews(allReviews);
      setFilteredReviews(allReviews);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if(role) // 새로고침 시 대응
      fetchReviews(); // 컴포넌트 값이 변화할 때마다 데이터를 요청
  }, [role]);

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
      setIsLoading(true); // 로딩 시작

      const contractId = parseInt(newReview.contractId);
      const businessId = parseInt(newReview.businessId, 10);
      const employeeId = parseInt(newReview.employeeId, 10);
      const reviewScore = newReview.reviewStarPoint;
      const reviewContent = newReview.reviewContent;

      if (!contractId || !businessId || !employeeId || !reviewScore || !reviewContent) {
        return;
      }

      // 첫 번째 요청 실행
      const reviewResult = await request.post("/api/v1/contracts/review", {
        contractId: contractId,
        businessId: businessId,
        employeeId: employeeId,
        reviewScore: reviewScore,
        reviewContent: reviewContent,
      });

      // 첫 번째 요청이 성공하면 두 번째 요청 실행
      if (reviewResult) {
        const completeResult = await request.post("/api/v1/offeremployment/complete", {
          suggestId: contractId,
          employeeId: employeeId,
        });

        if (completeResult) {
          fetchReviews();
        } else {
          console.error("계약 종료 요청에서 오류 발생:", completeResult.data);
        }
      } else {
        console.error("리뷰 작성 요청에서 오류 발생:", reviewResult.data);
      }
    } catch (error) {
      console.error("리뷰 작성 실패:", error.response ? error.response.data : error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };


  // 리뷰 수정 (사장만 가능)
  const editReview = async (updatedReview) => {
    if (role === "ROLE_EMPLOYEE") return;

    try {
      setIsLoading(true);
      const response = await request.put("/api/v1/contracts/review/modify", {
        reviewId:updatedReview.reviewId,
        reviewScore:updatedReview.reviewStarPoint,
        reviewContent:updatedReview.reviewContent,
      });
      
      if (response) {
        await fetchReviews();
      }
    } catch (error) {
      console.error("리뷰 수정 중 오류가 발생했습니다.", error);
    } finally {
      setIsLoading(false); 
    }
  };

  // 리뷰 삭제 (사장만 가능)
  const deleteReview = async (reviewId) => {
    if (role === "ROLE_EMPLOYEE") return;
    try {
      setIsLoading(true);
      const response = await request.delete(`/api/v1/contracts/review/delete?reviewId=${parseInt(reviewId, 10)}`);
      
      if (response) {
        await fetchReviews();
      }
    } catch (error) {
      console.error("리뷰 삭제 중 오류가 발생했습니다.", error);
    }finally {
      setIsLoading(false); 
    }
  };

  // 리뷰 신고 (알바만 가능)
  const reportReview = async (reviewId, reportReason) => {
    if (role === "ROLE_EMPLOYER") return;
    try{
      const response=await request.post(`/api/v1/info/my/reviews/${parseInt(reviewId,10)}/report`,{
        reason:reportReason,
      });

      if(response){
        alert(response.message);
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
        employmentStatusList,
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
