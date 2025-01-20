import React from "react";
import styled from "styled-components";

const map = [
  { title: "제안", color: "var(--secondary-color)" },
  { title: "체결 중", color: "#40AE7B" },
  { title: "체결 완료", color: "var(--primary-color)" },
  { title: "취소", color: "#767676" },
];

function CustomTag({ text, type }) {
  const color =
    type === "status" ? map.find((item) => item.title === text)?.color : "#000";

  return <TagContainer color={color}>{text}</TagContainer>;
}

const TagContainer = styled.div`
  width: 110px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: 24px;
`;

export default CustomTag;
