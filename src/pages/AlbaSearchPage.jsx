import { AlbaProfileList } from "../components/common/AlbaProfileCard";
import AlbaSearchFilter from '../components/common/AlbaSearchFilter';
import React, { useEffect } from "react";
import { useState } from "react";
import CurrentAlbaHandler from "../components/common/CurrentAlba";
import request from "../api/request.ts"

const AlbaSearchPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    sido: "",
    sigungu: "",
    dong: "",
    subCategoryId: "",
    date: "",
    startTime: "",
    endTime: "",
    page: 1,
  });
useEffect(() => {
  const fetchFilteredProfiles = async () => {
    const requestData = {
      params: { ...filters, page: filters.page || 1 }, // ✅ 페이지네이션 유지
    };

    try {
      const response = await request.get("/api/search/search", requestData);

      // ✅ 콘솔 찍어서 API 응답 확인
      // eslint-disable-next-line no-console
      console.log("🔍 API 응답:", response.data);

      // ✅ 프로필 데이터 상태 업데이트
      setProfiles(response.data);
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
    }
  };

  // ✅ 필수 필터 값이 있을 때만 API 요청 실행
  if (filters.sido && filters.subCategoryId) {
    fetchFilteredProfiles();
  }
}, [filters]);

  const toggleBookmark = (index) => {
    setProfiles((prev) => {
      const newProfiles = [...prev];
      newProfiles[index] = {
        ...newProfiles[index],
        isBookmarked: !newProfiles[index].isBookmarked,
      };
      return newProfiles;
    });
  };


return (
    <div>
      <CurrentAlbaHandler />
    <AlbaSearchFilter onFilterChange={setFilters} />
      <AlbaProfileList 
        profiles={profiles}
        toggleBookmark={toggleBookmark}
      />
    </div>
  );
  
};

export default AlbaSearchPage;
/*
import { AlbaProfileList } from "../components/common/AlbaProfileCard";
import AlbaSearchFilter from '../components/common/AlbaSearchFilter';
import React from "react";
import { useState } from "react";
import CurrentAlbaHandler from "../components/common/CurrentAlba";

const AlbaSearchPage = () => {
  const [profiles, setProfiles] = useState([
    {
      name: "홍길동",
      age: 25,
      gender: "남성",
      rating: 2.5,
      danpatTime: 1,
      danpatExperience: ["식당 1회"],
      jobExperience: ["카페 2회"],
      hopes: ["카페", "베이커리"],
      location: ["부산 대연동"],
      isDanpat: true,
      isBookmarked: false, 
    },
    {
      name: "김영희",
      age: 22,
      gender: "여성",
      rating: 4.0,
      danpatTime: 0,
      danpatExperience:[],
      jobExperience: ["편의점 1회"],
      hopes: ["편의점"],
      location: ["부산 대연동","부산 용호동"],
      isDanpat: false,
      isBookmarked: false,
    },

  ]);
  const toggleBookmark = (index) => {
    setProfiles((prev) => {
      const newProfiles = [...prev];
      newProfiles[index] = {
        ...newProfiles[index],
        isBookmarked: !newProfiles[index].isBookmarked,
      };
      return newProfiles;
    });
  };
return (
    <div>
      <CurrentAlbaHandler />
      <AlbaSearchFilter />
      <AlbaProfileList 
        profiles={profiles}
        toggleBookmark={toggleBookmark}
      />
    </div>
  );
  
};

export default AlbaSearchPage;
*/