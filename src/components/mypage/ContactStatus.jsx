import styled from "styled-components";
import { LuMessageSquareDot, LuMessageSquareMore } from "react-icons/lu";
// 데이터 정의
const settlementData = [
  {
    status: "제안",
    store: "크리스피 크림",
    hourlyWage: "12,000",
    workTime: "2024.10.28 10:00~13:00",
    chat: "default",
  },
  {
    status: "체결 중",
    store: "할리스",
    hourlyWage: "9,860",
    workTime: "2024.10.28",
    chat: "new",
  },
  {
    status: "체결 완료",
    store: "할리스",
    hourlyWage: "9,860",
    workTime: "2024.10.28 10:00~13:00",
    chat: "default",
  },
  {
    status: "체결 완료",
    store: "할리스",
    hourlyWage: "9,860",
    workTime: "2024.10.28 10:00~13:00",
    chat: "default",
  },
  {
    status: "취소",
    store: "할리스",
    hourlyWage: "9,860",
    workTime: "2024.10.28 10:00~13:00",
    chat: "default",
  },
];

const ContactStatus = () => {
  return (
    <Section>
      <FilterContainer>
      </FilterContainer>
      <Table>
        <Thead>
          <tr>
            <Th>상태</Th>
            <Th>매장</Th>
            <Th>시급</Th>
            <Th>업무 시간</Th>
            <Th>채팅</Th>
          </tr>
        </Thead>
        <Tbody>
          {settlementData.map((data, index) => (
            <Tr key={index}>
              <Td>{data.status}</Td>
              <Td>{data.store}</Td>
              <Td>{data.hourlyWage}</Td>
              <Td>{data.workTime}</Td>
              <Td>
                {data.chat === "default" ? (
                  <LuMessageSquareMore />
                ) : (
                  <LuMessageSquareDot />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

const Section = styled.section`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Thead = styled.thead`
  background-color: #f9f9f9;
`;

const Th = styled.th`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

export default ContactStatus;
