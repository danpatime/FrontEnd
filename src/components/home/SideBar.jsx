import React from 'react';
import styled from 'styled-components';
import defaultProfile from '../../assets/images/default-profile.jpg';

const SideBar = ({ name, profileImage }) => {
  const buttons = ['채팅방', '체결현황', '내 이력서'];

  return (
    <SidebarContainer>
      <ProfileSection>
        <ProfileImg src={profileImage || defaultProfile} alt={`프로필`} />
        <UserName>{name} 님</UserName>
      </ProfileSection>

      <ButtonGrid>
        {buttons.map((button, index) => (
          <SidebarButton key={index}>{button}</SidebarButton>
        ))}
      </ButtonGrid>
    </SidebarContainer>
  );
};
const SidebarContainer = styled.div`
  width: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  margin-top: 20px;
`;

const SidebarButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:active {
    background-color: var(--primary-color-dark);
  }
`;

export default SideBar;
