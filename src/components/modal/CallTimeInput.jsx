import { useState } from "react";
import Modal from "../common/Modal";
import styled from "styled-components";

function CallTimeInput({ onClose, onSave, initialStartTime, initialEndTime }) {
  const [startTime, setStartTime] = useState(initialStartTime); // 초기값 적용
  const [endTime, setEndTime] = useState(initialEndTime); // 초기값 적용

  // 30분 간격으로 시간 생성
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, "0");
      times.push(`${hourStr}:00`, `${hourStr}:30`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // 저장 버튼 클릭 시 처리
  const handleSave = () => {
    if (startTime && endTime) {
      onSave(startTime, endTime); // 부모에게 시간 정보를 전달
      onClose(); // 모달 닫기
    } else {
      alert("시간을 모두 선택해주세요.");
    }
  };

  return (
    <Modal onClose={onClose} title="통화가능시간" width="365px">
      <TimeSelector>
        <Select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          <option value="">--시간 선택--</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
        <span>~</span>
        <Select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        >
          <option value="">--시간 선택--</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
      </TimeSelector>

      <Button onClick={handleSave}>저장</Button>
    </Modal>
  );
}

export default CallTimeInput;

const TimeSelector = styled.div`
  display: flex;
  align-items: center;

  span {
    margin: 0 18px;
  }
`;

const Select = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  width: 130px;
  height: 42px;
  outline: none;
`;

const Button = styled.button`
  background-color: #7B4B42;
  color: white;
  width: 303px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 32px;
`;
