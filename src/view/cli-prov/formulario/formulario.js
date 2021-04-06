import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style_Form from "./style_Form.css";
import logoC from "./icono.ico";
import logoP from "./proveedor.ico";
import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { validarCliente, post, postCliPro } from "./Validacion";

const URL = "http://localhost:5000";

const Formulario = ({ tipo, metodo, titulo, imagen, recarga, setRecarga }) => {
  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    nombre: "",
    identificacion: "",
    correo: "",
    direccion: "",
    telefono: "",
  });

  // Función de escucha que obtiene el valor de los campos de texto
  const handleInputChange = (prop) => (event) => {
    //console.log(event.target.value)
    setDatos({
      ...datos,
      [prop]: event.target.value,
    });
  };

  //Realiza validaciones al enviar el formulario
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    const valida = await validarCliente(data.identificacion, tipo);
    const body = {
      nombre_pe: data.nombre,
      apellido: "DavidGay",
      identificacion: data.identificacion,
      email: data.correo,
      direccion: data.direccion,
      telefono: data.telefono,
    };
    switch (metodo) {
      case "post":
        if (!valida || (valida > 0 && valida !== true)) {
          if (!valida === true) {
            const idPersona = await post(body);
            await postCliPro(idPersona, tipo);
            reset(e);
            setRecarga(!recarga);
            alert("Se creo persona y cli");
          } else {
            await postCliPro(valida, tipo);
            reset(e);
            setRecarga(!recarga);
            alert("Se creo cli");
          }
        } else {
          alert("YA ESTA CREADO");
        }
        break;
    }
  };

  const reset = (e) => {
    e.target.reset();
    setModal(!modal);
  };

  //Cambian el estilo de elementos de material-ui
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
    container: {
      textAlign: "center",
    },
  }));

  const MiInput = withStyles({
    root: {
      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "8.5px ",
      },

      "& .MuiFormLabel-root": {
        Function: "disable",
      },

      "& .PrivateNotchedOutline-root-2": {
        top: "0px",
        borderRadius: "15px",
        borderColor: "black",
      },

      "& .MuiInputBase-input": {
        borderRadius: "15px",
        backgroundColor: "#B8DEFD",
      },

      "& .MuiOutlinedInput-adornedStart": {
        paddingLeft: "7px",
      },

      "& .MuiOutlinedInput-multiline": {
        padding: "12px",
      },

      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        backgroundColor: "#B8DEFD",
        color: "black",
      },

      "& .MuiOutlinedInput-input": {
        width: "100%",
      },
    },
  })(TextField);

  //Inicializa el estado del modal en falso
  const [modal, setModal] = useState(false);

  //Función para cambiar el estado del modal
  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const styles = makeStyles();

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
              <MiInput
                variant="outlined"
                size="small"
                label="Nombre - Empresa"
                type="text"
                name="nombre"
                onChange={handleInputChange}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Campo Obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "Digite un dato de menos de 50 caracteres",
                  },
                })}
              />
              <span className="span text-danger text-small d-block">
                {errors?.nombre?.message}
              </span>
            </div>
            <div className="row">
              <MiInput
                variant="outlined"
                size="small"
                label="Identificación - Nit"
                type="number"
                name="identificacion"
                onChange={handleInputChange}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Campo Obligatorio",
                  },
                  maxLength: {
                    value: 12,
                    message: "Digite un dato de menos de 12 caracteres",
                  },
                })}
              />
              <span className="span text-danger text-small d-block">
                {errors?.identificacion?.message}
              </span>
            </div>
            <div className="row">
              <MiInput
                variant="outlined"
                size="small"
                label="Correo Electrónico"
                type="email"
                name="correo"
                onChange={handleInputChange}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Campo Obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "Digite un dato de menos de 50 caracteres",
                  },
                })}
              />
              <span className="span text-danger text-small d-block">
                {errors?.correo?.message}
              </span>
            </div>
            <div className="row">
              <MiInput
                variant="outlined"
                size="small"
                label="Dirección"
                type="text"
                name="direccion"
                onChange={handleInputChange}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Campo Obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "Digite un dato de menos de 50 caracteres",
                  },
                })}
              />
              <span className="span text-danger text-small d-block">
                {errors?.direccion?.message}
              </span>
            </div>
            <div className="row">
              <MiInput
                variant="outlined"
                size="small"
                label="Teléfono"
                type="number"
                name="telefono"
                onChange={handleInputChange}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Campo Obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "Digite un dato de menos de 50 caracteres",
                  },
                })}
              />
              <span className="span text-danger text-small d-block">
                {errors?.telefono?.message}
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

  const crearCliente = async (API, body) => {
    /*
    try {
      const response = await axios({
        method: metodo,
        url: URL + API,
        data: body,
      });
    } catch (err) {
      setError(err);
    }
  ;*/
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Formulario;
