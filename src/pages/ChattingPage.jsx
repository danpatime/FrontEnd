import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useChatting from '../hooks/useChatting';
import RoomList from '../components/chat/RoomList.jsx';
import ChatInput from '../components/chat/ChatInput.jsx';
import ChatBubble from '../components/chat/ChatBubble.jsx';
import request from '../api/request.ts';

const ChattingPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [currentChat, setCurrentChat] = useState('');
  const [isRoomListOpen, setIsRoomListOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const { chatHistory, isConnected, sendMessage } = useChatting(
    selectedRoomId,
    userId,
  );

  const chatContainerRef = useRef(null); // 스크롤

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await request.get(`/chat/summaries/${userId}`);
        setRooms(response.chatSummaries);
        console.log(response);
        if (response.chatSummaries.length > 0) {
          setSelectedRoomId(response.chatSummaries[0].roomId);
        }
      } catch (error) {
        console.error('채팅방 목록을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchRooms();
  }, [userId]);

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const handleSend = () => {
    if (currentChat.trim() === '' || !isConnected) return;

    const message = {
      roomId: selectedRoomId,
      senderId: userId,
      receiverId: 2,
      content: currentChat,
    };

    sendMessage(message);
    setCurrentChat('');
  };

  const toggleRoomList = () => {
    setIsRoomListOpen((prev) => !prev);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      //자동 스크롤
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <ChatLayout>
      <RoomList
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        onRoomClick={handleRoomClick}
        isRoomListOpen={isRoomListOpen}
        toggleRoomList={toggleRoomList}
      />
      {rooms.length === 0 ? (
        <NoRoomsMessage>방이 없습니다</NoRoomsMessage>
      ) : (
        <ChatArea>
          <ChatContainer ref={chatContainerRef}>
            {chatHistory?.map((msg) => (
              <ChatBubble key={msg.id} message={msg} userId={userId} />
            ))}
          </ChatContainer>
          <ChatInput
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            handleSend={handleSend}
          />
        </ChatArea>
      )}
    </ChatLayout>
  );
};

const ChatLayout = styled.div`
  display: flex;
  background-color: #f9f9f9;
  gap: 20px;
  padding: 20px 20px 20px 0px;
  height: 100vh-75.5px;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 16px;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

const NoRoomsMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #777;
`;
export default ChattingPage;
