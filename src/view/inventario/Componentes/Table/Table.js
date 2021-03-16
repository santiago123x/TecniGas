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
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { FcCollapse, FcExpand } from "react-icons/fc";
import "./Table.css";

import { useState } from "react";

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
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
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
                    <TableCell>Precio Publico</TableCell>
                    <TableCell>Precio Mayorista</TableCell>
                    <TableCell align="center">Cantidad Minima</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  ))}
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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

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

export default function CollapsibleTable() {
  const styleHead = useHeader();
  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow className={styleHead.root} selected hover>
              <TableCell />
              <TableCell>Codigo del Producto</TableCell>
              <TableCell size="small" align="center">
                Nombre del Producto
              </TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
