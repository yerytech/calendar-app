import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker ,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"
import { useCalendarStore, useUiStore } from "../../hooks";




const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto", 
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export const Calendarmodal = () => {
 
 const{activeEvent,startSavingEvent}=  useCalendarStore();
 const {isDateModalOpen,closeDateModal} = useUiStore();

  const [formSubmited, setFormSubmited] = useState(false);

const [formvalues, setFormvalues] = useState({
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
});

  const titleClass = useMemo(() => {
    if (!formSubmited) return '';
    return (formvalues.title.length > 0) ? '' : 'is-invalid';
  }, [formvalues.title,formSubmited]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormvalues({...activeEvent})
    }
  
   
  }, [activeEvent])
  

  const onInputChanged = ({target}) => {
    setFormvalues({
      ...formvalues,
       [target.name]:target.value
   })
 }

  const onDateChanged = (event,changing) => {
    setFormvalues({
      ...formvalues,
      [changing]:event
        })
  }
  const onCloseModal = () => {
    closeDateModal();
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);
    const difference=differenceInSeconds(formvalues.end,formvalues.start)
    if (isNaN(difference) || difference <= 0) {
     Swal.fire( "Fechas Incorrectas","Revisar fechas ingresadas",'error')
      return;
    } if (formvalues.title.length <= 0) return;
    await  startSavingEvent(formvalues);
    onCloseModal();
    setFormSubmited(false);
      
  }

    return (
      <Modal
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        isOpen={isDateModalOpen}
        onRequestClose={closeDateModal}
       
        style={customStyles}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              className="form-control ml-2"
              onChange={(event) => onDateChanged(event, "start")}
              selected={formvalues.start}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formvalues.start}
              className="form-control ml-2"
              onChange={(event) => onDateChanged(event, "end")}
              selected={formvalues.end}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formvalues.title}
              onChange={onInputChanged}
            />
            <small
              id="emailHelp"
              className="form-text text-muted"
            >
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formvalues.notes}
              onChange={onInputChanged}
            ></textarea>
            <small
              id="emailHelp"
              className="form-text text-muted"
            >
              Información adicional
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    );
};
