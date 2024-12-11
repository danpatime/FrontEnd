import React from "react";
import styled from "styled-components";



const ChatBubble = ({ message, sender, isSender }) => {
  return (
    <BubbleContainer isSender={isSender}>
      {!isSender && <SenderName>{sender}</SenderName>}
      <Message>{message}</Message>
    </BubbleContainer>
  );
};

export default ChatBubble;


const BubbleContainer = styled.div`
  max-width: 60%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isSender ? "var(--gray_light)" : "#ffffff"};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SenderName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #555555;
  margin-bottom: 5px;
`;

const Message = styled.div`
  color: #333333;
`;