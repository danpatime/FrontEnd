import React from 'react';
import styled from 'styled-components';

const ExperienceTag = ({ experience }) => {
  return <Tag>🫘 단팥 경력 {experience}회</Tag>;
};

export default ExperienceTag;

const Tag = styled.div`
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: bold;
  color: var(--primary-color);
  background: var(--primary-color-20);
  border-radius: 10px;
  margin-right: 4px;
`;
