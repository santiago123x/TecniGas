import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import useStyles from "../Componentes/Modal/ModalDelete/modalStyle";
import { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { MiInput2 } from "./estilo_componentes/estilos";


export const EliminarRow = ({ tipo, rowsG, rowE, setRows }) => {
    const [modal, setModal] = useState(false);
    const styles = useStyles();
    const [descuento, setDescuento] =useState(rowE.descuento);
    const [cantidad, setCantidad] =useState(rowE.cantidad);


    const abrirCerrarModal = () => {
        setModal(!modal);
        setDescuento(rowE.descuento);
        setCantidad(rowE.cantidad);
    };



    const eliminarRow = rowE => {
        setRows(rowsG.filter(d => d !== rowE))
        abrirCerrarModal();
        
    }

    const editarRow = rowE => {
        const subtotal = cantidad * (rowE.precio-descuento);
        let rowEditado = {...rowE, cantidad: cantidad, descuento: descuento, subtotal: subtotal};
        eliminarRow(rowE);
        setRows([...rowsG.filter(d => d !== rowE), rowEditado]);
        abrirCerrarModal();
       
    }
    const body2 = (
        <div className={styles.modal}>
            <div className="container-element">
                <h3 className="container-element__text">
                    Editar el producto: {rowE.nombre}
                </h3>
                <div style={{display:"flex", justifyContent:"center", width:"100%", margin:"3% 0 3% 0"}}>
                <div className="container-element__input" style={{display:"flex", justifyContent:"center"}}>
                    <MiInput2
                        style={{width:"80%"}}
                        type="number"
                        label="Cantidad"
                        value={cantidad}
                        variant="outlined"
                        size="small"
                        onChange={(e)=> setCantidad(e.target.value)}
                    />
                </div>
                <div className="container-element__input" style={{display:"flex", justifyContent:"center"}}>
                    <MiInput2
                        style={{width:"80%"}}
                        type="number"
                        label="Descuento"
                        value={descuento}
                        variant="outlined"
                        size="small"
                        onChange={(e)=> setDescuento(e.target.value)}
                    />
                </div>
                </div>
                <div className="container-element__button">
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={() => editarRow(rowE)}
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
    );

    const body = (
        <div className={styles.modal}>
            <div className="container-element">
                <h3 className="container-element__text">
                    {`¿Desea quitar el producto ${rowE.nombre} de la lista de compras?`}

                </h3>
                <div className="container-element__button">
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={() => eliminarRow(rowE)}
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
    );



    return (
        <div>
            <Tooltip title={tipo == "delete" ? "Eliminar" : "Editar"} placement="top">
                <IconButton
                    size="small"
                    variant="contained"
                    onClick={() => abrirCerrarModal()}
                //        
                >
                    {tipo == "delete" ? <RiDeleteBin5Fill className="iconoDelete" /> : <MdModeEdit className="iconoEdit" />}
                </IconButton>
            </Tooltip>

            <Modal open={modal} onClose={abrirCerrarModal}>
                {tipo == "delete" ? body : body2}
            </Modal>

        </div>
    );
}