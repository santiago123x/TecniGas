import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style_Form from "./style_Form.css";
import logoC from "./icono.ico";
import logoP from "./proveedor.ico";
import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarCliente, post, postCliPro, put, validaActCliPro, putCliProTipo } from "./Validacion";
import * as yup from 'yup';
import  {yupResolver} from '@hookform/resolvers/yup';
import { setLocale } from 'yup';


const URL = "http://localhost:5000";

const Formulario = ({ tipo, metodo, titulo, imagen, recarga, setRecarga }) => {

  //Cambian el estilo a los elementos de material-ui
  const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: 400,
      backgroundColor: "white",
      border: "2px solid 000",
      boxShadow: theme.shadows[5],
      padding: "16px 32px 24px",
      top: "50%",
      left: "50%",
      transform: "traslate(-50%, -50%)",
    },
    textfield: {
      '& .MuiOutlinedInput-inputMarginDense': {
        padding: '8.5px ',
        
      },
      '& .MuiFormLabel-root': {
        Function: 'disable',
        
      },
      '& .PrivateNotchedOutline-root-2': {
        top: '0px',
        borderRadius:'15px',
        borderColor:'black'
        
      },
      '& .MuiInputBase-input': {
        borderRadius:'15px',
        color:'black',

      },
      '& .MuiInputBase-root': {
        borderRadius:'15px',

      },
      '& .MuiOutlinedInput-adornedStart': {
        paddingLeft: '7px',
        
      },
      '& .MuiOutlinedInput-multiline': {
        padding: '12px',
        
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        backgroundColor: '#bbdeef',
        color:'black',

      },
    },
  }));

  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    nombre: "",
    identificacion: "",
    correo: "",
    direccion: "",
    telefono: "",
  });

  const alertasucces =
    tipo === "cliente"
      ? "Se ha creado el cliente: "
      : "Se ha creado el proveedor: ";
  const alertaerror =
    tipo === "cliente"
      ? "Este cliente ya existe: "
      : "Este proveedor ya existe: ";

  // Función de escucha que obtiene el valor de los campos de texto
  const handleInputChange = (prop) => (event) => {
    //console.log(event.target.value)
    setDatos({
      ...datos,
      [prop]: event.target.value,
    });
  };

  //Diccionario que cambia los mensajes predeterminados de la función schema
  setLocale({
    mixed: {
      notType: 'Por favor ingrese datos válidos',
    },
    number:{
      min: 'Debe contener más de 9 digitos',
    }
  });
   

  //Validaciones en formulario
  const schema = yup.object().shape({
    nombre:yup.string().required("Por favor ingrese el nombre").test("validaName","Debe contener mínimo 5 carácteres", valor => valor.toString().length > 4),
    identificacion:yup.string().required("Por favor ingrese la identificación o nit"),
    correo:yup.string().required("Por favor ingrese el email").email("Ingrese un email válido"),
    direccion:yup.string().required("Por favor ingrese la dirección"),
    telefono:yup.number().required().test("validaTel","Debe contener más de 9 digitos", valor => valor.toString().length > 9),
  });

  //Realiza validaciones al enviar el formulario
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
 
  const notify = (suffix, nombre = "", tipo) => {
    if (tipo === "info") {
      toast.info(`${suffix} ${nombre}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${suffix} ${nombre}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const onSubmit = async (data, e) => {
      e.preventDefault();
      const valida = await validarCliente(data.identificacion, tipo);
      const validaCliPro = await validaActCliPro(data.identificacion, tipo);
      const body = {
        nombre_pe: data.nombre,
        identificacion: data.identificacion,
        email: data.correo,
        direccion: data.direccion,
        telefono: data.telefono,
      };
      const body_CliPro = {
        tipo_clpr : tipo
      };

      if (validaCliPro === true){
        metodo = "put";
      }

      console.log(metodo);
      console.log(data.persona_id);

      switch (metodo) {
        case "post":
          if (!valida || (valida > 0 && valida !== true)) {
            if (!valida === true) {
              const idPersona = await post(body);
              await postCliPro(idPersona, tipo);
              reset(e);
              setRecarga(!recarga);
              notify(alertasucces, data.nombre, "info");
            } else {
              await postCliPro(valida, tipo);
              reset(e);
              setRecarga(!recarga);
              notify(alertasucces, data.nombre, "info");
            }
          } else {
            notify(alertaerror, data.nombre, "error");
          }
          break;
        case "put":
            await put(data.identificacion, body);
            await putCliProTipo(data.identificacion, body_CliPro);
            reset(e);
            setRecarga(!recarga);
            notify(alertasucces, data.nombre, "info");
          break;
      }

  };

  //Control del modal
  //Función que reinicia el modal
  const reset = (e) => {
    e.target.reset();
    setModal(!modal);
  };

  //Inicializa el estado del modal en falso
  const [modal, setModal] = useState(false);

  //Función para cambiar el estado del modal
  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const styles = makeStyles();
  const classes = useStyles();

  const body = (
    <div className={styles.modal}>
      <div className="container mt-5">
        <div className="foco">
          <div className="cliente">
            <img className="imagen" src={imagen === "cli" ? logoC : logoP} />
            <h4 className="titulo-form">{titulo}</h4>
          </div>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="text"
               name="nombre"
               label="Nombre - Empresa"
               onChange={handleInputChange}
               inputRef={register}
              />
              <span className="span text-danger text-small d-block">
              {errors.nombre?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="text"
               name="identificacion"
               label="Identificación - NIT"
               onChange={handleInputChange}
               inputRef={register}
               />
             <span className="span text-danger text-small d-block">
              {errors.identificacion?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="email"
               name="correo"
               label="Correo Electrónico"
               onChange={handleInputChange}
               inputRef={register}
               />
              <span className="span text-danger text-small d-block">
              {errors.correo?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="text"
               name="direccion"
               label="Dirección"
               onChange={handleInputChange}
               inputRef={register}
               />
              <span className="span text-danger text-small d-block">
              {errors.direccion?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="number"
               name="telefono"
               label="Teléfono"
               onChange={handleInputChange}
               inputRef={register}
             />
             <span className="span text-danger text-small d-block">
              {errors.telefono?.message}
              </span>
            </div>
            <div className="botones">
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
              >
                Guardar
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="reset"
                onClick={() => abrirCerrarModal()}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div >
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => abrirCerrarModal()}
      >
        {titulo}
      </Button>
      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Formulario;
