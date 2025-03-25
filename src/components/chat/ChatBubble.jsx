import React from 'react';
import styled from 'styled-components';

const ChatBubble = ({ message, userId }) => {
  const isMine = message.senderId == userId;

  return (
    <BubbleContainer isMine={isMine}>
      {!isMine && <SenderName>{message.senderId}</SenderName>}
      <Message isMine={isMine}>{message.content}</Message>
    </BubbleContainer>
  );
};

export default ChatBubble;

const BubbleContainer = styled.div`
  max-width: 60%;
  margin: 2px;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
`;

const SenderName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #555555;
  margin-bottom: 5px;
`;

const Message = styled.div`
  background-color: ${(props) =>
    props.isMine ? 'var(--primary-color-dark)' : 'var(--gray_light)'};
  color: ${(props) => (props.isMine ? 'white' : 'black')};
  padding: 10px;
  border-radius: 10px;
  margin: 0 8px;
`;
