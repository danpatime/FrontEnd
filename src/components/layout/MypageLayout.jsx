import MypageSubMenu from "../common/MypageSubMenu";
import { useState, useEffect } from 'react';
import Layout from "./Layout";

import styled from "styled-components";

const MypageLayout = ({ children }) => {

  const [owner, setOwner] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user'); // 로컬스토리지에서 user 데이터를 가져옴
    if (userData) {
      const parsedUser = JSON.parse(userData); // JSON 문자열을 객체로 변환
      const role = parsedUser.role;

      if (role === 'ROLE_EMPLOYEE') {
        setOwner('worker');
      } else if (role === 'ROLE_EMPLOYER') {
        setOwner('owner');
      }
    }
  }, []);

  return (
    <Layout>
      <Container>
        <MypageSubMenu userType={owner} />
        <Main>{children}</Main>
      </Container>
    </Layout>
  );
};

export default MypageLayout;

const Container = styled.div`
    display: flex;
`;

const Main = styled.main`
    flex-grow: 1; 
    margin: 0;
    padding: 20px 230px 50px 20px; 
`;