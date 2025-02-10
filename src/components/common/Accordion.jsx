import React from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const Accordion = ({ title, children, isOpen, onToggle }) => {
  return (
    <AccordionContainer>
      <AccordionHeader onClick={onToggle} isOpen={isOpen}>
        <div><span>Q.</span><p>{title}</p></div>
        <Arrow isOpen={isOpen}><IoIosArrowDown /></Arrow>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
};

export default Accordion;

const AccordionContainer = styled.div`
  border-bottom: 1px solid #ddd;
  font-size: 16px;

  &:first-of-type {
    border-top: 1px solid #ddd; /* 첫 번째 박스만 위쪽 선 표시 */
  }
`;

const AccordionHeader = styled.div`
  background-color: #ffffff;
  padding: 22px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;

  div {
    display: flex;
    gap: 8px;
  }

  span {
    font-weight: 600;
    color: ${(props) => (props.isOpen ? "#D90000" : "#000000")};
  }
`;

const Arrow = styled.span`
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
`;

const AccordionContent = styled.div`
  padding: 22px 42px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;
