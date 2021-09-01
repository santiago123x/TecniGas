import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moneda from '../../utilidades/moneda'
import { IconButton } from '@material-ui/core';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import MiInput from '../../Componentes/MiInput/MiInput';

import Tooltip from "@material-ui/core/Tooltip";

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
      backgroundColor: "#9eb9e9",
    },
    '& .MuiIconButton-root': {
      padding: '0%',
      margin: '0 10%'
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '100%',
  },
  container: {
    backgroundColor: "#dee2e6",
  },
  scrollPaper: {
    background: "cornflowerblue",
    '& .MuiDialogActions-root': {
      justifyContent: "center",
    },
    '& .MuiTypography-root': {
      textAlign: "center",
      fontWeight: "bold"
    },
    '& .MuiFormControl-root': {
      display: "flex",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    display: "grid",
    rowGap: "20px"
  },
  button: {
    backgroundColor: "rgb(11 52 91)",
  }
}));

const Tablacompra = ({ compraDet, setCompraDet }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [cantidad, setCantidad] = useState();
  const [precio, setPrecio] = useState();
  const [indexDet, setIndexDet] = useState();
  const [produSelec, setProduSelec] = useState(null);

  const eliminarDet = det => {
    setCompraDet(compraDet.filter(d => d !== det))
  }

  const modalEdit = (det, index) => {
    setPrecio(det.precio);
    setCantidad(det.cantidad);
    setProduSelec(det);
    setIndexDet(index);
    setModal(!modal);
  }

  const editDetalle = (e) => {
    e.preventDefault();
    const totalDet = precio * cantidad;
    const nuevoDet = {
      producto_id: produSelec.producto_id,
      nombre_pro: produSelec.nombre_pro,
      codigo_pro: produSelec.codigo_pro,
      precio: precio,
      cantidad: cantidad,
      totalDet: totalDet,
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
              <StyledTableCell align="center" width="10%">Codigo</StyledTableCell>
              <StyledTableCell align="center" width="30%">Producto</StyledTableCell>
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
                  <StyledTableCell align="center">{det.codigo_pro}</StyledTableCell>
                  <StyledTableCell align="center">{det.nombre_pro}</StyledTableCell>
                  <StyledTableCell align="center">{det.cantidad}</StyledTableCell>
                  <StyledTableCell align="center">{moneda(det.precio)}</StyledTableCell>
                  <StyledTableCell align="center">{moneda(det.totalDet)}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Editar" placement="top">
                      <IconButton
                      type="button"
                      aria-label="Editar"
                      onClick={() => {
                        modalEdit(det, index);
                      }}
                    >
                      <FaEdit className="icono" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar" placement="top">
                      <IconButton
                      type="button"
                      aria-label="Eliminar"
                      onClick={() => {
                        eliminarDet(det);
                      }}
                    >
                      <FaTrashAlt className="icono iconoDelete" />
                    </IconButton>
                    </Tooltip>
                    
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
          produSelec !== null &&
          produSelec.nombre_pro
        }</DialogTitle>
        <DialogContent className={classes.scrollPaper}>
          <form className={classes.formControl} onSubmit={(e) => editDetalle(e)}>
            <MiInput
              id="cantidad"
              label="Cantidad"
              size="small"
              type="number"
              variant="outlined"
              value={cantidad}
              onChange={(evento) => {
                setCantidad(parseInt(evento.target.value))
              }}
              inputProps={{
                min: 1,
              }}
              required
            />
            <MiInput
              id="precio"
              label="Precio"
              size="small"
              type="number"
              variant="outlined"
              value={precio}
              onChange={(evento) => {
                setPrecio(parseInt(evento.target.value))
              }}
              inputProps={{
                min: 1,
              }}
              required
            />
            <DialogActions >
              <Button type="submit" variant="contained" color="primary" >
                Terminar
          </Button>
            </DialogActions>
          </form>
        </DialogContent>

      </Dialog>
    </>
  );
}

export default Tablacompra;
