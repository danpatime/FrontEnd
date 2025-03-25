import React from 'react';
import styled from 'styled-components';

const ChatInput = ({ currentChat, setCurrentChat, handleSend }) => {
  const handleInputChange = (e) => {
    setCurrentChat(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
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
  );
};

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
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #737373;
  }

  &:active {
    transform: scale(0.98);
    background-color: #1f1f1f;
  }
`;

export default ChatInput;
