import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월별 보기
import interactionPlugin from "@fullcalendar/interaction"; // 클릭 및 드래그 이벤트
import styled from "styled-components";
import koLocale from "@fullcalendar/core/locales/ko"; // 한글 로케일
import ScheduleAdd from "../modal/ScheduleAdd";

const ScheduleCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "회의\n10:00 ~ 12:00", 
      start: "2025-01-13T10:00:00",
      end: "2025-01-13T12:00:00",
      status: "completed", // 체결된 일정
    },
    {
      id: "2",
      title: "프로젝트 마감일\n14:00 ~ 16:00", 
      start: "2025-01-15T14:00:00",
      end: "2025-01-15T16:00:00",
      status: "completed",
    },
    {
      id: "3",
      title: "09:00 ~ 11:00", 
      start: "2025-01-16T09:00:00",
      end: "2025-01-16T11:00:00",
      status: "available", // 체결 가능한 시간
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedEvent(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
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

    const newEvent = {
      id: String(Date.now()),
      title: `${startTime} ~ ${endTime}`, 
      start: `${selectedDate}T${startTime}`,
      end: `${selectedDate}T${endTime}`,
      status: "available", // 체결 가능한 시간
    };
    setEvents([...events, newEvent]);
    closeModal();
  };

  const handleEditSchedule = (startTime, endTime) => {
    if (!validateTimes(startTime, endTime)) return;

    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            title: `${event.title.split("\n")[0]}\n${startTime} ~ ${endTime}`, // 일정 이름 + 시간대 (줄바꿈)
            start: `${selectedDate}T${startTime}`,
            end: `${selectedDate}T${endTime}`,
          }
        : event
    );

    setEvents(updatedEvents);
    closeModal();
  };

  const handleDeleteSchedule = () => {
    const filteredEvents = events.filter((event) => event.id !== selectedEvent.id);
    setEvents(filteredEvents);
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
        key={JSON.stringify(events)}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

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
    font-size: 20px;
    font-weight: bold;
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
`;
