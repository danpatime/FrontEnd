/* eslint-disable no-console */

import request from "./request.ts";

export const fetchResumeData = async () => {
  try {
    const profileResponse = await request.get("/api/v1/possible-board/personal-info");
    const introResponse = await request.get("/api/v1/possible-board/introduction");
    const workLocationsResponse = await request.get("/api/v1/possible-board/work-preferences/districts");
    const jobPreferencesResponse = await request.get("/api/v1/possible-board/work-preferences/category");
    const workHoursResponse = await request.get("/api/v1/possible-board/work-hours");
    const externalCareerResponse = await request.get("/api/v1/possible-board/external-career");
    const internalCareerResponse = await request.get("/api/v1/possible-board/internal-career");

    const resumeData = {};

    // 프로필 정보 처리
    if (profileResponse) {
      resumeData.profileImage = profileResponse.profile;
      resumeData.name = profileResponse.name;
      resumeData.birthDate = profileResponse.birthdate;
      resumeData.email = profileResponse.email;
      resumeData.phoneNumber = profileResponse.phoneNumber;
      resumeData.availableTime = profileResponse.callTime;
      resumeData.gender = profileResponse.sex;
      resumeData.age = profileResponse.age;
      resumeData.zipcode = profileResponse.location.zipcode;
      resumeData.address = profileResponse.location.address;
      resumeData.detailAddress = profileResponse.location.detailAddress;
      resumeData.sido = profileResponse.location.sido;
      resumeData.sigugun = profileResponse.location.sigugun;
      resumeData.dong = profileResponse.location.dong;
    }

    // 자기소개 처리
    if (introResponse) {
      resumeData.introduction = introResponse.introduction;
    }

    // 근무 위치 처리
    if (workLocationsResponse && workLocationsResponse.length > 0) {
      resumeData.workLocations = workLocationsResponse.map(loc => {
        const { sido, sigugun, dong } = loc; // 안전한 구조 분해 할당
        resumeData.districts = workLocationsResponse;
        
        if (dong) return dong;
        if (sigugun) return `${sigugun} 전체`;
        if (sido) return `${sido} 전체`;

        
        
        return "알 수 없음"; // 혹시라도 값이 전혀 없는 경우 대비
      });
    }

    // 직업 선호도 처리
    if (jobPreferencesResponse && jobPreferencesResponse.length > 0) {
      resumeData.preferenceCategory = jobPreferencesResponse;
      resumeData.jobPreferences = jobPreferencesResponse.map(job => 
        job.subCategoryName === "전체"
          ? `${job.categoryName} 전체`
          : job.subCategoryName
      );
    }

    // 근무 시간 처리
    if (workHoursResponse && workHoursResponse.length > 0) {
      const formattedWorkHours = workHoursResponse.map((item) => {
        const startTime = item.startTime || "";
        const endTime = item.endTime || "";
        return {
          id: String(item.id),
          title: item.title
            ? `${item.title}\n${startTime.slice(11, 16)} ~ ${endTime.slice(11, 16)}`
            : `${startTime.slice(11, 16)} ~ ${endTime.slice(11, 16)}`,
          start: startTime,
          end: endTime,
          status: item.status ? item.status.toLowerCase() : "unknown", // status가 없을 경우 'unknown' 처리
        };
      });
      resumeData.workHours = formattedWorkHours;
    }

    // 외부 경력 처리
    if (externalCareerResponse && externalCareerResponse.length > 0) {
      resumeData.externalCareerResponse = externalCareerResponse.map(exp =>
        `${exp.subCategory?.subCategoryName || "Unknown Category"} ${exp.workCount}회`
      );
    
      resumeData.externalCareer = externalCareerResponse.map(exp => ({
        subCategory: exp.subCategory, 
        workCount: exp.workCount
      }));
    }

    // 내부 경력 처리
    if (internalCareerResponse && internalCareerResponse.length > 0) {
      const formattedInternalExperience = internalCareerResponse.map((exp) => {
        const formatDate = (dateStr) => {
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}.${month}.${day}`;
        };

        const startDate = formatDate(exp.startTime);
        const endDate = formatDate(exp.endTime);
        const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

        return {
          company: exp.businessName,
          date: date,
        };
      });
      resumeData.internalExperience = formattedInternalExperience;
    }

    return resumeData;
  } catch (error) {
    console.error("❌ 이력서 데이터 로드 실패:", error);
    throw error;
  }
};
