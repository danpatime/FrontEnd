import React, { useState } from "react";
import styled from "styled-components";
import ChatBubble from "../components/chat/ChatBubble";
import chatData from "../assets/data/chatDummy.json";
import { FaChevronLeft } from "react-icons/fa";
import { ReactComponent as NewBadge } from "../assets/icons/new_badge.svg";

const ChattingPage = () => {
  const rooms = chatData.rooms;

  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);
  const [chatHistory, setChatHistory] = useState(rooms[0].chatHistory);
  const [currentChat, setCurrentChat] = useState("");
  const [isRoomListOpen, setIsRoomListOpen] = useState(true);

  const handleInputChange = (e) => {
    setCurrentChat(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (currentChat.trim() === "") return;

    const newMessage = {
      id: chatHistory.length + 1,
      sender: "Me",
      message: currentChat,
      isSender: true,
    };

    setChatHistory([...chatHistory, newMessage]);
    setCurrentChat("");
  };

  const handleRoomClick = (roomId) => {
    const selectedRoomData = rooms.find((room) => room.id === roomId);
    setSelectedRoom(roomId);
    setChatHistory(selectedRoomData.chatHistory);
  };

  const toggleRoomList = () => {
    setIsRoomListOpen((prev) => !prev);
  };

  return (
    <ChatLayout>
      <RoomList isRoomListOpen={isRoomListOpen}>
        <RoomListContainer>
          <h3>채팅방 목록</h3>
          {isRoomListOpen &&
            rooms.map((room) => (
              <RoomItem
                key={room.id}
                onClick={() => handleRoomClick(room.id)}
                isSelected={room.id === selectedRoom}
              >
                <TitleWrapper>
                  <p>{room.name}</p>
                  {room.isNew && <NewBadge>New</NewBadge>}
                </TitleWrapper>
                <span>{"최근 채팅 내용을 표시합니다."}</span>
              </RoomItem>
            ))}
        </RoomListContainer>
        <ArrowIcon onClick={toggleRoomList} isRoomListOpen={isRoomListOpen} />
      </RoomList>
      <ChatArea>
        <ChatContainer>
          {chatHistory.map((msg) => (
            <ChatBubble
              key={msg.id}
              sender={msg.sender}
              message={msg.message}
              isSender={msg.isSender}
            />
          ))}
        </ChatContainer>
        <InputContainer>
          <input
            type="text"
            value={currentChat}
            placeholder="메시지를 입력하세요"
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
          <SubmitBtn onClick={handleSend}>전송</SubmitBtn>
        </InputContainer>
      </ChatArea>
    </ChatLayout>
  );
};

// 스타일 컴포넌트
const ChatLayout = styled.div`
  display: flex;
  background-color: #f9f9f9;
  gap: 20px;
  padding: 20px 20px 20px 0px;
  height: 100%;
`;

const RoomList = styled.div`
  display: flex;
  width: ${({ isRoomListOpen }) => (isRoomListOpen ? "25vw" : "40px")};
  overflow: hidden;
  transition: width 0.5s ease;
  border: 1px solid #ccc;
  border-radius: 0 20px 20px 0;
  padding: 20px 10px;
  background-color: white;
`;
const ArrowIcon = styled(FaChevronLeft)`
  transform: ${({ isRoomListOpen }) =>
    isRoomListOpen ? "rotate(0deg)" : "rotate(180deg)"};
  transition: transform 0.5s ease;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 5px;
`;

const RoomListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h3{
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
    isSelected ? "var(--primary-color-20)" : "transparent"};
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
    margin-bottom:4px;
  }
  svg {
    size: 10px;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: white;
  padding: 16px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  margin-top: auto;
  input {
    width: 100%;
    height: 30px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #3a3a3a;
  }
`;

const SubmitBtn = styled.button`
  width: 70px;
  padding: 7px 10px;
  border-radius: 10px;
`;

export default ChattingPage;
