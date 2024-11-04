import { useDispatch } from "react-redux";
import styles from "./Appointment.module.css";
import axios from "axios";
import { setUserAppointmentCancelled } from "../../redux/userSlice";

const Appointment = ({ id, date, time, status, description }) => {
  const dispatch = useDispatch();
  
  // Convertir la fecha a un objeto Date
  const dateObj = new Date(date);

  // Formatear la fecha
  const formattedDate = dateObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Funcion para Cancelar Reservas
  const cancelAppointment = async () => {
    if ( window.confirm(`Desea cancelar la rerserva del ${date} a horas: ${time}`)){
      try {
        await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
        dispatch(setUserAppointmentCancelled(id));
        alert("Reserva cancelada");
      } catch (error) {
        console.log("Ocurrió un error: ", error);
      }      
    }
  };


  return (
    <div className={styles.cardcontainer}>
      <p>{formattedDate}</p>
      <p>Hora: {time}</p>
      <p>{description}</p>
      <p>{status}</p>
      <button disabled={status === "Cancelled"} onClick={cancelAppointment}>
        {status === "Cancelled" ? "Cancelada" : "Cancelar"}
      </button>
    </div>
  );
};

export default Appointment;
