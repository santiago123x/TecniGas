import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moneda from '../../utilidades/moneda';
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import MiInput from "../../Componentes/MiInput/MiInput";
import { IconButton } from '@material-ui/core';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { withStyles, makeStyles } from '@material-ui/styles';
import { notify } from "../../Componentes/notify/Notify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styleDev from "../styleDev.css";

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.info.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 17,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#5aacf8",
      },
      '& .MuiIconButton-root': {
        padding: '0%',
        margin: '0 10%'
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      flexWrap: "wrap",
      width: "400px",
      backgroundColor: "rgb(72 147 210)",
      border: "solid 5px rgba(176, 196, 222, 0.699)",
      borderRadius: "23px",
      boxShadow: theme.shadows[5],
      padding: "16px 32px 24px",
      margin: "20% 40%",
      top: "50%",
      left: "50%",
      transform: "traslate(-50%, -50%)",
    },
    table: {
      minWidth: '100%',
    },
    container: {
      height: '100%',
      backgroundColor: "#dee2e6",
      '& .MuiTableRow-root': {
        verticalAlign : 'top',
      },
    },
    scrollPaper: {
      background: "#2965aa2e",
      '& .MuiFormControl-root': {
        display: "block",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    button: {
      backgroundColor: "rgb(11 52 91)",
    }
  }));


