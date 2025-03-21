import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatBubble from '../components/chat/ChatBubble';
import { FaChevronLeft } from 'react-icons/fa';
import { ReactComponent as NewBadge } from '../assets/icons/new_badge.svg';
import request from '../api/request.ts';
import { Client } from '@stomp/stompjs';

const ChattingPage = () => {
  const [roomData, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(roomData[0]?.roomId);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState('');
  const [isRoomListOpen, setIsRoomListOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const summaryResponse = await request.get(`/chat/summaries/${userId}`);
        console.log('채팅방 목록:', summaryResponse);

        setRooms(summaryResponse.chatSummaries);

        if (summaryResponse.chatSummaries.length > 0) {
          const firstRoomId = summaryResponse.chatSummaries[0].roomId;
          setSelectedRoom(firstRoomId);
        }
      } catch (error) {
        console.error('채팅방 목록을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchReviews();
  }, [userId]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!selectedRoom) return;

      try {
        const chatsResponse = await request.get(
          `/chat/room/${selectedRoom}/chats`,
        );
        console.log(`채팅 내역 (${selectedRoom}번 방):`, chatsResponse);
        setChatHistory(chatsResponse);
      } catch (error) {
        console.error('채팅 내역을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchChatHistory();
  }, [selectedRoom]);

  useEffect(() => {
    // 웹소켓 클라이언트 초기화
    const stompClient = new Client({
      brokerURL: process.env.REACT_APP_SOCKET_URL,
      connectHeaders: {
        // STOMP 연결 헤더 설정
        Authorization: `Bearer ${localStorage.getItem('token')}`, // 필요한 경우 토큰을 설정
      },
      debug: (str) => {
        console.log(str); // 디버그 메시지 출력
      },
      onConnect: () => {
        console.log('STOMP 서버에 연결됨');
        setIsConnected(true);

        // 메시지 수신을 위한 구독
        stompClient.subscribe(`/room/${selectedRoom}`, (message) => {
          const messageData = JSON.parse(message.body);
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            messageData,
          ]);
        });
      },
      onDisconnect: () => {
        console.log('STOMP 서버 연결 끊김');
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error('STOMP 에러', frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    // 컴포넌트 언마운트 시 클라이언트 비활성화
    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleInputChange = (e) => {
    setCurrentChat(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // 메시지 전송 함수
  const handleSend = () => {
    if (currentChat.trim() === '' || !isConnected) return;

    const message = {
      roomId: selectedRoom,
      senderId: userId,
      receiverId: 2, // 수신자 ID
      content: currentChat,
    };

    if (client) {
      client.publish({
        destination: '/chat/send', // 메시지 전송
        body: JSON.stringify(message), // 메시지 내용
      });
    }

    setCurrentChat('');
  };

  const handleRoomClick = (roomId) => {
    const selectedRoomData = roomData?.find((room) => room.roomId === roomId);
    setSelectedRoom(roomId);
    setChatHistory(selectedRoomData.chatHistory);
  };

  const toggleRoomList = () => {
    setIsRoomListOpen((prev) => !prev);
  };

  return (
    <ChatLayout>
      <RoomList isRoomListOpen={isRoomListOpen}>
        <RoomListContainer isRoomListOpen={isRoomListOpen}>
          <h3>채팅방 목록</h3>
          {isRoomListOpen &&
            roomData?.map((room) => (
              <RoomItem
                key={room.roomId}
                onClick={() => handleRoomClick(room.roomId)}
                isSelected={room.roomId === selectedRoom}
              >
                <TitleWrapper>
                  <p>{room.name}</p>
                  {room.isNew && <NewBadge>New</NewBadge>}
                </TitleWrapper>
                <span>
                  {room.lastMessageContent || '최근 채팅 내용을 표시합니다.'}
                </span>
              </RoomItem>
            ))}
        </RoomListContainer>
        <ArrowIcon onClick={toggleRoomList} isRoomListOpen={isRoomListOpen} />
      </RoomList>
      <ChatArea>
        <ChatContainer>
          {chatHistory?.map((msg) => (
            <ChatBubble
              key={msg.id}
              sender={msg.senderId}
              message={msg.content}
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

const ChatLayout = styled.div`
  display: flex;
  background-color: #f9f9f9;
  gap: 20px;
  padding: 20px 20px 20px 0px;
  height: 100%;
`;

const RoomList = styled.div`
  display: flex;
  width: ${({ isRoomListOpen }) => (isRoomListOpen ? '25vw' : '40px')};
  overflow: hidden;
  transition: width 0.5s ease;
  border: 1px solid #ccc;
  border-radius: 0 20px 20px 0;
  padding: 20px 10px;
  background-color: white;
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
