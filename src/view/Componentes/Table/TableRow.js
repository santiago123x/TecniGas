import { useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Tooltip from "@material-ui/core/Tooltip";

function Row({ firstData, secondData, titulosDetalles, opciones }) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const classes2 = useRowStyles2();
  const sub = useSub();
  const cantidad = firstData.length == 4 ? firstData[2] : null;
  const minCantidad = secondData.length == 3 ? secondData[2] : null;
  const comparar = () => {
    if (cantidad && minCantidad) {
      if (cantidad < minCantidad) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <TableRow className={comparar() ? classes.root2 : classes.root}>
      {secondData.length !== 0 ? (
        <TableCell size="small">
          {comparar() ? (
            <Tooltip
              title={`Comprar mas Productos: ${firstData[1]}`}
              placement="top"
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <FcCollapse /> : <FcExpand />}
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <FcCollapse /> : <FcExpand />}
            </IconButton>
          )}
        </TableCell>
      )
      : <></>
      }

        {firstData.length !== 0 &&
          firstData.map((dat, index) => {
            return (
              <TableCell key={index} align="center">
                <strong>{dat}</strong>
              </TableCell>
            );
          })}
        <TableCell align="center">
          <strong>{opciones}</strong>
        </TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            className={classes2.root}
          >
            {secondData.length !== 0 ? (
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
                    {titulosDetalles.length !== 0 &&
                      titulosDetalles.map((titulo, index) => {
                        return (
                          <TableCell key={index} align="center">
                            <strong>{titulo}</strong>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {secondData.length !== 0 &&
                      secondData.map((dat, index) => {
                        return (
                          <TableCell key={index} align="center">
                            <strong>{dat}</strong>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            )
            : <></>
            }
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      background: "#9EADCB",
      borderBottom: "unset",
    },
  },
  root2: {
    "& > *": {
      background: "rgba(219, 116, 116, 0.485)",
      borderBottom: "unset",
    },
  },
}));
const useRowStyles2 = makeStyles((theme) => ({
  root: {
    "& > *": {
      background: "#ffffff71",
      borderBottom: "unset",
      borderRadius: "5px",
    },
  },
}));
const useSub = makeStyles((theme) => ({
  root: {
    "& > *": {
      fontWeight: "bold",
    },
  },
}));

export default Row;

/* <TableCell align="center" component="th" scope="row">
          {row.codigo_pro}
        </TableCell>
        <TableCell align="center">{row.nombre_pro}</TableCell>
        <TableCell align="center">{row.cantidad_pro}</TableCell>
        <TableCell align="center">{row.nombre_catg}</TableCell>
        
        
        <TableCell align="center" component="th" scope="row">
                      $ {row.precio_uni}
                    </TableCell>
                    <TableCell align="center">$ {row.precio_may}</TableCell>
                    <TableCell align="center">{row.stock_min}</TableCell>*/
