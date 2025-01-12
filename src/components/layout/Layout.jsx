import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

const Main = styled.main`
  padding-top: 75.5px; //헤더 높이
  background-color: var(--gray_bg);
  height: 100vh;
`
export default Layout;