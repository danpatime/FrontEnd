import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionTable = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null); // 열려 있는 행의 인덱스

  const toggleAccordion = (index) => {
    const selectedItem = data[index];
    if (!selectedItem.response) {
      // 답변이 없는 경우 alert 창 표시
      alert('문의 답변은 2-3일 정도 소요됩니다. 조금만 기다려 주세요!');
      return;
    }
    // 답변이 있는 경우 아코디언 열기
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>문의일</th>
            <th>문의 유형</th>
            <th>문의 제목</th>
            <th>처리 상태</th>
            <th>답변일</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleAccordion(index)}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.status}</td>
                <td>{item.answerDate !== '-' ? item.answerDate : '-'}</td>
              </tr>
              {openIndex === index && (
                <tr>
                  <td colSpan="5">
                    <AccordionContent>{item.response}</AccordionContent>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};


export default AccordionTable;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 5px 0;
  font-size: 16px;

  th,
  td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f4f4f4;
  }

  tr {
    cursor: pointer;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const AccordionContent = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
