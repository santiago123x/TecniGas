import { useForm } from "react-hook-form";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "../../../inventario/ModalProducto/FormularioProdStyles"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import { RiDeleteBin5Fill } from "react-icons/ri";
import React, { useState } from 'react';


const URL = "http://localhost:5000";

export const ModalDelete = ({cosa, elemento}) => {
    const [modal, setModal] = useState(false);
    const alertasucces = "Se ha eliminado el "
    const alertaerror = "No se ha podido eliminar el "
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

    const abrirCerrarModal = () => {
        setModal(!modal);
    };

    const body = (
        <div className={styles.modal}>
            <div className="container">
                <div className="container-element">
                    <h2>¿Desea eliminar {cosa} {elemento}?</h2>
                    <div className="container-element__button">
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            type="button"
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
                    color="primary"
                    onClick={() => abrirCerrarModal()}

                >
                    <RiDeleteBin5Fill />
                </IconButton>
            </Tooltip>


            <Modal open={modal} onClose={abrirCerrarModal}>
                {body}
            </Modal>
            <ToastContainer />
        </div>
    )
}







