import { useForm } from "react-hook-form";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "../../../inventario/ModalProducto/FormularioProdStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import { RiDeleteBin5Fill } from "react-icons/ri";
import React, { useState } from 'react';
import { delCliPro, hideProducto } from "../../../cli-prov/formulario/Validacion";


const URL = "http://localhost:5000";

export const ModalDelete = ({tipo, elemento, recarga, setRecarga}) => {
    const [modal, setModal] = useState(false);
    const alertasucces = "Se ha eliminado satisfactoriamente el "
    const alertaerror = "Por favor recargue la página, no se ha podido eliminar el "
    const styles = useStyles();

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
            toast.error(`${suffix}`, {
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

    const abrirCerrarModal = () => {
        setModal(!modal);
    };


    const tipoDel= () => {
        switch (tipo) {
            case 'inv': return `producto: ${ elemento.nombre_pro } `
            break;
            case 'cli': return `cliente: ${ elemento.nombre_pe }`
            break;
            case 'prov': return `proveedor: ${ elemento.nombre_pe }`
            break;
        }
    };

    const { handleSubmit } = useForm();

    const onSubmit = async (event) => {
        if(tipo === "cli"){
          tipo = "cliente";
        } if(tipo === "prov"){
          tipo = "proveedor";
        } 
        console.log(tipo);
        
        if (tipo === "cliente" || tipo === "proveedor")
        {
            const idPersona = elemento.persona_id;
            const body = {
                tipo_clpr : tipo,
                estado_clpr : "desactivado"
            };
            await delCliPro(idPersona, body);
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
        }
      };

    const body = (
        <div className={styles.modal}>
            <div className="container">
                <div className="container-element">
                    <form onSubmit = {handleSubmit(onSubmit)}>
                        <h3>¿Desea eliminar el {tipoDel()} ?</h3>
                        <div className="container-element__button">
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Aceptar
                            </Button>
                        </div>
                        <div className="container-element__button">
                            <Button
                                size="small"
                                variant="contained"
                                color="danger"
                                type="button"
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
            <ToastContainer />
        </div>
    )
}







