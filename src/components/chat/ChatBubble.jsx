import React from "react";
import styled from "styled-components";

const ChatBubble = ({ message, sender, isSender }) => {
  return (
    <BubbleContainer isSender={isSender}>
      {!isSender && <SenderName>{sender}</SenderName>}
      <Message isSender={isSender}>{message}</Message>
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
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const SenderName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #555555;
  margin-bottom: 5px;
`;

const Message = styled.div`
  color: #333333;
  background-color: ${(props) =>
    props.isSender ? "var(--primary-color-dark)" : "var(--gray_light)"};
  color: ${(props) =>
    props.isSender ? "white" : "black"};
  padding: 10px;
  border-radius: 10px;
  margin: 0 8px;
`;
