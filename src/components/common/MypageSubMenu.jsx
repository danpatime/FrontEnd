import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HiClipboardDocumentList  } from "react-icons/hi2";
import { PiIdentificationBadgeFill, PiPencilLineBold } from "react-icons/pi";
import { TbMessageChatbotFilled } from "react-icons/tb";
// import { BiSolidChat } from "react-icons/bi";
import { RiSettings4Fill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsBookmarkFill } from "react-icons/bs";

const MypageSubMenu = ({ userType }) => {
  const [ activeMenu, setActiveMenu ] = useState(null); // 클릭된 항목 관리

  // 알바생과 사장님의 공통 메뉴 항목
  const commonMenu = [
    { name: '체결 현황', path: '/MyPage/ContractStatus', icon: <HiClipboardDocumentList /> },
    { name: '리뷰 관리', path: '/MyPage/ReviewManagement', icon: <PiPencilLineBold /> },
    { name: '채팅방', path: '/MyPage/Chat', icon: <TbMessageChatbotFilled /> },
    { name: '설정', path: '/MyPage/Settings', icon: <RiSettings4Fill /> }
  ];

  // 알바생 메뉴 항목(사장님은 없는 메뉴)
  const workerMenu = [
    { name: '나의 이력서', path: '/MyPage/MyResume', icon: <PiIdentificationBadgeFill /> },
    ...commonMenu
  ];

  const ownerMenu = [
    { name: '관심 알바', path: '/MyPage/SavedWorkers', icon: <BsBookmarkFill /> },
    { name: '나의 매장', path: '/MyPage/MyStore', icon: <SiHomeassistantcommunitystore /> },
    ...commonMenu
  ];

  // 사용자 타입에 맞는 메뉴 선택
  const menuItems = userType === 'worker' ? workerMenu : ownerMenu;

  // 메뉴 항목 클릭 시 activeMenu 상태 업데이트
  const handleMenuClick = (name) => {
    setActiveMenu(name);
  };

  return (
    <SubMenuContainer>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem 
            key={item.name}
            onClick={() => handleMenuClick(item.name)} 
          >
            <StyledLink to={item.path} active={activeMenu === item.name}>
              <Icon>{item.icon}</Icon>
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
  padding: 20px;
  
  margin-top: 20vh;
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

  display: flex;
  align-items: center;

  background-color: ${(props) => props.active ? "rgba(123, 75, 66, 0.2)" : "transparent"}; 
  font-weight: ${(props) => (props.active ? "bold" : "500")};
  color: ${(props) => (props.active ? "#000000" : "#767676")};

  // 호버 기능은 없애도 될 듯
  &:hover {
    background-color: rgba(123, 75, 66, 0.1);
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;

  margin-top: 5px;
  margin-right: 10px;
`;