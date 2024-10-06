import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

  const dispatch = useDispatch();
    const {events,activeEvent } = useSelector(state => state.calendar);
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }
  
  const startSavingEvent = async (calendarEvent) => {
      
    if (calendarEvent._id) {
      // actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      // cereando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };
  const startDeletingEvent = () => {
    // todoLLegar al backend
    dispatch(onDeleteEvent());
  }

    return {
      // PROPIEDADES
      events,
      activeEvent,
      hasEventSelected: !!activeEvent,
      hasEventIsActive: !!setActiveEvent,
      // METODOS
      setActiveEvent,
      startSavingEvent,
      startDeletingEvent,
    };
    
  
}
