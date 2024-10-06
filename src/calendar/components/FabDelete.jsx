
import { useCalendarStore,  } from "../../hooks"


export const FabDelete = () => {
    
   const { startDeletingEvent,hasEventSelected,hasEventIsActive } = useCalendarStore();

    const handleDelete = () => {
      startDeletingEvent();
  }

  return (
      <button className="btn btn-danger fab-delete"
      onClick={handleDelete}
      style={{
        display:hasEventSelected && hasEventIsActive ?'':'none'

      }}
      >
          <i className="fas fa-trash-alt"></i>


      </button>
  )
}
