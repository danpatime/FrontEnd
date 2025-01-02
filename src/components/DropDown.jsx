import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DropDown = () => {
  return (
    <Dropdown>
      <DropdownItem to="/mypage">내 정보</DropdownItem>
      <DropdownItem to="/logout">로그아웃</DropdownItem>
    </Dropdown>
  );
};

export default DropDown;

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: white;
  border: 1px solid var(--gray_light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 120px;
  padding: 10px;
  z-index: 1000;
`;

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 4px 10px;
  font-size: 14px;
  color: var(--black);
  text-decoration: none;
  &:hover {
    transition: 0.3s ease;
    font-weight: 800;
  }
`;
