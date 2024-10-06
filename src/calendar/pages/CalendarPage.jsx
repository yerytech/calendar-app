import { Calendar} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, Calendarmodal, FabAdd, FabDelete, NavBar} from "../";
import { localizer ,getMessagesES } from "../../helpers";
import { useState } from "react";
import { useUiStore ,useCalendarStore } from "../../hooks";



export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events,setActiveEvent} = useCalendarStore();
  const [lasView, setLastView] = useState(localStorage.getItem('lastView' || 'week'));
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor: "#347cf7",
      borderradius: "0px",
      opacity: 0.8,
      color:"white"
    }
    return {
      style
    }
  }

  const onDobleClick = () => {
    openDateModal();
    
 }
  const onSelect= (event) => {
    setActiveEvent(event);
    
 }
  const onViewChanged= (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
    console.log(event);
    
 }



  return (
    <>
      <NavBar />
      <Calendar
        
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lasView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={
          {
            event:CalendarEvent
          }
        }
        onDoubleClickEvent={onDobleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        
      />
      <Calendarmodal />
      <FabAdd />
      <FabDelete/>
    </>
  );
};
