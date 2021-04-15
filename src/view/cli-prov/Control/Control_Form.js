import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Control from "./Control.css";
import logoC from "../formulario/icono.ico";
import logoP from "../formulario/proveedor.ico";
import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import { validaPut, put, del} from "../formulario/Validacion";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useStyles from "./ControlUseStyle";


const URL = "http://localhost:5000";

const Control_Form = ({
  tipo,
  metodo,
  titulo,
  imagen,
  recarga,
  setRecarga,
  objeto,
}) => {
  const estadoInicial = { ...objeto };
  
  

  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    ...objeto,
  });

  // Función de escucha que obtiene el valor de los campos de texto
  const handleInputChange = (event) => {
    //console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
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
    setDatos({ ...estadoInicial });
  };

  

  //Diccionario que cambia los mensajes predeterminados de la función schema
  setLocale({
    mixed: {
      notType: "Por favor ingrese datos válidos",
    },
    number: {
      min: "Debe contener más de 9 digitos",
    },
  });

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

  //Realiza validaciones al enviar el formulario
  const { register, errors, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    if(tipo === "cli"){
      tipo = "cliente";
    } else {
      tipo = "proveedor";
    }
    const tp = tipo;
    const idCliPro = objeto.identificacion;
    const body = {
      nombre_pe: data.nombre_pe,
      identificacion: data.identificacion,
      email: data.email,
      direccion: data.direccion,
      telefono: data.telefono.toString(),
    };
    const validaP = await validaPut(idCliPro, data.identificacion, tp);
    switch (metodo) {
      case "put":
        if (validaP) {
            await put(idCliPro, body);
            reset(event);
            setRecarga(!recarga);
            notify(alertasucces, data.identificacion, "info");
        } else if (!validaP) {
          notify(alertaerror, data.identificacion, "error");
        }
        break;
      case "delete":
            await del(idCliPro);
            reset(event);
            setRecarga(!recarga);
            break;   
    }
  };

  const alertasucces =
    tipo === "cli"
      ? "Se ha actualizado el cliente correctamente "
      : "Se ha actualizado el proveedor correctamente ";
  const alertaerror =
      "Está ingresando un dato inválido, cambie la siguiente identificación";

  const notify = (suffix, identificacion = "", tipo) => {
    if (tipo === "info") {
      toast.info(`${suffix}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${suffix} ${identificacion}`, {
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

  const styles = makeStyles();
  const classes = useStyles();

  const body = (
    <div className={styles.modal}>
      <div className="container_control mt-5">
        <div className="foco_control">
          <div className="header_form">
            <div className="cliente_control">
              <img className="imagen" src={imagen === "cli" ? logoC : logoP} />
            </div>
            <div className="titulos">
              <h4 className="titulo-form">{titulo}</h4>
              <h4 className="subtitulo-form">Actualización De Datos</h4>
            </div>
          </div>
          <div className="contenedor_form">
            
            <form
                className="form-group_btn"
                onSubmit={handleSubmit(onSubmit)}
              >
              <div className="conten-btn">
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
              >
                Actualizar
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
            
            <div className="formulario_control">
            <form
                className="form-group_control"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row">
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    size="small"
                    type="text"
                    name="nombre_pe"
                    value={datos.nombre_pe}
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
                    value={datos.identificacion}
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
                    name="email"
                    label="Correo Electrónico"
                    value={datos.email}
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
                    value={datos.direccion}
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
                    value={datos.telefono}
                    onChange={handleInputChange}
                    inputRef={register}
                  />
                  <span className="span text-danger text-small d-block">
                    {errors.telefono?.message}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Tooltip title="Editar" placement="top">
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() => abrirCerrarModal()}
        >
        <FaUserEdit />
        </IconButton>
      </Tooltip>
      
      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
    </div>
  );
};
export default Control_Form;
