import { useEffect, useState } from "react";
import styled from 'styled-components';
import MypageLayout from '../../components/layout/MypageLayout';
import BookmarkedWorkerCard from '../../components/common/BookmarkedWorkerCard';
import request from "../../api/request.ts";

const SavedWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await request.get("/api/v1/employer/favorites/employees");
        const formattedData = response.data.map((worker) => ({
          id: worker.employeeId,
          // profileImg: '', 
          name: worker.name,
          age: worker.age,
          gender: worker.sex === '남' ? '남성' : '여성',
          locations: formatLocations(worker.flavoredDistrictList),
          categories: formatCategories(worker.flavoredCategoryList),
          experience: [
            // 내부 경력 처리
            {
              type: 'internal',
              text: `단팥경력 ${worker.workCount}회`,
            },
            // 외부 경력 처리
            ...worker.externalCareerList.map((career) => ({
              type: 'external',
              text: `${career.category.map((c) => c.categoryName).join(', ')} ${career.workCount}회`,
            })),
          ],
        }));

        setWorkers(formattedData);
      } catch (error) {
        console.error("⚠️ 관심 알바 목록 불러오기 실패:", error);
      }
    };

    fetchWorkers();
  }, []);


  const formatLocations = (districts) => {
    return districts.map(({ sido, sigugun, dong }) => {
      if (dong) return `${dong}`;
      if (sigugun) return `${sigugun} 전체`;
      return `${sido} 전체`;
    }).join(', ');
  };

  const formatCategories = (categories) => {
    return categories.map(({ categoryName, subCategoryName }) => {
      return subCategoryName === '전체' ? `${categoryName} 전체` : subCategoryName;
    }).join(', ');
  };

  return (
    <MypageLayout>
      <Page>
        <Title>관심알바</Title>
        <Grid>
          {workers.length > 0 ? (
            workers.map((worker) => (
              <BookmarkedWorkerCard key={worker.employeeId} worker={worker} />
            ))
          ) : (
            <p id="no-value">저장된 관심 알바가 없습니다.</p>
          )}
        </Grid>
      </Page>
    </MypageLayout>
  );
};

export default SavedWorkers;

const Page = styled.div`
  padding: 20px 30px 40px;
  margin-top: -50px;
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 1200px;
  max-width: 1430px;
  min-height: 750px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  margin-top: 30px;

  #no-value {
    margin-left: 10px;
  }
`;
