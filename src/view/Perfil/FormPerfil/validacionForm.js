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
      (valor) => valor.toString().length >= 7
    ),
  usu_email: yup
    .string()
    .required("Por favor ingrese el Email")
    .email("Ingrese un Email válido"),
  usu_direc: yup.string().required("Por favor ingrese la Dirección"),
});

const type = (dato) => {
  if (dato == "usu_cedula" || dato == "usu_tel") {
    return "number";
  } else if (dato == "usu_email") {
    return "email";
  } else if (dato == "contra" || dato == "contraConf") {
    return "password";
  } else {
    return "text";
  }
};

export { validaAcc, validaPerf, type };
