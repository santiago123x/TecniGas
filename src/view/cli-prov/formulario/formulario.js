import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import { FaUserPlus, FaCartPlus } from "react-icons/fa";
import style_Form from "./style_Form.css";
import logoC from "./icono.ico";
import logoP from "./proveedor.ico";
import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "../Control/ControlUseStyle";
import { ToastContainer } from "react-toastify";
import { notify } from "../../Componentes/notify/Notify";
import "react-toastify/dist/ReactToastify.css";
import {
  validarCliente,
  post,
  postCliPro,
  put,
  validaActCliPro,
  putCliProTipo,
} from "./Validacion";

const Formulario = ({ tipo, metodo, titulo, imagen, recarga, setRecarga,tipoButton}) => {
  //Cambian el estilo a los elementos de material-ui

  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    nombre: "",
    identificacion: "",
    correo: "",
    direccion: "",
    telefono: ""
  });

  //Estado de errores
  const [errores, setErrores] = useState({
    nombre : false,
    identificacion: false,
    correo: false,
    direccion: false,
    telefono: false
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
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  //Validaciones en formulario
  const validaEmail = () =>{
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(datos.correo)){
      return true;
    } else {
      return false;
    }
  }; 

  const validaciones = () =>{
    if(datos.nombre == "" && datos.identificacion == "" && datos.correo == "" && 
        datos.direccion == "" && datos.telefono == ""){
          setErrores({
            nombre : true,
            identificacion: true,
            correo: true,
            direccion: true,
            telefono: true
          });
          return false;
        }
      else if(datos.nombre == "" || datos.identificacion == "" || datos.correo == "" || 
      datos.direccion == "" || datos.telefono == ""){
        let a,b,c,d,e = false;
        if(datos.nombre == ""){
          a = true;
        }if(datos.identificacion == ""){
          b = true;
        }if(datos.correo == ""){
          c = true;
        }if(datos.direccion == ""){
          d = true;
        }if(datos.telefono == ""){
          e = true;
        }
        setErrores({
          nombre : a,
          identificacion: b,
          correo: c,
          direccion: d,
          telefono: e
        })
        return false;
      }else if(datos.telefono.length < 7 || datos.telefono.length > 12){
          setErrores({
            nombre : false,
            identificacion: false,
            correo: false,
            direccion: false,
            telefono: true,
          });
        return false;
      } else if(!validaEmail()) {
        setErrores({
          nombre : false,
          identificacion: false,
          correo: true,
          direccion: false,
          telefono: false
        });
        return false;
      }else {
        setErrores({
          nombre : false,
          identificacion: false,
          correo: false,
          direccion: false,
          telefono: false
        });
        return true;
      }
  };

  const onSubmit = async () => {
    if(validaciones()){
      const valida = await validarCliente(datos.identificacion, tipo);
      const validaCliPro = await validaActCliPro(datos.identificacion, tipo);
      const body = {
        nombre_pe: datos.nombre,
        identificacion: datos.identificacion,
        email: datos.correo,
        direccion: datos.direccion,
        telefono: datos.telefono,
      };
      const body_CliPro = {
        tipo_clpr: tipo,
      };

      if (validaCliPro === true) {
        metodo = "put";
      }

      switch (metodo) {
        case "post":
          if (!valida || (valida > 0 && valida !== true)) {
            if (!valida === true) {
              const idPersona = await post(body);
              await postCliPro(idPersona, tipo);
              reset();
              setRecarga(!recarga);
              notify(alertasucces, datos.nombre, "info");
            } else {
              await postCliPro(valida, tipo);
              reset();
              setRecarga(!recarga);
              notify(alertasucces, datos.nombre, "info");
            }
          } else {
            notify(alertaerror, datos.nombre, "error");
          }
          break;
        case "put":
          await put(datos.identificacion, body);
          await putCliProTipo(datos.identificacion, body_CliPro);
          reset();
          setRecarga(!recarga);
          notify(alertasucces, datos.nombre, "info");
          break;
        default:
          break;
      }
    }
  };

  //Control del modal
  //Función que reinicia el modal
  const reset = () => {
    setErrores({
      nombre : false,
      identificacion: false,
      correo: false,
      direccion: false,
      telefono: false
    });
    setDatos({
      nombre: "",
      identificacion: "",
      correo: "",
      direccion: "",
      telefono: ""
    });
  };

  //Inicializa el estado del modal en falso
  const [modal, setModal] = useState(false);

  //Función para cambiar el estado del modal
  const abrirCerrarModal = () => {
    setModal(!modal);
    setErrores({
      nombre : false,
      identificacion: false,
      correo: false,
      direccion: false,
      telefono: false
    });
    setDatos({
      nombre: "",
      identificacion: "",
      correo: "",
      direccion: "",
      telefono: ""
    });
  };

  const classes = useStyles();

  const body = (
    <div>
      <div className="container mt-5">
        <div className="foco">
          <div className="cliente">
            <img className="imagen" src={imagen === "cli" ? logoC : logoP} />
            <h4 className="titulo-form">{titulo}</h4>
          </div>
          <form className="form-group">
            <div className="row">
              <TextField
                className={classes.textfield}
                variant="outlined"
                size="small"
                type="text"
                name="nombre"
                label="Nombre - Empresa"
                value={datos.nombre}
                onChange={handleInputChange}
              />
                {errores && errores.nombre &&
                <span className="span text-danger text-small d-block">
                  Campo obligatorio
                </span>}
            </div>
            <div className="row">
              <TextField
                className={classes.textfield}
                variant="outlined"
                size="small"
                type="text"
                name="identificacion"
                label="Identificación - NIT"
                value={datos.identificacion}
                onChange={handleInputChange}
              />
              {errores && errores.identificacion &&
                <span className="span text-danger text-small d-block">
                  Campo obligatorio
                </span>}
            </div>
            <div className="row">
              <TextField
                className={classes.textfield}
                variant="outlined"
                size="small"
                type="email"
                name="correo"
                label="Correo Electrónico"
                value={datos.correo}
                onChange={handleInputChange}
              />
              {errores && errores.correo && datos.correo == "" ?
                <span className="span text-danger text-small d-block">
                  Campo obligatorio
                </span>: errores && errores.correo && !validaEmail() &&
                <span className="span text-danger text-small d-block">
                Ingrese un correo válido
              </span>}
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
              />
              {errores && errores.direccion &&
                <span className="span text-danger text-small d-block">
                  Campo obligatorio
                </span>}
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
              />
              {errores && errores.telefono && datos.telefono == "" ?
                <span className="span text-danger text-small d-block">
                  Campo obligatorio
                </span> :
                  errores && errores.telefono && datos.telefono.length < 7 ?
                  <span className="span text-danger text-small d-block">
                  Registre entre 7 y 12 dígitos
                  </span>:
                  errores && errores.telefono && datos.telefono.length > 12 &&
                  <span className="span text-danger text-small d-block">
                  Registre entre 7 y 12 dígitos
                  </span>
                }
            </div>
            <div className="botones">
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="button"
                onClick={()=>onSubmit()}
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
    if(tipoButton == "true"){
      return (
        <div>
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
    }else{
      return (
        <div>
        <Tooltip title="Crear nuevo Cliente" placement="bottom">
         <IconButton 
          aria-label="Agregar Cliente" 
          className={classes.iconButton}
          onClick={() => abrirCerrarModal()}          
          >
            <FaUserPlus />
          </IconButton>
        </Tooltip>
          <Modal open={modal} onClose={abrirCerrarModal}>
            {body}
          </Modal>
          <ToastContainer />
        </div>
      );
    }
  
};

export default Formulario;
