import React from "react";
import styled from "styled-components";
import ChatBubble from "../components/chat/ChatBubble";
const messages = [
  { id: 1, sender: "Alice", message: "안녕하세요!", isSender: false },
  { id: 2, sender: "Me", message: "안녕하세요, 반갑습니다!", isSender: true },
  { id: 3, sender: "Alice", message: "리액트 좋죠?", isSender: false },
];
const rooms = [
  { id: 1, name: "오아영" },
  { id: 2, name: "김태영" },
  { id: 3, name: "김아영" },
];

const ChattingPage = () => {
  return (
    <ChatLayout>
      <RoomList>
        <ui>
          {rooms.map((room) => (
            <RoomItem key={room.id}>{room.name}</RoomItem>
          ))}
        </ui>
      </RoomList>
      <ChatArea>
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            isSender={msg.isSender}
          />
        ))}
        <InputContainer>
          <Input />
          <SubmitBtn>전송</SubmitBtn>
        </InputContainer>
      </ChatArea>
    </ChatLayout>
  );
};

const ChatLayout = styled.div`
  display: flex;
  width: 100vw;
  background-color: #f9f9f9;
`;

const RoomList = styled.nav`
  width: 30vw;
`;

const RoomItem = styled.li`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #cacaca;
  }
`;

const ChatArea = styled.div`
  width: 100%;
`;
const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
`;
const SubmitBtn = styled.button`
width: 60px`;
export default ChattingPage;
