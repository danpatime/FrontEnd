import React from 'react';
import styled from 'styled-components';
import AccordionTable from '../../components/common/AccordionTable';

// 테스트 데이터
const testData = [
  {
    date: '2024.10.15',
    type: '회원가입',
    title: '계정을 여러 개 생성하고 싶은데 가능한가요?',
    status: '처리중',
    answerDate: '-',
    response: null, // 답변 없음
  },
  {
    date: '2024.10.15',
    type: '리뷰',
    title: '저에게 작성된 리뷰 중 삭제하고 싶은 게 있어요',
    status: '답변완료',
    answerDate: '2024.10.18',
    response: '문의해주신 리뷰 삭제 요청은 처리 완료되었습니다. 추가 문의 사항이 있으시면 말씀해주세요.',
  },
];


const MyInquiries = () => {
  return (
    <Container>
      <Title>나의 문의 내역</Title>
      <Description>
        <ul>
          <li>처리상태가 처리중인 경우 상담원이 고객님의 문의 접수 후 처리중인 상태입니다.</li>
          <li>답변이 완료되면 고객님의 이메일로 알림이 전송됩니다.</li>
        </ul>
      </Description>

      <div id="inquiry-list">
        <h3>총 {testData.length}건</h3>
        <AccordionTable data={testData} />
      </div>
    </Container>
  );
};

export default MyInquiries;

const Container = styled.div`
  padding-top: 40px;
  h3 {
    font-size: 16px;
    padding-left: 4px;
  }
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const Description = styled.div`
  padding-left: 18px;
  color: #898989;
  margin-bottom: 30px;
`