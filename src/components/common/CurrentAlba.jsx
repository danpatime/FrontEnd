import React, { useEffect, useState } from 'react';
import axios from 'axios';
import danpatImage from "../../assets/images/danpatImage.png"
import styled from 'styled-components';

const CurrentAlba = ({ totalAlba, danpatAlba }) => {
  return (
    <Container>
      <DanpatImage src={danpatImage} alt="danpatIMG" />
          <CurrentAlbaSection>
              <Text>
                  원하는 알바생을 찾아보세요!
              </Text>
        <AlbaContainer>
          <AlbaArticle>
            <Title>전체 알바생</Title>
            <Number>{totalAlba}</Number>
          </AlbaArticle>
          <AlbaArticle>
            <Title>우리 단팥러</Title>
            <Number color="var(--secondary-color)">{danpatAlba}</Number>
          </AlbaArticle>
        </AlbaContainer>
      </CurrentAlbaSection>
    </Container>
  );
};

const CurrentAlbaHandler = () => {
  const [totalAlba, setTotalAlba] = useState(0);
  const [danpatAlba, setDanpatAlba] = useState(0);

  useEffect(() => {
    axios.get('/api/alba') // 추후에 api 변경
      .then(response => {
        setTotalAlba(response.data.totalAlba);
        setDanpatAlba(response.data.danpatAlba);
      })
      .catch(error => console.error('API 호출 오류:', error));
  }, []);

  return (
    <CurrentAlba totalAlba={totalAlba} danpatAlba={danpatAlba} />
  );
};

export default CurrentAlbaHandler;

const Container = styled.main`
  border-radius: 0 0 20px 20px;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
    background-color: var(--primary-color-dark);
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    height: 250px;
`;

const DanpatImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  position: relative;
  left: 70%;
`;

const CurrentAlbaSection = styled.section`
  text-align: center;
  position: absolute;
  margin-top: 40px;
  left: 10%;

`;

const Text = styled.h1`
    
`;

const AlbaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const AlbaArticle = styled.article`
  margin: 0 20px;
  text-align: center;
  position: relative;
  right: 35px;
`;

const Title = styled.h5`
  font-size: 18px;
  font-weight: 300;
  color: white;
`;

const Number = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: ${({ color }) => color || "white"};
`;
