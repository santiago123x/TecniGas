import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#0659a7",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    //maxWidth: 800,
  },
  container: {
    maxHeight: 322,
  }
});

const rows = [];

const Tablacompra = () =>  {
  const classes = useStyles();

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
          {rows.map((row) => (
            <StyledTableRow key={row.idprodu}>
              <StyledTableCell component="th" scope="row">
                {row.producto}
              </StyledTableCell>
              <StyledTableCell align="center">{row.cantidad}</StyledTableCell>
              <StyledTableCell align="center">{row.precio}</StyledTableCell>
              <StyledTableCell align="center">{row.cantidad * row.precio}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tablacompra;
