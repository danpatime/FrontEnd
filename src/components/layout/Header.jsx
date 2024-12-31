import React, { useState } from "react";
import styled from "styled-components";
import logoImg from "../../assets/images/logo.svg";
import defaultProfile from "../../assets/images/default-profile.jpg";
import arrowIcon from "../../assets/icons/keyboard_arrow_down.svg";
import notiIcon from "../../assets/icons/notifications.svg";
import { NavLink } from "react-router-dom";
import DropDown from "../DropDown";
import AlarmDropdown from "../AlarmDropDown";
import { Link } from "react-router-dom";
import LoginModal from "../../pages/LoginModal";

function Header() {
  const [isAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      if (!prev) setIsAlarmOpen(false);
      return !prev;
    });
  };

  const toggleAlarm = () => {
    setIsAlarmOpen((prev) => {
      if (!prev) setIsDropdownOpen(false);
      return !prev;
    });
  };

  const name = "홍길동";
  const profileUrl = null;

  return (
    <Container>
      <Logo to="/">
        <img src={logoImg} alt="logo icon" />
      </Logo>
      <NavMenu>
        <NavItem to="/alba/search">알바찾기</NavItem>
        <NavItem to="/alba/review">알바후기</NavItem>
        <NavItem to="/support">고객지원</NavItem>
        <NavItem to="/mypage">마이페이지</NavItem>
      </NavMenu>
      {isAuthenticated ? (
        <ProfileSection>
          <NotiBtn onClick={toggleAlarm} src={notiIcon} alt="notification" />
          {isAlarmOpen && <AlarmDropdown />}
          <ProfileImg src={profileUrl || defaultProfile} alt={name} />
          <span>{name}님</span>
          <IconBtn
            src={arrowIcon}
            alt="arrow down"
            onClick={toggleDropdown}
            isOpen={isDropdownOpen}
          />
          {isDropdownOpen && <DropDown />}
        </ProfileSection>
      ) : (
        <ProfileSection>
          <ProfileNavItem onClick={handleOpenLoginModal}>로그인</ProfileNavItem>
          <span>|</span>
          <ProfileNavItem to="/signup">회원가입</ProfileNavItem>
        </ProfileSection>
      )}
      {isModalOpen && <LoginModal onClose={handleCloseLoginModal} />}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 50px;
  border-bottom: 1px solid var(--gray_light);
  position: fixed; /* 화면 상단 고정 */
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
`;
const Logo = styled(Link)`
  text-decoration: none;
  img {
    width: 80px; 
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 15px;
  margin-left: 20px;
`;

const NavItem = styled(NavLink)`
  color: var(--black);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: var(--primary-color-dark);
  }
  &.active {
    color: var(--primary-color-dark);
  }
`;

const ProfileSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative; /* Dropdown 위치 설정을 위해 필요 */
  span {
    color: var(--black);
    font-weight: 400;
    font-size: 16px;
  }
`;

const ProfileNavItem = styled(NavItem)`
  font-weight: 400;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 8px;
`;

const IconBtn = styled.img`
  cursor: pointer;
  transition: transform 0.5s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const NotiBtn = styled(IconBtn)`
  width: 30px;
`;
