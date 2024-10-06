import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabAdd = () => {
 
    const { openDateModal } = useUiStore();
   const {setActiveEvent}= useCalendarStore();

    const handleClikNew = () => {
        setActiveEvent({
          
          title: "",
          notes: "",
          start: new Date(),
          end: addHours(new Date(), 2),
          bgColor: "#fafafa",
          user: {
            id: "1234",
            name: "yery",
          },
        });
        openDateModal();
  }

  return (
      <button className="btn btn-primary fab"
        onClick={handleClikNew}
      >
          <i className="fas fa-plus"></i>


      </button>
  )
}
