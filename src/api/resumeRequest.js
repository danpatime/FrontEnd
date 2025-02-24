// api.js
import request from "./request.ts";
import defaultProfileImage from "../assets/images/default-profile.jpg";

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

    if (profileResponse && profileResponse.length > 0) {
      const profileData = profileResponse[0];
      resumeData.profileImage = profileData.profile || defaultProfileImage;
      resumeData.name = profileData.name;
      resumeData.birthDate = profileData.birthdate;
      resumeData.email = profileData.email;
      resumeData.phoneNumber = profileData.phoneNumber;
      resumeData.availableTime = profileData.callTime;
      resumeData.gender = profileData.sex;
    }

    if (introResponse) {
      resumeData.introduction = introResponse.introduction;
    }

    if (workLocationsResponse && workLocationsResponse.length > 0) {
      resumeData.workLocations = workLocationsResponse.map(loc => loc.districtName);
    }

    if (jobPreferencesResponse && jobPreferencesResponse.length > 0) {
      resumeData.jobPreferences = jobPreferencesResponse.map(job => job.categoryName);
    }

    if (workHoursResponse && workHoursResponse.length > 0) {
      const formattedWorkHours = workHoursResponse.map((item) => ({
        id: String(item.id),
        title: item.title
          ? `${item.title}\n${item.startTime.slice(11, 16)} ~ ${item.endTime.slice(11, 16)}`
          : `${item.startTime.slice(11, 16)} ~ ${item.endTime.slice(11, 16)}`,
        start: item.startTime,
        end: item.endTime,
        status: item.status.toLowerCase(),
      }));
      resumeData.workHours = formattedWorkHours;
    }

    if (externalCareerResponse && externalCareerResponse.length > 0) {
      resumeData.externalCareerResponse = externalCareerResponse.map(exp =>
        `${exp.category.categoryName} ${exp.workCount}회`
      );
    }

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
    console.error("Error fetching resume data:", error);
    throw error;
  }
};
