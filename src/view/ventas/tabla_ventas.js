import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { colors } from '@material-ui/core';

const useStyles = makeStyles({
    
  table: {
    minWidth: 650,
    background: 'rgba(0, 153, 255, 0.35)',
    '& .MuiPaper-root': {
        backgroundColor: '#111'
      }
    
  },
});



export default function DenseTable({rows}) {
  const classes = useStyles();
 
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{background:"#39B1E9"}}>
            <TableCell align="center">Codigo</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Descuento</TableCell>
            <TableCell align="center" >Subtotal</TableCell>
            <TableCell align="center" >Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="center">
                {row.codigo}
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
              <TableCell align="center">${row.precio}</TableCell>
              <TableCell align="center" >${row.descuento}</TableCell>
              <TableCell align="center">${row.subtotal}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}