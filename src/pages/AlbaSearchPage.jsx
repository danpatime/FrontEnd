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

  function AlbaSearchPage() {
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
  }
  
};

export default AlbaSearchPage;