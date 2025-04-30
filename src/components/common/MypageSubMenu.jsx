import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HiClipboardDocumentList  } from "react-icons/hi2";
import { PiIdentificationBadgeFill, PiPencilLineBold } from "react-icons/pi";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { RiSettings4Fill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsBookmarkFill } from "react-icons/bs";

const MypageSubMenu = ({ userType }) => {
  const location = useLocation(); // 현재 경로 가져오기
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  

  // 알바생과 사장님의 공통 메뉴 항목
  const commonMenu = [
    { name: '체결 현황', path: '/mypage/contracts', icon: <HiClipboardDocumentList /> },
    { name: '리뷰 관리', path: '/manage-reviews', icon: <PiPencilLineBold /> },
    { name: '채팅방', path: '/chat', icon: <TbMessageChatbotFilled /> },
    { name: '설정', path: '/mypage/settings', icon: <RiSettings4Fill /> }
  ];

  // 알바생 메뉴 항목(사장님은 없는 메뉴)
  const workerMenu = [
    { name: '나의 이력서', path: '/mypage/resume', icon: <PiIdentificationBadgeFill /> },
    ...commonMenu
  ];

  const ownerMenu = [
    { name: '관심 알바', path: '/mypage/saved-workers', icon: <BsBookmarkFill /> },
    { name: '나의 매장', path: '/mypage/mystore', icon: <SiHomeassistantcommunitystore /> },
    ...commonMenu
  ];

  const menuItems = useMemo(() => {
    if (!userType) return [];
    return userType === "worker" ? workerMenu : ownerMenu;
  }, [userType]);
  
  useEffect(() => {
    if (!userType || menuItems.length === 0) return;
  
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.path === currentPath);
  
    if (activeItem && activeMenu !== activeItem.name) {
      setActiveMenu(activeItem.name);
    } else if (!activeItem && activeMenu !== menuItems[0].name) {
      setActiveMenu(menuItems[0].name);
      navigate(menuItems[0].path, { replace: true });
    }
  }, [location.pathname, userType, menuItems, activeMenu, navigate]);


  // 메뉴 항목 클릭 시 activeMenu 상태 업데이트
  const handleMenuClick = (name) => {
    setActiveMenu(name);
  };

  return (
    <SubMenuContainer>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem key={item.name} onClick={() => handleMenuClick(item.name)}>
            <StyledLink to={item.path} active={activeMenu === item.name}>
              <Icon active={activeMenu === item.name}>{item.icon}</Icon>
              {item.name}
            </StyledLink>
          </MenuItem>
        ))}
      </MenuList>
    </SubMenuContainer>
  );
};

export default MypageSubMenu;


const SubMenuContainer = styled.div`
  width: 250px;
  padding: 0 20px;
  min-width: 160px;
`;

const MenuList = styled.ul`
  list-style: none;

  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  width: auto;
  height: 50px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border-radius: 15px;

  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;

  display: flex;
  align-items: center;

  color: ${(props) => (props.active ? "#6E3C3B" : "#AFAFAF")};
`;

const Icon = styled.span`
  font-size: 1.2rem;
  color: ${(props) => (props.active ? "#6E3C3B" : "#AFAFAF")};
  
  margin-top: 5px;
  margin-right: 15px;
`;