import * as yup from "yup";
//Validaciones en formulario
const schema = yup.object().shape({
  nombre_pe: yup.string().required("Por favor ingrese el nombre"),
  identificacion: yup
    .string()
    .required("Por favor ingrese la identificación o nit"),
  email: yup
    .string()
    .required("Por favor ingrese el email")
    .email("Ingrese un email válido"),
  direccion: yup.string().required("Por favor ingrese la dirección"),
  telefono: yup
    .number()
    .required()
    .test(
      "validaTel",
      "Debe contener más de 7 digitos",
      (valor) => valor.toString().length >= 7 && valor.toString().length <= 12
    ),
});

const schema2 = yup.object().shape({
  nombre_pro: yup.string().required("Por favor ingrese el nombre del producto"),
  stock_min: yup.number().required("Por favor ingrese una cantidad valida"),
  cantidad_pro: yup.number().required("Por favor ingrese una cantidad valida"),
  precio_may: yup.number().required("Por favor ingrese un valor"),
  precio_uni: yup.number().required("Por favor ingrese un valor"),
});

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

const validaMenor0 = (numero) => {
  let bool = false;
  if (numero !== "") {
    if (numero < 0) {
      bool = true;
    }
  }
  return bool;
};

export {
  schema,
  schema2,
  validarTelefono,
  validarEmail,
  validaTodo,
  validaMenor0,
};
