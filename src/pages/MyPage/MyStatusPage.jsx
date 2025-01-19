import React, { useState } from 'react';
import styled from 'styled-components';
import ContactStatus from '../../components/mypage/ContactStatus';
import Dropdown from '../../components/common/DropDown';

const DropdownGroup = ({ onStatusChange, onSortOrderChange }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggle = (dropdownId) => {
    setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  return (
    <GroupWrapper>
      <Dropdown
        label="상태"
        options={['제안', '체결 중', '체결 완료', '취소']}
        isActive={activeDropdown === 'status'}
        onToggle={() => handleToggle('status')}
        onSelect={(selected) => {
          onStatusChange(selected);
        }}
      />
      <Dropdown
        label="최신순"
        options={['최신순', '오래된 순']}
        isActive={activeDropdown === 'order'}
        onToggle={() => handleToggle('order')}
        onSelect={(selected) => {
          onSortOrderChange(selected);
        }}
      />
    </GroupWrapper>
  );
};

const GroupWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const MyStatusPage = () => {
  const [statusFilter, setStatusFilter] = useState('상태');
  const [sortOrder, setSortOrder] = useState('최신순');

  const handleStatusChange = (selected) => {
    setStatusFilter(selected);
  };
  const handleSortOrderChange = (selected) => {
    setSortOrder(selected);
  };

  return (
    <PageWrapper>
      <Title>체결 현황</Title>
      <Filters>
        <DropdownGroup
          onStatusChange={handleStatusChange}
          onSortOrderChange={handleSortOrderChange}
        />
      </Filters>
      <ContactStatus statusFilter={statusFilter} sortOrder={sortOrder} />
    </PageWrapper>
  );
};

const Title = styled.h1`
  color: #000;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const PageWrapper = styled.div`
  padding: 20px;
`;

const Filters = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export default MyStatusPage;
