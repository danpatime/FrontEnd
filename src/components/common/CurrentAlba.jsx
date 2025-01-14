import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import danpatImage from "../../assets/images/danpatImage.png";

const CurrentAlba = () => {
  const [totalAlba, setTotalAlba] = useState(0);
  const [danpatAlba, setDanpatAlba] = useState(0);

  useEffect(() => {
    axios
      .get("/api/alba") // 추후에 API 엔드포인트 수정 가능
      .then((response) => {
        setTotalAlba(response.data.totalAlba);
        setDanpatAlba(response.data.danpatAlba);
      })
      .catch((error) => console.error("API 호출 오류:", error));
  }, []);

  return (
    <Main>
      <DanpatImage src={danpatImage} alt="danpatIMG" />
      <Section>
        <Title>원하는 알바생을 찾아보세요!</Title>
        <AlbaContainer>
          <AlbaCard>
            <CardTitle>전체 알바생</CardTitle>
            <CardCount>{totalAlba}</CardCount>
          </AlbaCard>
          <AlbaCard>
            <CardTitle>우리 단팥러</CardTitle>
            <CardCount secondary>{danpatAlba}</CardCount>
          </AlbaCard>
        </AlbaContainer>
      </Section>
    </Main>
  );
};

export default CurrentAlba;

const Main = styled.main`
  position: relative;
  padding: 20px;
  margin: 0 auto;
  background-color: var(--primary-color-dark);
  color: white;
  border-radius: 0 0 20px 20px;
`;

const DanpatImage = styled.img`
  width: 350px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 130px;
  z-index: 1;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Title = styled.h1`
  position: relative;
  top: 10px;
  left: 100px;
  padding: 5px;
`;

const AlbaContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  position: relative;
  left: 100px;
`;

const AlbaCard = styled.article`
  text-align: center;
  padding: 10px;
`;

const CardTitle = styled.h5`
  padding: 5px;
`;

const CardCount = styled.h2`
  font-size: 35px;
  padding: 5px;
  color: ${(props) => (props.secondary ? "var(--secondary-color)" : "white")};
`;
