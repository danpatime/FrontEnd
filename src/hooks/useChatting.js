import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import request from '../api/request.ts';

const useChatting = (roomId, userId) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  const readMsg = async (messageId) => {
    try {
      await request.post('/chat/read', { messageId });
    } catch (error) {
      console.error('메시지 읽음 처리 실패:', error);
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!roomId) return;
      try {
        const response = await request.get(`/chat/room/${roomId}/chats`);
        setChatHistory(response.reverse());
        console.log(response);
      } catch (error) {
        console.error('채팅 내역을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchChatHistory();
  }, [roomId, userId]);

  useEffect(() => {
    if (!roomId || !userId) return;

    const stompClient = new Client({
      brokerURL: process.env.REACT_APP_SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onConnect: () => {
        setIsConnected(true);
        stompClient.subscribe(`/room/${roomId}`, async (message) => {
          const messageData = JSON.parse(message.body);

          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            messageData,
          ]);
          //읽음처리
          if (messageData.senderId !== userId) {
            await readMsg(messageData.id);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error('STOMP 에러', frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [roomId, userId]);

  const sendMessage = (message) => {
    if (client) {
      const updatedMessage = {
        ...message,
        senderId: userId,
      };

      client.publish({
        destination: '/chat/send',
        body: JSON.stringify(updatedMessage),
      });
    }
  };

  return { chatHistory, isConnected, sendMessage };
};

export default useChatting;
