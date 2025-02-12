import React, { useState } from 'react';
import styled from 'styled-components';
import Inquiry from './InquiryPage';
import MyInquiries from './MyInquiryPage';
import QnA from './QnA';

const SupportPage = () => {
  const [currentPage, setCurrentPage] = useState('문의');

  return (
    <Container>
      <NavbarContainer>
        <NavItem active={currentPage === '문의'} onClick={() => setCurrentPage('문의')}>문의</NavItem>
        <NavItem active={currentPage === '나의 문의 내역'} onClick={() => setCurrentPage('나의 문의 내역')}>나의 문의 내역</NavItem>
        <NavItem active={currentPage === 'Q&A'} onClick={() => setCurrentPage('Q&A')}>Q&A</NavItem>
      </NavbarContainer>

      <Content>
        {currentPage === '문의' && <Inquiry />}
        {currentPage === '나의 문의 내역' && <MyInquiries />}
        {currentPage === 'Q&A' && <QnA />}
      </Content>
    </Container>
  );
};

export default SupportPage;

const Container = styled.div`
  height: 100vh;
`

const NavbarContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #DFDFDF;
  padding-left: 150px;
`;

const NavItem = styled.div`
  padding: 15px 20px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  ${(props) => props.active && `
    border-bottom: 2px solid #7B4B42;
    font-weight: bold;
    background-color: #f0f0f0;
  `}

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  height: 100vh;
  padding: 20px 150px;
  border-top: 1px solid #DFDFDF;
`;