const TablaDev = ({ detaPro, setDetaPro, detaVen, orden }) => {
    
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [cantidad, setCantidad] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [precio, setPrecio] = useState(null);
    const [indexDe, setIndexDe] = useState(null);
    const [produSelec, setProduSelec] = useState(null);
    

    //Mensajes para el usuario
    const alert = "Está editanto el registro a devolver del producto : "
    const alertfinish = "La fila ha sido modificada satisfactoriamente";
    const error_cant = "La cantidad máxima para devolver de este producto es de : ";
    const eliminado = "Se ha eliminado satisfactoriamente la fila con el producto :"
    let type = "";

    //Validaciones Modal
    const [errores, setErrores] = useState({
      cantidad: false,
      precio: false
    });

    const eliminar = deta => {
        setDetaPro(detaPro.filter(d => d !== deta))
        const productoInf = deta.cod_producto + "-" + deta.nombre_pro;
        type = "info";
        notify(eliminado, productoInf, type);
      }

    const styles = useStyles();
    
    const abrirCerrarModal = () => {
      setModal(!modal);
    };

    const reset = (e) => {
      e.target.reset();
      setModal(!modal);
    };
    
    const modalEd = (deta, index) => {
      console.log(deta);
        setPrecio(deta.precio);
        setCantidad(deta.cantidad);
        setCategoria(deta.categoria);
        setProduSelec(deta);
        setIndexDe(index);
        const productoInf = deta.cod_producto + "-" + deta.nombre_pro;
        type = "info";
        notify(alert, productoInf, type);
        setModal(!modal);
      };

    const submit = (e) => {
      e.preventDefault();
      if ((cantidad === "" || cantidad <= 0) && precio === ""){
        setErrores({
          ...errores,
          cantidad : true
        });
      } else if (cantidad === "" || cantidad <= 0){
        setErrores({
          ...errores,
          cantidad : true
        });
      } else if (detaVen[indexDe].cantidad_ven < cantidad){
        console.log(indexDe);
        type = "error";
        notify(error_cant, detaVen[indexDe].cantidad_ven, type);
      } else if (precio === ""){
        setErrores({
          ...errores,
          precio : true
        });
      } else {
        setErrores({
          cantidad : false,
          precio : false
        });
        const nuevoDet = {
          cod_producto: produSelec.cod_producto,
          nombre_pro: produSelec.nombre_pro,
          categoria: produSelec.categoria,
          precio: precio,
          cantidad: cantidad,
      };
      const nuevoDetaPro = detaPro.slice();
            nuevoDetaPro.splice(indexDe, 1, nuevoDet);
            setDetaPro(nuevoDetaPro);
            type = "info"
            notify(alertfinish, "", type);
            reset(e);
      }   
    };

    const body = (
      <div className = {styles.modal}>
          <div className = "contePpal" >
                <form className = "formulario" onSubmit={(e) => submit(e)}>
                    <h2 className = "titleEdi">Modificar Registro</h2>
                    <div className = "inputsMod" >
                      <div className = "modCa"> 
                      <MiInput
                          variant = "outlined"
                          size = "small"
                          name = "cantidad"
                          label = "Cantidad"
                          value = {cantidad}
                          type = "number"
                          onChange={(evento) => {
                          setCantidad(evento.target.value)
                          }} 
                      />
                      {errores && errores.cantidad && 
                            cantidad === ""?
                            <span className="span text-danger text-small d-block">
                              Campo obligatorio.
                            </span>
                            : errores && errores.cantidad && cantidad <= 0 && 
                            <span className="span text-danger text-small d-block">
                              Ingrese números mayores que cero.
                            </span>
                            }
                      </div>
                      <div className = "modPr">
                      <MiInput
                          variant = "outlined"
                          size = "small"
                          name = "precio"
                          label = "Precio"
                          value = {precio}
                          type = "number"
                          onChange={(evento) => {
                          setPrecio(evento.target.value)
                          }}
                      />
                      {errores && errores.precio && 
                            precio === "" &&
                            <span className="span text-danger text-small d-block">
                              Campo obligatorio.
                            </span>}
                      </div>
                    </div>
                    <div className ="btnesEditar">
                        <Button
                            size = "small"
                            variant ="contained"
                            color ="primary"
                            type = "submit"
                        >
                        Editar
                        </Button>
                        <Button 
                            size = "small"
                            variant = "contained"
                            color = "secondary"
                            type = "reset"
                            onClick = {() => abrirCerrarModal()}
                        >
                        Cancelar   
                        </Button>    
                    </div>      
                  
                </form>
          </div>
      </div>
  );
      
    return (
    <>    
    {orden === "prod" ? 
    <TableContainer component={Paper} className={classes.container}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Código</StyledTableCell>
          <StyledTableCell align="center">Nombre</StyledTableCell>
          <StyledTableCell align="center">Categoria</StyledTableCell>
          <StyledTableCell align="center">Cantidad</StyledTableCell>
          <StyledTableCell align="center">Precio</StyledTableCell>
          <StyledTableCell align="center">Opciones</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {detaPro.length === 0 ? (<StyledTableRow />) :
        (detaPro.map((deta, index) => (
          <StyledTableRow  key={index}>
            <StyledTableCell component="th" scope="row">
              {deta.cod_producto}
            </StyledTableCell>
            <StyledTableCell align="center">{deta.nombre_pro}</StyledTableCell>
            <StyledTableCell align="center">{deta.categoria}</StyledTableCell>
            <StyledTableCell align="center">{deta.cantidad}</StyledTableCell>
            <StyledTableCell align="center">{moneda(deta.precio)}</StyledTableCell>
            <StyledTableCell align="center">
                  <Tooltip title="Editar" placement="top">
                  <IconButton
                    type="button"
                    aria-label="Editar"
                    onClick={() => {
                      modalEd(deta, index);
                    }}
                  >
                    <FaEdit className="icono"/>
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar" placement="top">
                  <IconButton
                    type="button"
                    aria-label="Eliminar"
                    onClick={() => {
                      eliminar(deta);
                    }}
                  >
                    <FaTrashAlt className="icono" />
                  </IconButton>
                  </Tooltip>
                  
            </StyledTableCell>
          </StyledTableRow>
        )))}
      </TableBody>
    </Table>
  </TableContainer> 
  :
  <TableContainer component={Paper} className={classes.container}>
  <Table className={classes.table} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Código</StyledTableCell>
        <StyledTableCell align="center">Nombre_list</StyledTableCell>
        <StyledTableCell align="center">Categoria</StyledTableCell>
        <StyledTableCell align="center">Cantidad</StyledTableCell>
        <StyledTableCell align="center">Precio</StyledTableCell>
        <StyledTableCell align="center">Opciones</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {detaPro.length === 0 ? (<StyledTableRow />) :
      (detaPro.map((deta, index) => (
        <StyledTableRow  key={index}>
          <StyledTableCell component="th" scope="row">
            {deta.cod_producto}
          </StyledTableCell>
          <StyledTableCell align="center">{deta.nombre_pro}</StyledTableCell>
          <StyledTableCell align="center">{deta.categoria}</StyledTableCell>
          <StyledTableCell align="center">{deta.cantidad}</StyledTableCell>
          <StyledTableCell align="center">{moneda(deta.precio)}</StyledTableCell>
          <StyledTableCell align="center">
                <Tooltip title="Editar" placement="top">
                <IconButton
                  type="button"
                  aria-label="Editar"
                  onClick={() => {
                    modalEd(deta, index);
                  }}
                >
                  <FaEdit className="icono"/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" placement="top">
                <IconButton
                  type="button"
                  aria-label="Eliminar"
                  onClick={() => {
                    eliminar(deta);
                  }}
                >
                  <FaTrashAlt className="icono" />
                </IconButton>
                </Tooltip>
                
          </StyledTableCell>
        </StyledTableRow>
      )))}
    </TableBody>
  </Table>
</TableContainer>
  }
    <Modal 
      disableBackdropClick
      open={modal} 
      onClose={abrirCerrarModal}>
      {body}
    </Modal>
    </>
    );
}
export default TablaDev;