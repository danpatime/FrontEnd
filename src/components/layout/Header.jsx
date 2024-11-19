import React, { useState } from "react";
import styled from "styled-components";
import logoImg from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const name = "홍길동";

  return (
    <Container>
      <img src={logoImg} alt="logo icon" />
      <NavMenu>
        <StyledLink to="/find-job">알바찾기</StyledLink>
        <StyledLink to="/job-review">알바후기</StyledLink>
        <StyledLink to="/support">고객지원</StyledLink>
        <StyledLink to="/mypage">마이페이지</StyledLink>
      </NavMenu>
      {isAuthenticated ? (
        <ProfileSection>
          <ProfileImg />
          <span>{name}님</span>
        </ProfileSection>
      ) : (
        <ProfileSection>
          <StyledLink to="/login">로그인</StyledLink>
          <span>|</span>
          <StyledLink to="/signup">회원가입</StyledLink>
        </ProfileSection>
      )}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 50px;
  border-bottom: 1px solid var(--gray_light, #c8c8c8);
  img {
    width: 80px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 15px;
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:hover {
    color: var(--primary-color-dark);
  }
`;

const ProfileSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border-radius: 50%;
`;
