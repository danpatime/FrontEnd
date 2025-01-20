import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import styled from "styled-components";


function ScheduleAdd({ onClose, onSubmit, onDelete, selectedDate, selectedEvent, isEditMode }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [displayDate, setDisplayDate] = useState("");

  useEffect(() => {
    if (isEditMode && selectedEvent) {
      // 수정 모드일 경우, 초기값 설정
      const startDate = selectedEvent.start.split("T")[0]; // 날짜 추출
      const start = selectedEvent.start.split("T")[1]?.slice(0, 5) || ""; // 시간 추출
      const end = selectedEvent.end.split("T")[1]?.slice(0, 5) || "";
      setDisplayDate(startDate);
      setStartTime(start);
      setEndTime(end);
    } else {
      // 추가 모드일 경우, 초기값 리셋
      setDisplayDate(selectedDate);
      setStartTime("");
      setEndTime("");
    }
  }, [isEditMode, selectedEvent, selectedDate]);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, "0");
      times.push(`${hourStr}:00`, `${hourStr}:30`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Modal onClose={onClose} title={isEditMode ? "일정 수정" : "근무가능시간"} width="430px">
      <Section>
        <span>날짜</span>
        <span>{displayDate}</span> 
      </Section>
      <Section>
        <span>시간</span>
        <TimeSelector>
          <Select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">시작 시간</option>
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
            <option value="">종료 시간</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </TimeSelector>
      </Section>

      <ButtonSection>
        {isEditMode ? (
          <>
            <button id="delete-button" onClick={onDelete}>삭제</button>
            <button onClick={() => onSubmit(startTime, endTime)}>수정</button>
          </>
        ) : (
          <button
            onClick={() => {
              onSubmit(startTime, endTime);
            }}
          >
            등록
          </button>
        )}
      </ButtonSection>
    </Modal>
  );
}

export default ScheduleAdd;



const Section = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 55px;
  padding-right: 10px;
  padding-left: 30px;
  font-size: 16px;

  span {
    color: #000000;
  }
`;

const TimeSelector = styled.div`
  display: flex;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

const Select = styled.select`
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  padding: 5px 10px;
  width: 118px;
  height: 42px;
  outline: none;
`;

const ButtonSection = styled.div`
  width: 100%;
  text-align: right;
  padding-right: 10px;

  #delete-button {
    background-color: unset;
    color: #000000;
  }

  button {
    width: 88px;
    height: 42px;
    background-color: #7B4B42;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
  }
`;
