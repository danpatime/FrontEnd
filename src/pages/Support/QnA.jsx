import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "../../components/common/Accordion";

const QnA = () => {
  const [currentType, setCurrentType] = useState("개인"); // 개인/기업 선택 상태
  const [openIndex, setOpenIndex] = useState(null); // 열려 있는 아코디언의 인덱스

  // 더미 데이터
  const personalData = [
    { id: 1, title: "개인 문의 1", content: "이것은 개인 문의 1의 내용입니다." },
    { id: 2, title: "개인 문의 2", content: "이것은 개인 문의 2의 내용입니다." },
    { id: 3, title: "개인 문의 3", content: "이것은 개인 문의 3의 내용입니다." },
  ];

  const businessData = [
    { id: 1, title: "기업 문의 1", content: "이것은 기업 문의 1의 내용입니다." },
    { id: 2, title: "기업 문의 2", content: "이것은 기업 문의 2의 내용입니다." },
    { id: 3, title: "기업 문의 3", content: "이것은 기업 문의 3의 내용입니다." },
  ];

  const currentData = currentType === "개인" ? personalData : businessData;

  // 데이터 전환 시 아코디언 상태 초기화
  const handleTypeChange = (type) => {
    setCurrentType(type);
    setOpenIndex(null); // 열려 있는 아코디언 닫기
  };

  return (
    <Container>
      <Header>
        <Title>자주 묻는 질문</Title>
        <UserType>
          <button
            onClick={() => handleTypeChange("개인")}
            disabled={currentType === "개인"}
            id="personalButton"
          >
            개인
          </button>
          <button
            onClick={() => handleTypeChange("기업")}
            disabled={currentType === "기업"}
            id="businessButton"
          >
            기업
          </button>
        </UserType>
      </Header>
      <Description>
        찾으시는 Q&A가 없거나 준비된 답변이 만족스럽지 않으시다면, 문의 작성으로 더욱 자세히 도와드리겠습니다.
      </Description>

      <QnAList>
        {currentData.map((item, index) => (
          <Accordion
            key={item.id}
            title={item.title}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.content}
          </Accordion>
        ))}
      </QnAList>
    </Container>
  );
};

export default QnA;


const Container = styled.div`
  padding-top: 40px;

  h3 {
    font-size: 16px;
    padding-left: 4px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h2`
  font-size: 24px;
`

const UserType = styled.div`
  width: fit-content;

  button {
    padding: 10px 20px;
    background-color: #EFEFEF;
    cursor: pointer;
    font-size: 14px;

    &:disabled {
      background-color: #6E3C3B;
      color: #ffffff;
    }
  }

  #personalButton {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  #businessButton {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Description = styled.div`
  color: #898989;
  margin-bottom: 30px;
  padding-left: 4px;
  padding-top: 5px;
`

const QnAList = styled.div`
  margin-top: 20px;
`;

