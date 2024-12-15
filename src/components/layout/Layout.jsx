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
  margin-top: 75.5px; //헤더 높이
`
export default Layout;