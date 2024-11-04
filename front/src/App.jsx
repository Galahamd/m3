import { Route, Routes } from "react-router-dom";
import Navbar from "../src/components/navbar/Navbar";
import Home from "./views/home/Home"
import Contact from "./views/contact/Contact";
import About from "./views/about/About";
import MyApointments from "./views/myAppointments/MyAppointments"
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import AppointmentSchedule from "./views/appointmentschedule/AppointmentSchedule";
import ErrorPage from "./views/errorpage/ErrorPage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/home" element= {<Home />}/>
        <Route path="/about" element= {<About />}/>
        <Route path="/contact" element= {<Contact />}/>
        <Route path="/myappointments" element= {<MyApointments />}/>
        <Route path="/appointmentschedule" element= {<AppointmentSchedule />}/>
        <Route path="/login" element= {<Login />}/>
        <Route path="/register" element= {<Register />}/>
        <Route path="/*" element= {<ErrorPage />}/>
      </Routes>
    </>
  )
}

export default App
