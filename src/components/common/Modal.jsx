import React from 'react';
import styled from 'styled-components';
import { HiXMark } from "react-icons/hi2";



function Modal({ onClose, children, title, width }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()} width={width}>
        <TopSection>
          <div></div>
          <Title>{title}</Title> {/* title을 동적으로 렌더링 */}
          <CloseIcon size={24} onClick={onClose} />
        </TopSection>

        {children}
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;



const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: ${(props) => props.width || '470px'}; /* 기본 너비 470px, props로 전달받은 width 적용 */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 16px;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 20px;
  font-size: 20px;
`;

const CloseIcon = styled(HiXMark)`
  margin-left: auto;
  cursor: pointer;
`;
