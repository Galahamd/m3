import { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const emailRegExp = /\S+@\S+\.\S+/;
const POST_USER_URL = "http://localhost:3000/users/register";

const Register = () => {
  // Estado inicial
  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    userpassword: "",
    confirmPassword: ""
  };

  // Estados
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  // Validaciones
  const validateUser = ({ name, email, birthdate, nDni, username, userpassword, confirmPassword }) => {
    const errors = {};

    if (!name) errors.name = "Ingrese un nombre";
    if (!email) 
      errors.email = "Ingrese un email válido";
    else if (!emailRegExp.test(email))
      errors.email = "Ingrese un email válido";
    if (!birthdate) errors.birthdate = "Ingrese una fecha válida";
    if (!nDni) errors.nDni = "Ingrese un número de DNI";
    if (!username) errors.username = "Ingrese un nombre de Usuario";
    if (!userpassword) errors.userpassword = "Ingrese una contraseña";
    if (confirmPassword !== userpassword) errors.confirmPassword = "Las contraseñas no coinciden";
    
    return errors;
  };

  // Handlers
  const handlerChange = (event) => {
    const { name, value } = event.target;
    const newUser = { ...user, [name]: value };
    setUser(newUser);
    setErrors(validateUser(newUser));
  };

  const navigate = useNavigate();
  const handlerSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      nDni: user.nDni,
      username: user.username,
      userpassword: user.userpassword,
    };
    axios.post(POST_USER_URL, userData)
      .then(({ data }) => {
        alert("Usuario registrado exitosamente", data);
        setUser(initialState);
        setErrors(initialState);
        navigate ("/")
      })
      .catch(error => alert(error.message));
  };

  const handlerReset = (event) => {
    event.preventDefault();
    setUser(initialState);
    setErrors(initialState);
  }

  const formData = [
    { label: "Nombre:", name: "name", type: "text", placeholder: "Nombre Completo"},
    { label: "Email:", name: "email", type: "email", placeholder: "email" },
    { label: "Fecha de Nacimiento:", name: "birthdate", type: "date" },
    { label: "Número de DNI:", name: "nDni", type: "number", placeholder: "Nro. DNI" },
    { label: "Nombre de Usuario:", name: "username", type: "text", placeholder: "Usuario" },
    { label: "Contraseña:", name: "userpassword", type: "password", placeholder: "Password" },
    { label: "Confirmar Contraseña:", name: "confirmPassword", type: "password", placeholder: "Re ingrese Password" }
  ];

  const isFormValid = Object.values(errors).every(error => !error) && Object.values(user).every(field => field);

  return (
    <main className={styles.registerContainer}>
      <h2>Formulario de registro de Usuario</h2>
      <form onSubmit={handlerSubmit}>
        {formData.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label>{label}</label>
            <input 
              id={name}
              type={type}
              name={name}
              value={user[name]}
              placeholder={placeholder}
              onChange={handlerChange}
            />
            {errors[name] && (<span>{errors[name]}</span>)}
          </div>
        ))}
        <div className={styles.buttonsContainer}>
          <button disabled={!isFormValid} type="submit">Registrar</button>
          <button onClick={handlerReset}>Reset</button>
        </div>
      </form>
    </main>
  );
};

export default Register;
