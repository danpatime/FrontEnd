import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowDown from '../../assets/icons/keyboard_arrow_down.svg';

const Dropdown = ({ label, options, isActive, onToggle, onSelect }) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const [selectedOption, setSelectedOption] = useState(label);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    onToggle();
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleDropdown}>
        {selectedOption}
        <Icon src={KeyboardArrowDown} alt="arrow icon" isOpen={isOpen} />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 100px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownItem = styled.div`
  position: relative;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ededed;
    border-radius: 8px;
    opacity: 0;
    z-index: -1; /* 배경이 텍스트 아래*/
  }
  &:hover::before {
    opacity: 1;
  }
`;

export default Dropdown;