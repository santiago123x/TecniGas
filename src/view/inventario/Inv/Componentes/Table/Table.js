import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { FcCollapse, FcExpand } from "react-icons/fc";
import "./Table.css";

import { useState, usseEffect } from "react";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      background: "#9EADCB",
      borderBottom: "unset",
    },
  },
});
const useRowStyles2 = makeStyles({
  root: {
    "& > *": {
      background: "#ffffff71",
      borderBottom: "unset",
      borderRadius: "5px",
    },
  },
});
const useSub = makeStyles({
  root: {
    "& > *": {
      fontWeight: "bold",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const classes2 = useRowStyles2();
  const sub = useSub();
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell size="small">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <FcCollapse /> : <FcExpand />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.codigo_pro}
        </TableCell>
        <TableCell align="center">{row.nombre_pro}</TableCell>
        <TableCell align="center">{row.cantidad_pro}</TableCell>
        <TableCell align="center">{row.nombre_catg}</TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            className={classes2.root}
          >
            <Box margin={1}>
              <Typography
                className={sub.root}
                variant="subtitle1"
                component="div"
                size="small"
              >
                <strong>Detalle</strong>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Precio Publico</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Precio Mayorista</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Cantidad Minima</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      $ {row.precio_uni}
                    </TableCell>
                    <TableCell align="center">$ {row.precio_may}</TableCell>
                    <TableCell align="center">{row.stock_min}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

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

export default function CollapsibleTable({ data }) {
  const styleHead = useHeader();

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow className={styleHead.root} selected hover>
              <TableCell />
              <TableCell align="center">Codigo del Producto</TableCell>
              <TableCell size="small" align="center">
                Nombre del Producto
              </TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow align="center">No Hay Datos</TableRow>
            ) : (
              data.map((row, index) => <Row key={index} row={row} />)
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

/*
{loading1 ? (
  <h2>Cargando ...</h2>
) : error1 ? (
  <h3>Error: {error1}</h3>
) : ()}*/
