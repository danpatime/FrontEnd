import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { ReactComponent as NewBadge } from '../../assets/icons/new_badge.svg';
import styled from 'styled-components';

const RoomList = ({
  rooms,
  selectedRoom,
  onRoomClick,
  isRoomListOpen,
  toggleRoomList,
}) => {
  return (
    <ListContainer isRoomListOpen={isRoomListOpen}>
      <RoomListContainer isRoomListOpen={isRoomListOpen}>
        <h3>채팅방 목록</h3>
        {isRoomListOpen &&
          rooms.map((room) => (
            <RoomItem
              key={room.roomId}
              onClick={() => onRoomClick(room.roomId)}
              isSelected={room.roomId === selectedRoom}
            >
              <TitleWrapper>
                <p>{room.name}</p>
                {room.isNew && <NewBadge>New</NewBadge>}
              </TitleWrapper>
              <span>
                {room.lastMessageContent || '최근 채팅 내용이 없습니다.'}
              </span>
            </RoomItem>
          ))}
      </RoomListContainer>
      <ArrowIcon onClick={toggleRoomList} isRoomListOpen={isRoomListOpen} />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  width: ${({ isRoomListOpen }) => (isRoomListOpen ? '25vw' : '40px')};
  overflow: hidden;
  transition: width 0.5s ease;
  border: 1px solid #ccc;
  border-radius: 0 20px 20px 0;
  padding: 20px 10px;
  background-color: white;
  height: 100%;
`;

const ArrowIcon = styled(FaChevronLeft)`
  transform: ${({ isRoomListOpen }) =>
    isRoomListOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
  transition: transform 0.5s ease;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 5px;
`;

const RoomListContainer = styled.div`
  width: 100%;
  display: ${({ isRoomListOpen }) => (isRoomListOpen ? 'block' : 'none')};
  transition: 0.5s ease-out;
  h3 {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    margin-bottom: 14px;
    padding-left: 12px;
  }
`;

const RoomItem = styled.div`
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--primary-color-20)' : 'transparent'};
  &:hover {
    background-color: #f0f0f0;
  }
  span {
    font-weight: 100;
    color: var(--gray_dark);
    font-size: 12px;
    display: block;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  p {
    font-weight: 700;
    font-size: 14px;
    display: inline;
    margin-bottom: 4px;
  }
  svg {
    size: 10px;
  }
`;

export default RoomList;
