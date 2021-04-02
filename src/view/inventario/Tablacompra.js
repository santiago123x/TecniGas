import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moneda from '../utilidades/moneda'
import { IconButton } from '@material-ui/core';
import { FcDeleteRow } from 'react-icons/fc'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from './ModalEditDetCompra'

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
    }
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '100%',
  },
  container: {
    //maxHeight: 322,
    height: '100%',
    backgroundColor: "#dee2e6"
  },
  scrollPaper: {
    background: "#2965aa77",
    '& .MuiFormControl-root': {
      display: "block",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

/*const editDetalle = (modal, setModal, det) => {
  ReactDOM.render(
    <Modal
      modal={modal}
      setModal={setModal}
      det={det}
    />,
    document.getElementById('modal')
  )
  setModal(true)
}*/

const Tablacompra = ({ compraDet, setCompraDet }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [cantidad, setCantidad] = useState();
  const [precio, setPrecio] = useState();
  const [indexDet, setIndexDet] = useState();
  const [produSelec, setProduSelec] = useState(null)

  const eliminarDet = det => {
    setCompraDet(compraDet.filter(d => d !== det))
  }

  const modalEdit = (det, index) => {
    setPrecio(det.precio);
    setCantidad(det.cantidad);
    setProduSelec(det)
    setIndexDet(index);
    setModal(!modal);
  }

  const editDetalle = () => {
    const totalDet = precio * cantidad;
    const nuevoDet = {
      producto_id: produSelec.producto_id,
      nombre_pro: produSelec.nombre_pro,
      precio: precio,
      cantidad: cantidad,
      totalDet: totalDet
    };
    const nuevoCompraDet = compraDet.slice();
    nuevoCompraDet.splice(indexDet, 1, nuevoDet);
    setCompraDet(nuevoCompraDet);
    setModal(!modal);
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Producto</StyledTableCell>
              <StyledTableCell align="center">Cantidad</StyledTableCell>
              <StyledTableCell align="center">Precio</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compraDet.length === 0 ? (<StyledTableRow />) :
              (compraDet.map((det, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">{det.nombre_pro}</StyledTableCell>
                  <StyledTableCell align="center" fontSize="bold">{det.cantidad}</StyledTableCell>
                  <StyledTableCell align="center">{moneda(det.precio)}</StyledTableCell>
                  <StyledTableCell align="center">{moneda(det.totalDet)}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      type="button"
                      aria-label="Editar"
                      onClick={() => {
                        modalEdit(det, index);
                      }}
                    >
                      <FaEdit className="icono" />
                    </IconButton>
                    <IconButton
                      type="button"
                      aria-label="Eliminar"
                      onClick={() => {
                        eliminarDet(det);
                      }}
                    >
                      <FaTrashAlt className="icono" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>
      <div id="modal" />
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={modal}
      >
        <DialogTitle className={classes.scrollPaper}>{
          produSelec !== null ?
            produSelec.nombre_pro :
            ""}</DialogTitle>
        <DialogContent className={classes.scrollPaper}>
          <form className={classes.formControl}>
            <TextField
              id="cantidad"
              label="Cantidad"
              size="small"
              type="number"
              value={cantidad}
              onChange={(evento) => {
                setCantidad(parseInt(evento.target.value))
              }}
            />
            <TextField
              id="precio"
              label="Precio"
              size="small"
              type="number"
              value={precio}
              onChange={(evento) => {
                setPrecio(parseInt(evento.target.value))
              }}
            />
          </form>
        </DialogContent>
        <DialogActions className={classes.scrollPaper}>
          <Button onClick={() => editDetalle()} color="primary">
            Terminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Tablacompra;
