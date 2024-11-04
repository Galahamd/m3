import logoMiTierra  from "../../assets/logoMiTierra.png"
import profile from "../../assets/profile.png";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserAppointments } from "../../redux/userSlice";
const Navbar = () => {
  const login = useSelector (state => state.userLoged.userData.login);
  const dispatch = useDispatch();
 
  function handlerLogout () {
    if (window.confirm(`¿Va salir de la sesion?`)) {
      dispatch (setUserData({
        "loggin": false,
        "user": {}
      }))
      dispatch (setUserAppointments([]));
    }
  }
  return (
    <nav className={styles.navbarContainer}>
      <Link to = "/">
        <img src={logoMiTierra} alt="logo mi restaurante" />
      </Link>

      <ul>
        <Link to = "/">
          <li>HOME</li>
        </Link>
        <Link to = "/about">
          <li>ACERCA</li>
        </Link>
        <Link to = "/contact">
          <li>CONTACTO</li>
        </Link>
        { login && (
          <Link className ={styles.nabarLinkAppointment} to = "/myappointments">
            <li>RESERVAS</li>
          </Link>)
        }
      </ul>
      { !login && (
        <div className={styles.loginRegisterContainer}>
          <Link className ={styles.login} to = "/login">
            LOGIN
          </Link>
          <Link className ={styles.register} to = "/register">
            REGISTRARSE
          </Link>
        </div>)
      }
      { login && (
        <div className={styles.logoutAvatarContainer}>
          <img src={profile} alt="" />
          <button onClick={handlerLogout}>LOGOUT</button>
        </div>)
      }
    </nav>
  )
}

export default Navbar;
