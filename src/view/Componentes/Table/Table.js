import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import { filter, mapTitle } from "./filter";
import "./Table.css";

export default function CollapsibleTable({
  data,
  filtro,
  titulos,
  titulosDetalles,
  tipo,
}) {
  const styleHead = useHeader();
  const classes = useRowStyles();
  const noHayDatos = [];

  for (let i = 0; i <= titulos.length; i++) {
    if (i === 0) {
      noHayDatos[i] = "No coinciden los datos";
    } else {
      noHayDatos[i] = "";
    }
  }
  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow className={styleHead.root} selected hover>
              <TableCell />
              {titulos.length !== 0 &&
                titulos.map((titulo, index) => {
                  return mapTitle(titulo, index);
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filter(tipo, data, filtro, titulosDetalles).length !== 0 ? (
              filter(tipo, data, filtro, titulosDetalles)
            ) : (
              <TableRow className={classes.root} align="center">
                {titulos.length !== 0 &&
                  noHayDatos.map((dat, index) => {
                    return mapTitle(dat, index);
                  })}
              </TableRow>
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

const useHeader = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      color: "black",
      background: "#7590C7",
      fontWeight: "bold",
    },
  },
});

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      background: "#9EADCB",
      borderBottom: "unset",
    },
  },
});

/*<TableCell align="center">Codigo del Producto</TableCell>
              <TableCell size="small" align="center">
                Nombre del Producto
              </TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Categoria</TableCell>*/
