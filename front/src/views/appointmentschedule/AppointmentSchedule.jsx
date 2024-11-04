import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../views/appointmentschedule/AppointmentSchedule.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const POSTAPPOINTMENT_URL = "http://localhost:3000/appointments/schedule";


function AppointmentSchedule() {

  //Verificar si esta el usuario logeado 
  const login = useSelector (state => state.userLoged.userData.login);
  const navigate = useNavigate();
  useEffect(()=>{
    !login && navigate ("/myappointments");
  },[login, navigate]);

  // Estado local
  const initialState = {
    date: "",
    hours: "12",
    minutes: "00",
    description: "",
  };
  const [appointment, setAppointment] = useState (initialState);
  const [errors, setErrors] = useState ({
    date: "Ingrese una fecha",
  });

  // Validaciones de Formulario
  const validateAppointment = ({date, hours, minutes, description}) => {
    const errors ={};
    if (!date)
      errors.date = "Ingrese una Fecha";
    else if (isMonday(date))
      errors.date = "La fecha no pude ser en Lunes";

    if (!description)
      errors.description = "Ingrese la descripción de la reserva";
    else if (description.length < 5)
      errors.description = "La descripción debe tener al menos 5 caracteres";
    else if (description > 30)
      errors.description = "La descripción debe ser hasta maximo 30 caracteres";

    return errors;
  }

  const isMonday = (date) => {
    const day = new Date(date).getDay();
    // return day === 5 || day === 6; //sábado es 5, domingo es 6
    return day === 0;
  };

  // 
  const handlerChange = (event) => {
    const { value, name } = event.target;
    const updatedAppointment = {
      ...appointment, [name]: value
    }
    setAppointment (updatedAppointment);
    setErrors (validateAppointment(updatedAppointment));
  };

  // Obener el id del store
  const userId = useSelector (state => state.userLoged.userData.user.id);
  const handlerSubmit = (event) => {
    event.preventDefault();
    const newAppointment = {
      date: appointment.date,
      time: `${appointment.hours}:${appointment.minutes}`,
      description: appointment.description,
      userId: userId
    };
    axios.post (POSTAPPOINTMENT_URL,newAppointment)
      .then (({data}) => {
        alert (`Se creo la rerserva: Fecha ${data.date}, hrs: ${data.time}`);
      setAppointment (initialState);
      navigate ("/myappointments")
      })
      .catch ((error) => {
        alert (`Error: ${error.response.data.error}`);
      });
  };

  // Creación hora valida 
  const validHours = ["12", "13", "14", "15", "16", "17", "18"];
  const validMinutes = ["00", "30"];

  // Restricción de fechas en el input fecha
  function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate (tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }
  return ( 
    <main className={styles.AppointmentSchedule}>
      <h2>Nueva Reserva</h2>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input type="date" id="date" name="date" min={getTomorrow()} value={appointment.date} onChange={handlerChange}/>
          {
            errors.date && <span>{errors.date}</span>
          }
        </div>
        <div>
          <label htmlFor="time">Hora:</label>
          <select name="hours" id="hours" value={appointment.hours} onChange={handlerChange}>
            {
              validHours.map ((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))
            }
          </select>
          <select name="minutes" id="minutes" value={appointment.minutes} onChange={handlerChange}>
            {
              validMinutes.map ((minute) => (
                <option key={minute} value={minute}> 
                  {minute}
                </option>
              ))
            }
          </select>
        </div>

        <div>
          <label htmlFor="description">Descripción:</label>
          <input type="text" id="description" name="description" value={appointment.description} placeholder="Descripción Reser" onChange={handlerChange}/>
          {
            errors.description && (
              <span> {errors.description} </span>
            )
          }
        </div>

        <button type="submit" disabled={Object.keys(errors).length > 0}>Reservar</button>
      </form>
    </main>
  )
}

export default AppointmentSchedule