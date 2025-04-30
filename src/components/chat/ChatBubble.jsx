import React from 'react';
import styled from 'styled-components';

const ChatBubble = ({ message, userId }) => {
  const isMine = message.senderId == userId;

  return (
    <BubbleWrapper isMine={isMine}>
      {isMine && !message.isRead && <ReadIcon>안 읽음</ReadIcon>}
      <BubbleContainer isMine={isMine}>
        {!isMine && <SenderName>{message.senderId}</SenderName>}
        <Message isMine={isMine}>{message.content}</Message>
      </BubbleContainer>
    </BubbleWrapper>
  );
};

export default ChatBubble;
const BubbleWrapper = styled.div`
  max-width: 60%;
  display: flex;
  align-items: end;
  align-self: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  margin: 2px;
`;
const BubbleContainer = styled.div`
  font-size: 14px;
  line-height: 1.5;
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

const ReadIcon = styled.p`
  font-size: 0.7rem;
  color: #9f9f9f;
`;
