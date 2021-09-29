
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "./modalStyle.js";
import { notify } from "../../notify/Notify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { RiDeleteBin5Fill } from "react-icons/ri";
import React, { useState } from "react";
import { putCliPro } from "../../../cli-prov/formulario/Validacion";
import { deleteDev } from "../../../Devolucion/FormDev/validacionAxios";
import {
  hideProducto,
  hideUsuario,
  hideCategoria,
} from "../../../inventario/ModalProducto/ValidaProd";
import "./style.css";

export const ModalDelete = ({ tipo, elemento, recarga, setRecarga }) => {
  const [modal, setModal] = useState(false);
  const alertisdone = "Se ha eliminado satisfactoriamente el ";
  const alertisaerror =
    "Por favor recargue la página, no se ha podido eliminar el ";
  const styles = useStyles();

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const tipoDel = () => {
    switch (tipo) {
      case "inv":
        return `producto: ${elemento.nombre_pro} `;

      case "cli":
        return `cliente: ${elemento.nombre_pe}`;

      case "prov":
        return `proveedor: ${elemento.nombre_pe}`;
      case "usu":
        return `usuario: ${elemento.nombre_usr}`;
      case "cat":
        return `categoria: ${elemento.nombre_catg}`;
      case "dev":
        return `registro de la devolución: ${elemento.devolucion_id}`;
      default:
        break;
    }
  };

  const submit = async () => {
    let metodo = "";
    if (tipo === "cli") {
      metodo = "cliente";
    }
    if (tipo === "prov") {
      metodo = "proveedor";
    }
    if (tipo === "inv") {
      metodo = "inventario";
    }
    if (tipo === "usu") {
      metodo = "usuario";
    }
    if(tipo === 'cat'){
      metodo = 'categoria'
    }
    if(tipo === "dev"){
      metodo = "devolucion"
    }

    let idPersona = elemento.persona_id;
    let body = {};
    let idProducto = elemento.producto_id;
    let estado_clpr = "";
    let del = "";

    switch (metodo) {
      case "cliente":
        tipo = "cliente";
        estado_clpr = "desactivado";
        const valida = await putCliPro(idPersona, tipo, estado_clpr);
        if (valida) {
          notify(alertisdone, tipo, "info");
        } else {
          notify(alertisaerror, tipo, "info");
        }
        abrirCerrarModal();
        setRecarga(!recarga);

        break;
      case "proveedor":
        tipo = "proveedor";
        estado_clpr = "desactivado";
        const val = await putCliPro(idPersona, tipo, estado_clpr);
        if (val) {
          notify(alertisdone, tipo, "info");
        } else {
          notify(alertisaerror, tipo, "info");
        }
        abrirCerrarModal();
        setRecarga(!recarga);
        break;
      case "inventario":
        tipo = "producto";
        const vali = await hideProducto(idProducto);
        if (vali) {
          notify(alertisdone, tipo, "info");
        } else {
          notify(alertisaerror, tipo, "error");
        }
        setRecarga(!recarga);
        abrirCerrarModal();
        break;
      case "usuario":
        let idUsuario = elemento.usuario_id;
        const bool = await hideUsuario(idUsuario);
        if (bool) {
          notify(alertisdone, metodo, "info");
        } else {
          notify(alertisaerror, metodo, "error");
        }
        setRecarga(!recarga);
        abrirCerrarModal();
        break;
      case "categoria":
        let idCategoria = elemento.id_categoria;
        const boole = await hideCategoria(idCategoria);
        if (boole) {
          notify(alertisdone, metodo, "info");
        } else {
          notify(alertisaerror, metodo, "error");
        }
        setRecarga(!recarga);
        abrirCerrarModal();
        break;
      case "devolucion":
        let idDev = elemento.devolucion_id;
        const comprobante = await deleteDev(idDev);
        if(comprobante){
          notify(alertisdone, metodo, "info");
        } else {
          notify(alertisaerror, metodo, "error");
        }
        setRecarga(!recarga);
        abrirCerrarModal();
        break;
      default:
        notify(alertisaerror, tipo, "error");
        break;
    }

    /*if (tipo === "cli" || tipo === "prov"){
            const idPersona = elemento.persona_id;
            const body = {
                tipo_clpr : tipo,
                estado_clpr : "desactivado"
            };
            const algo = await delCliPro(idPersona, body);
            console.log(algo);
            setRecarga(!recarga);
            notify(alertasucces, tipo, "info");
            abrirCerrarModal();

        }if (tipo === "inv"){
            const idProducto = elemento.producto_id;
            const body = {
                id_categoria : elemento.id_categoria,
                nombre_pro : elemento.nombre_pro,
                precio_uni : elemento.precio_uni,
                precio_may : elemento.precio_may,
                cantidad_pro : elemento.cantidad_pro,
                stock_min : elemento.stock_min,
                codigo_pro : elemento.codigo_pro,
                estado_pro: "desactivado"
            };
            console.log(idProducto);
            await hideProducto(idProducto, body);
            setRecarga(!recarga);
            notify(alertasucces, tipo, "info");
            abrirCerrarModal();
        }else {
            notify(alertaerror, tipo, "error");
        }*/
  };

  const body = (
    <div className={styles.modal}>
      <div className="container-element">
        <h3 className="container-element__text">
          ¿Desea eliminar el {tipoDel()} ?
        </h3>
        <div  className="cont-buttons">
        <div className="container-element__button">
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="button"
            onClick={() => {
              submit();
            }}
          >
            Aceptar
          </Button>
        </div>
        <div className="container-element__button">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            type="button"
            onClick={() => abrirCerrarModal()}
          >
            Cancelar
          </Button>
        </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Tooltip title="Eliminar" placement="top">
        <IconButton
          size="small"
          variant="contained"
          onClick={() => abrirCerrarModal()}
        >
          <RiDeleteBin5Fill className="iconoDelete" />
        </IconButton>
      </Tooltip>

      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
    </div>
  );
};
