
//Validaciones en formulario

const type = (dato) => {
  if (dato == "identificacion" || dato == "telefono") {
    return "number";
  } else if (dato == "email") {
    return "email";
  } else if (dato == "contraseña" || dato == "contraConf") {
    return "password";
  } else {
    return "text";
  }
};

const validarTelefono = (tel) => {
  if ((tel.length < 7 || tel.length > 12) && tel.length !== 0) {
    return true;
  } else {
    return false;
  }
};

const validarEmail = (email) => {
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    ) &&
    email.length !== 0
  ) {
    return true;
  } else {
    return false;
  }
};

const validaTodo = (data) => {
  let bool = false;
  Object.keys(data).forEach((dat) => {
    if (data[dat].length == 0) {
      bool = true;
    }
  });
  return bool;
};

const contraseñas = (contra1, contra2) => {
  let bool = false;
  if (contra1 !== contra2) {
    bool = true;
  }
  return bool;
};

export {
  type,
  validarTelefono,
  validarEmail,
  validaTodo,
  contraseñas,
};
