import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionTable = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null); // 열려 있는 행의 인덱스

  const toggleAccordion = (index) => {
    const selectedItem = data[index];
    if (!selectedItem.answerDate) {
      // 답변이 없는 경우 alert 창 표시
      alert('문의 답변은 2-3일 정도 소요됩니다. 조금만 기다려 주세요!');
      return;
    }
    // 답변이 있는 경우 아코디언 열기
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatDate = (date) => {
    if (!date) return '-';  
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0'); 

    return `${year}-${month}-${day}`; 
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>문의 유형</th>
            <th>세부 유형</th>
            <th>문의 제목</th>
            <th>처리 상태</th>
            <th>답변일</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleAccordion(index)}>
                <td>{item.inquiryType}</td>
                <td>{item.subInquiryType}</td>
                <td>{item.title}</td>
                <td>{item.inquiryStatus}</td>
                <td>{formatDate(item.answerDate)}</td>
              </tr>
              {openIndex === index && (
                <tr>
                  <td colSpan="5">
                    <AccordionContent>{item.content}</AccordionContent>
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
