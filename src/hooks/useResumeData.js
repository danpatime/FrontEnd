import { useState, useEffect } from "react";
import { fetchResumeData } from "../api/resumeRequest";

const useResumeData = () => {
  const [resumeData, setResumeData] = useState(null); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchResumeData();
        setResumeData(data);
      } catch (error) {
        console.error("이력서 데이터 로드 실패:", error);
      }
    };

    loadData();
  }, []);

  return resumeData; 
};

export default useResumeData;
