import * as yup from "yup";

//Validaciones en formulario

const validaAcc = yup.object().shape({
  nick: yup.string().required("Por favor ingrese el Nombre de Usuario"),
  contra: yup.string().required("Por favor ingrese la Contraseña"),
  contraConf: yup.string().required("Por favor ingrese la Confimación"),
});

const validaPerf = yup.object().shape({
  usu_nom: yup.string().required("Por favor ingrese el nombre"),
  usu_cedula: yup.string().required("Por favor ingrese la cedula"),
  usu_tel: yup
    .string()
    .required("Por favor ingrese el Telefono")
    .test(
      "validaTel",
      "Debe contener más de 7 digitos",
      (valor) => valor.toString().length >= 7 && valor.toString().length <= 12
    ),
  usu_email: yup
    .string()
    .required("Por favor ingrese el Email")
    .email("Ingrese un Email válido"),
  usu_direc: yup.string().required("Por favor ingrese la Dirección"),
});

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
  validaAcc,
  validaPerf,
  type,
  validarTelefono,
  validarEmail,
  validaTodo,
  contraseñas,
};
