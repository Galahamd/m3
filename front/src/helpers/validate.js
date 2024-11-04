export const validateLogin = (formData) => {
    const errors = {};
  
    if (!formData.username) {
      errors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    }
  
    if (!formData.userpassword) {
      errors.userpassword = "La contraseña es requerida";
    } else if (formData.userpassword.length <= 2) {
      errors.userpassword = "La contraseña debe tener al menos 3 caracteres";
    }
  
    return errors;
  };
  