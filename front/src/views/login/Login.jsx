import styles from "./Login.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validateLogin } from "../../helpers/validate";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postData = async (form, resetForm) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", form);
      if (response.status === 200) {
        dispatch(setUserData(response.data));
        alert("Usuario ingresó correctamente");
        resetForm(); // Restablece los valores del formulario a los valores iniciales
        navigate("/");
      }
    } catch (error) {
      console.log("Error del servidor", error);
      alert("No se consiguió ingresar");
    }
  };

  return (
    <main className={styles.loginFormContainer}>
      <h2>Login de Usuario</h2>
      <Formik
        initialValues={{
          username: "",
          userpassword: ""
        }}
        validate={validateLogin}
        onSubmit={(values, { resetForm }) => {
          console.log("Submitting form with values:", values);
          postData(values, resetForm);
        }}
      >
        {({ isValid }) => (
          <Form>
            <div>
              <label>USUARIO</label>
              <Field type="text" name="username" placeholder="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label>PASSWORD</label>
              <Field type="password" name="userpassword" placeholder="Password" />
              <ErrorMessage name="userpassword" component="div" />
            </div>
            <button type="submit" disabled={!isValid}>INGRESAR</button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Login;
