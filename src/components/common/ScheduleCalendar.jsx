import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월별 보기
import interactionPlugin from "@fullcalendar/interaction"; // 클릭 및 드래그 이벤트
import styled from "styled-components";
import koLocale from "@fullcalendar/core/locales/ko"; // 한글 로케일
import ScheduleAdd from "../modal/ScheduleAdd";
import request from "../../api/request.ts";

const ScheduleCalendar = ({ isClickEnabled = true,  events = [] }) => {
  const [newEvents, setNewEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setNewEvents(events);
    console.error('처음에 받음', events);
  }, [events]);
  
  const syncWithServer = async (updatedEvents) => {
    const formattedData = {
      possibleTimes: updatedEvents.map((event) => ({
        startTime: event.start,
        endTime: event.end,
      })),
    };

    try {
      const response = await request.post("/api/v1/possible-board/work-hours", formattedData);

      setNewEvents(response.map((event) => ({
        id: event.id.toString(),
        title: `${event.startTime.split("T")[1]?.slice(0, 5)} ~ ${event.endTime.split("T")[1]?.slice(0, 5)}`,
        start: event.startTime,
        end: event.endTime,
        status: event.status,
      })));

    } catch (error) {
      console.error("서버 동기화 실패:", error);
    }
  };

  const handleDateClick = (info) => {
    if (!isClickEnabled) return; // isClickEnabled가 false이면 날짜 클릭 비활성화
    setSelectedDate(info.dateStr);
    setSelectedEvent(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    if (!isClickEnabled) return; // isClickEnabled가 false이면 일정 클릭 비활성화
    const event = newEvents.find((e) => e.id === info.event.id);
    setSelectedEvent(event);
    setSelectedDate(event.start.split("T")[0]);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const validateTimes = (startTime, endTime) => {
    if (!startTime || !endTime) {
      alert("시작 시간과 종료 시간을 모두 입력해주세요.");
      return false;
    }
    if (new Date(`${selectedDate}T${startTime}`) >= new Date(`${selectedDate}T${endTime}`)) {
      alert("시작 시간이 종료 시간보다 늦을 수 없습니다.");
      return false;
    }
    return true;
  };

  const handleAddSchedule = (startTime, endTime) => {
    if (!validateTimes(startTime, endTime)) return;
    console.error(newEvents);

    const newEvent = {
      id: String(Date.now()),
      title: `${startTime} ~ ${endTime}`, 
      start: `${selectedDate}T${startTime}`,
      end: `${selectedDate}T${endTime}`,
      status: "AVAILABLE", // 체결 가능한 시간
    };
    const updatedEvents = [...newEvents, newEvent];
    setNewEvents(updatedEvents);
    syncWithServer(updatedEvents); 
    closeModal();
  };

  const handleEditSchedule = (startTime, endTime) => {
    if (!validateTimes(startTime, endTime) || !selectedEvent) return;


    setNewEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== selectedEvent.id);
      syncWithServer(updatedEvents);
      return updatedEvents;
    });

    closeModal();
  };

  const handleDeleteSchedule = async () => {
    if (!selectedEvent) return;

    const formattedData = {
      possibleTimes: [
          {
              startTime: selectedEvent.start,
              endTime: selectedEvent.end
          },
      ]
    };

    console.error('format', formattedData);

    try {
        const response = await request.post("/api/v1/possible-board/work-hours/delete", formattedData);

        setNewEvents(response.map((event) => ({
          id: event.id.toString(),
          title: `${event.startTime.split("T")[1]?.slice(0, 5)} ~ ${event.endTime.split("T")[1]?.slice(0, 5)}`,
          start: event.startTime,
          end: event.endTime,
          status: event.status,
        })));
    } catch (error) {
        console.error("삭제 실패:", error);
    }

    closeModal();
  };

  const eventContent = (eventInfo) => {
    const isCompleted = eventInfo.event.extendedProps.status === "completed";
    const backgroundColor = isCompleted ? "#D2C0BC" : "#FFE79D"; 
    const titleWithTime = eventInfo.event.title; 
    
    return (
      <div
        style={{
          backgroundColor, 
          padding: "5px",
          borderRadius: "5px",
          width: "100%",
          whiteSpace: "pre-line",
        }}
      >
        {titleWithTime}
      </div>
    );
  };

  return (
    <Container>
      <FullCalendar
        key={JSON.stringify(newEvents)}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={newEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={eventContent}
        editable={true}
        headerToolbar={{
          left: "",
          center: "prev title next",
          right: "",
        }}
        locale={koLocale}
        dayHeaderFormat={{ weekday: "short" }}
        dayCellContent={(e) => e.dayNumberText.replace("일", "")}
        titleFormat={{ year: "numeric", month: "2-digit" }}
      />

      {isModalOpen && (
        <ScheduleAdd
          onClose={closeModal}
          onSubmit={isEditMode ? handleEditSchedule : handleAddSchedule}
          onDelete={handleDeleteSchedule}
          isEditMode={isEditMode}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
        />
      )}
    </Container>
  );
};



export default ScheduleCalendar;

const Container = styled.div`
  max-width: 814px;


  /* FullCalendar 기본 변수 재정의 */
  --fc-page-bg-color: transparent;
  --fc-neutral-bg-color: transparent;
  --fc-neutral-text-color: inherit;
  --fc-button-text-color: inherit;
  --fc-button-bg-color: transparent;
  --fc-button-border-color: transparent;
  --fc-button-hover-bg-color: transparent;
  --fc-button-hover-border-color: transparent;
  --fc-button-active-bg-color: transparent;
  --fc-button-active-border-color: transparent;

  .fc-toolbar-chunk {
    display: flex;
    justify-content: center; 
    align-items: center;
  }

  .fc-toolbar-title {
    font-size: 16px;
    font-weight: 600;
    padding: 0 15px;
    color: #333;
  }

  .fc-prev-button,
  .fc-next-button {
    background-color: transparent;
    border: none;
    color: #000000;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    outline: none;
    box-shadow: none;
  }

  .fc-prev-button:active,
  .fc-next-button:active {
    background-color: transparent;
    color: #000000;
    box-shadow: none;
    border: none;
    outline: none;
  }

  .fc-prev-button:focus,
  .fc-next-button:focus {
    outline: none;
    box-shadow: none;
  }

  .fc-prev-button:hover,
  .fc-next-button:hover {
    background-color: transparent;
    color: #333;
  }

  .fc .fc-button-primary:not(:disabled).fc-button-active:focus,
  .fc .fc-button-primary:not(:disabled):active:focus {
      box-shadow: unset;
  }

  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
      background-color: initial; 
      border-color: initial;     
      color: initial;            
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: unset;
  }

  .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
    margin: 0;
  }

  .fc-day {
    cursor: pointer; 
  }

  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 5px;
  }

  .fc-event {
  background-color: transparent !important; /* 배경색 제거 */
  border-color: transparent !important; /* 테두리 색 제거 */
}
`;
