import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Control from "./Control.css";
import logoC from "../formulario/icono.ico";
import logoP from "../formulario/proveedor.ico";
import logoI from "../formulario/icono-inventario.ico";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { schema, schema2 } from "./validacionInp";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import { validaPut, put } from "../formulario/Validacion";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../Componentes/notify/Notify";
import { FaUserEdit } from "react-icons/fa";
import useStyles from "./ControlUseStyle";
import Inputs from "./Inputs";
import { validarProd, putP } from "../../inventario/ModalProducto/ValidaProd";
import useAxios from "../../Hooks/useAxios";

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

  const dataCategoria = useAxios("/categorias");

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

  //Realiza validaciones al enviar el formulario
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(tipo == "inv" ? schema2 : schema),
  });

  const onSubmit2 = async (data, event) => {
    const codigoProdOld = objeto.codigo_pro;
    const idProd = objeto.producto_id;
    const body = {
      nombre_pro: data.nombre_pro,
      cantidad_pro: data.cantidad_pro,
      stock_min: data.stock_min,
      id_categoria: data.id_categoria,
      precio_may: data.precio_may,
      precio_uni: data.precio_uni,
    };

    const validar = await validarProd(data.nombre_pro, codigoProdOld);

    if (!validar) {
      try {
        await putP(idProd, body);
        reset(event);
        setRecarga(!recarga);
        notify(alertaexito, data.nombre_pro + " " + objeto.codigo_pro, "info");
      } catch (err) {
        notify(alertamistake, "error");
      }
    } else if (!validar) {
      notify("Error al modificar, datos invalidos.", "error");
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    if (tipo !== "inv") {
      let tp;

      if (tipo === "cli") {
        tp = "cliente";
      } else {
        tp = "proveedor";
      }

      const idCliPro = objeto.identificacion;
      const body = {
        nombre_pe: data.nombre_pe,
        identificacion: data.identificacion,
        email: data.email,
        direccion: data.direccion,
        telefono: data.telefono.toString(),
      };
      const validaP = await validaPut(idCliPro, data.identificacion, tp);

      if (validaP) {
        try {
          await put(idCliPro, body);
          reset(event);
          setRecarga(!recarga);
          notify(alertaexito, data.identificacion, "info");
        } catch (err) {
          notify(alertamistake, "error");
        }
      } else if (!validaP) {
        notify("Error al modificar, datos invalidos.", "error");
      }
    } else {
      onSubmit2(data, event);
    }
  };

  const alertaexito =
    tipo === "inv"
      ? "Se ha actualizado el producto correctamente"
      : tipo === "cli"
      ? "Se ha actualizado el cliente correctamente "
      : "Se ha actualizado el proveedor correctamente ";
  const alertamistake = "Error al intentar modificar, intente de nuevo.";

  const classes = useStyles();

  const body = (
    <div>
      <div className="container_control mt-5">
        <div className="foco_control">
          <div className="header_form">
            <div className="cliente_control">
              <img
                className="imagen"
                src={imagen == "inv" ? logoI : imagen === "cli" ? logoC : logoP}
              />
            </div>
            <div className="titulos">
              <h4 className="titulo-form">{titulo}</h4>
              <h4 className="subtitulo-form">Actualización De Datos</h4>
            </div>
          </div>
          <div className="contenedor_form">
            <form
              id="formPut"
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
                id="formPut"
                className="form-group_control"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Inputs
                  classes={classes}
                  register={register}
                  handleInputChange={handleInputChange}
                  datos={datos}
                  tipo={tipo}
                  errors={errors}
                  dataCategoria={dataCategoria.data}
                />
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
