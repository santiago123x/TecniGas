import React from 'react';
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
import {FcDeleteRow} from 'react-icons/fc'
import { FaEdit, FaTrashAlt } from "react-icons/fa";

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
    '& .MuiIconButton-root':{
      padding: '0%',
      margin: '0 10%'
    }
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  container: {
    //maxHeight: 322,
    height: '100%',
  }
});

const Tablacompra = ({compraDet, setCompraDet}) =>  {
  const classes = useStyles();

  const eliminarDet = (det) =>{
    setCompraDet(compraDet.filter(d => d !== det))
  }

  return (
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
          { compraDet.length === 0 ? ( <StyledTableRow />):
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
                  
                >
                  <FaEdit className="icono" />
                </IconButton>
                <IconButton
                  type="button"
                  aria-label="Eliminar"
                  onClick={() =>{
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
  );
}

export default Tablacompra;
