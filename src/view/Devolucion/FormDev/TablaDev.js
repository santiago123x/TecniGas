import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moneda from '../../utilidades/moneda';
import { IconButton } from '@material-ui/core';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { withStyles, makeStyles } from '@material-ui/styles';

const TablaDev = (detaPro) => {

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
          },
        },
      }))(TableRow);
      
      const useStyles = makeStyles((theme) => ({
        table: {
          minWidth: '100%',
        },
        container: {
          height: '100%',
          backgroundColor: "#dee2e6",
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
      
      const classes = useStyles();
      const rows = {
          value :""
      };

    return (
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
          detaPro.map((de) => (
            <StyledTableRow key={0}>
              <StyledTableCell component="th" scope="row">
                {de.cod_producto}
              </StyledTableCell>
              <StyledTableCell align="center">{de.nombre}</StyledTableCell>
              <StyledTableCell align="center">{de.categoria}</StyledTableCell>
              <StyledTableCell align="center">{de.cantidad}</StyledTableCell>
              <StyledTableCell align="center">{moneda(de.precio)}</StyledTableCell>
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
                    >
                      <FaTrashAlt className="icono" />
                    </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}
export default TablaDev;