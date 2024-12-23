import React, { useState } from "react";
import styled from "styled-components";
import ChatBubble from "../components/chat/ChatBubble";
import chatData from "../assets/data/chatDummy.json";

const ChattingPage = () => {
  const rooms = chatData.rooms;

  // 초기 상태
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);
  const [chatHistory, setChatHistory] = useState(rooms[0].chatHistory);
  const [currentChat, setCurrentChat] = useState("");
  const [isRoomListOpen, setIsRoomListOpen] = useState(true);

  const handleInputChange = (e) => {
    setCurrentChat(e.target.value);
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
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            isSelected={room.id === selectedRoom}
          >
            {room.name}
          </RoomItem>
        ))}
      </RoomList>
      <button onClick={toggleRoomList}>
        {isRoomListOpen ? "목록 닫기" : "목록 열기"}
      </button>
      <ChatArea>
        {chatHistory.map((msg) => (
          <ChatBubble
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            isSender={msg.isSender}
          />
        ))}
        <InputContainer>
          <input
            type="text"
            value={currentChat}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요"
            style={{ flex: 1, padding: "5px" }}
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
  width: 100vw;
  background-color: #f9f9f9;
`;

const RoomList = styled.nav`
  width: ${({ isRoomListOpen }) => (isRoomListOpen ? "30vw" : "0")};
  border-right: 1px solid #ccc;
`;

const RoomItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${(isSelected) => (isSelected ? "#ddd" : "transparent")};

  &:hover {
    background-color: #cacaca;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;

  input {
    width: 100%;
    height: 30px;
    padding: 10px;
  }
`;

const SubmitBtn = styled.button`
  width: 60px;
`;
export default ChattingPage;
