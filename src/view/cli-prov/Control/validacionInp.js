import * as yup from "yup";
//Validaciones en formulario
const schema = yup.object().shape({
    nombre_pe: yup
      .string()
      .required("Por favor ingrese el nombre")
      .test(
        "validaName",
        "Debe contener mínimo 5 carácteres",
        (valor) => valor.toString().length > 4
      ),
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
        "Debe contener más de 9 digitos",
        (valor) => valor.toString().length > 9
      ),
  });

  const schema2 = yup.object().shape({
    nombre_pro: yup
      .string()
      .required("Por favor ingrese el nombre del producto")
      .test(
        "validaName",
        "Debe contener mínimo 3 carácteres",
        (valor) => valor.toString().length > 2
      ),
    stock_min: yup
      .number()
      .required("Por favor ingrese una cantidad valida"),
    cantidad_pro: yup
      .number()
      .required("Por favor ingrese una cantidad valida"),
    precio_may: yup.number().required("Por favor ingrese un valor"),
    precio_uni: yup
      .number()
      .required("Por favor ingrese un valor"),
  });

  export {schema, schema2}