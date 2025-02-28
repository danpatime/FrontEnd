import React from 'react';
import { useState, useEffect } from 'react';
import request from '../../api/request.ts';
import styled from 'styled-components';
import AccordionTable from '../../components/common/AccordionTable';


const MyInquiries = () => {
  const [inquiriesData, setInquiriesData] = useState([]);

  const testInquiriesData = [
    {
      inquiryId: 1,
      inquiryType: "일반",
      subInquiryType: "서비스 문제",
      title: "서비스 관련 문제",
      content: "서비스 기능에 문제가 발생했습니다.",
      inquiryStatus: "대기 중",
      answerDate: null,
      createdBy: 123,
    },
    {
      inquiryId: 2,
      inquiryType: "기술",
      subInquiryType: "버그 신고",
      title: "애플리케이션 버그 신고",
      content: "애플리케이션에서 치명적인 버그를 발견했습니다.",
      inquiryStatus: "답변 완료",
      answerDate: "2025-01-20T10:00:00",
      createdBy: 123,
    },
  ];

  useEffect(() => {
    const fetchInquiriesData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
          const accountId = user.id;
          const response = await request.get(`/api/v1/support/my-inquiries?accountId=${accountId}`);
          
          setInquiriesData(response.data);
        }
      } catch (error) {
        console.error('문의 내역 조회에 실패했습니다.', error);
      }
    };

    fetchInquiriesData();
  }, []);

  const inquiriesCount = Array.isArray(inquiriesData) ? inquiriesData.length : 0;

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
        <h3>총 {inquiriesCount}건</h3>
        {inquiriesCount === 1 ? (
          <p>조회된 문의 내역이 없습니다.</p>
        ) : (
          <AccordionTable data={testInquiriesData} />
        )}
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