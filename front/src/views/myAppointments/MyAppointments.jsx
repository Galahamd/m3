import styles from "./MyAppointments.module.css";
import { useEffect } from "react";
import Appointment from "../../components/appointment/Appointment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments } from "../../redux/userSlice";

import { Link } from "react-router-dom";
// import myAppointments from "../../helpers/myAppointments";
// const GETALLAPPOINTMENTSURL = "http://localhost:3000/appointments";


const GETUSERBYID_URL = "http://localhost:3000/users/";

const MyApointments =  () => {
  
  
  //Verificar si esta el usuario logeado 
  const login = useSelector (state => state.userLoged.userData.login);
  const navigate = useNavigate();
  useEffect(()=>{
    !login && navigate ("/home");
  },[login, navigate]);
  
  // Obener el id del store
  const userId = useSelector (state => state.userLoged.userData.user.id);
  
  // Traer el usuario por id y Actulizar appointments en Store
  const dispatch = useDispatch();
  useEffect(() =>{
    axios.get (GETUSERBYID_URL + userId)
    .then (response => response.data)
    .then (userLoged => {
      dispatch (setUserAppointments (userLoged.appointments))
    })
    .catch( (error) => console.log (error.message));
  },[dispatch, userId])
  
  const appointments = useSelector (state => state.userLoged.userAppointments);
  
  return(
    <main className={styles.appointmentContainer}>
      <Link to = "/appointmentschedule">
          Realizar Reserva
      </Link>
      <h2>Mis Reservas</h2>
      <section>
        {
          appointments.length ? (
            appointments.map(appointment => (
              <Appointment key={appointment.id} 
                id={appointment.id}
                date={appointment.date}
                time={appointment.time}
                description={appointment.description}
                status={appointment.status}
              />
            ))
          ) : (
            <h3>No tienes ninguna Reserva</h3>
          )
        }
      </section>
    </main>
  )
}

export default MyApointments;