import React from 'react';
import styled from 'styled-components';

const SideBar = ({
  name = '사용자',
  profileImage = 'https://via.placeholder.com/100',
}) => {
  return (
    <SidebarContainer>
      {/* 프로필 영역 */}
      <ProfileSection>
        <ProfileImg src={profileImage} alt={`${name}님의 프로필`} />
        <UserName>{name}</UserName>
      </ProfileSection>

      {/* 버튼 영역 */}
      <ButtonGrid>
        <SidebarButton>버튼 1</SidebarButton>
        <SidebarButton>버튼 2</SidebarButton>
        <SidebarButton>버튼 3</SidebarButton>
        <SidebarButton>버튼 4</SidebarButton>
        <SidebarButton>버튼 5</SidebarButton>
        <SidebarButton>버튼 6</SidebarButton>
      </ButtonGrid>
    </SidebarContainer>
  );
};

// 스타일 정의
const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const SidebarButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default SideBar;
