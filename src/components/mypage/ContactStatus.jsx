import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LuMessageSquareDot, LuMessageSquareMore } from 'react-icons/lu';
import CustomTag from '../common/CustomTag';

const dummyData = [
  {
    id: 1,
    status: '제안',
    store: '크리스피 크림',
    hourlyWage: '12,000',
    workTime: '2024.10.28 10:00~13:00',
    chat: 'default',
  },
  {
    id: 2,
    status: '체결 중',
    store: '할리스',
    hourlyWage: '9,860',
    workTime: '2024.10.28',
    chat: 'new',
  },
  {
    id: 3,
    status: '체결 완료',
    store: '할리스',
    hourlyWage: '9,860',
    workTime: '2024.10.28 10:00~13:00',
    chat: 'default',
  },
  {
    id: 4,
    status: '체결 완료',
    store: '할리스',
    hourlyWage: '9,860',
    workTime: '2024.10.28 10:00~13:00',
    chat: 'default',
  },
  {
    id: 5,
    status: '취소',
    store: '할리스',
    hourlyWage: '9,860',
    workTime: '2024.10.28 10:00~13:00',
    chat: 'default',
  },
];

const ContactStatus = ({ statusFilter, sortOrder }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/status/details/${id}`);
  };

  const filteredData = dummyData.filter((data) =>
    statusFilter === '상태' ? true : data.status === statusFilter,
  );

  // 정렬기능 추후 구현

  return (
    <Section>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>상태</Th>
              <Th>매장</Th>
              <Th>시급</Th>
              <Th>업무 시간</Th>
              <Th>채팅</Th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <Tr key={data.id} onClick={() => handleRowClick(data.id)}>
                <Td>
                  <CustomTag text={data.status} type="status" />
                </Td>
                <Td>{data.store}</Td>
                <Td>{data.hourlyWage}원</Td>
                <Td>{data.workTime}</Td>
                <Td>
                  {data.chat === 'default' ? (
                    <LuMessageSquareMore />
                  ) : (
                    <LuMessageSquareDot />
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Section>
  );
};

// 스타일 정의
const Section = styled.section`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Th = styled.th`
  padding: 12px 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f1f1f1; /* 마우스 오버 시 행 강조 */
  }
`;

const Td = styled.td`
  padding: 12px 10px;
  text-align: center;
`;

export default ContactStatus;
