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
import { delCliPro } from "../../../cli-prov/formulario/Validacion";
import { hideProducto } from "../../../inventario/ModalProducto/ValidaProd";


const URL = "http://localhost:5000";

export const ModalDelete = ({tipo, elemento, recarga, setRecarga}) => {
    const [modal, setModal] = useState(false);
    const alertisdone = "Se ha eliminado satisfactoriamente el "
    const alertisaerror = "Por favor recargue la página, no se ha podido eliminar el "
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
        let metodo = ""; 
        if(tipo === "cli"){
          metodo = "cliente";
        } if(tipo === "prov"){
          metodo = "proveedor";
        } if(tipo === "inv") {
          metodo = "inventario";
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
                    del = await delCliPro(idPersona, tipo, estado_clpr);
                    console.log("Testing");
                    abrirCerrarModal();
                    setRecarga(!recarga);
                    notify(alertisdone, tipo, "info");
                    
                break;
            case "proveedor":
                tipo = "proveedor";
                estado_clpr = "desactivado";
                del = await delCliPro(idPersona, tipo, estado_clpr);
                    console.log("Testing");
                    abrirCerrarModal();
                    setRecarga(!recarga);
                    notify(alertisdone, tipo, "info");
                break;
            case "inventario":
                tipo = "producto";
                body = {
                id_categoria : elemento.id_categoria,
                nombre_pro : elemento.nombre_pro,
                precio_uni : elemento.precio_uni,
                precio_may : elemento.precio_may,
                cantidad_pro : elemento.cantidad_pro,
                stock_min : elemento.stock_min,
                codigo_pro : elemento.codigo_pro,
                estado_pro: "desactivado"
            };
                await hideProducto(idProducto, body);
                setRecarga(!recarga);
                notify(alertisdone, tipo, "info");
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







