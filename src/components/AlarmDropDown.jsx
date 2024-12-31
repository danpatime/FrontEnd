import React from "react";
import styled from "styled-components";

const AlarmDropdown = () => {
  return <Container></Container>;
};

export default AlarmDropdown;

const Container = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: white;
  border: 1px solid var(--gray_light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 180px;
  height: 180px;
  padding: 10px;
  z-index: 1000;
`;
