import MypageSubMenu from "../common/MypageSubMenu";
import Layout from "./Layout";

import styled from "styled-components";

const MypageLayout = ({ children }) => {

  const owner = 'owner';

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
    padding: 20px 230px 20px 20px; 
`;