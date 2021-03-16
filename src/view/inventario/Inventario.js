import { useState } from "react";
import "./Inventario.css";
import CollapsibleTable from "./Componentes/Table/Table";
import Modal from "./Componentes/Modal/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { FcSearch, FcViewDetails } from "react-icons/fc";

const Inventario = () => {
  const [filtro, setFiltro] = useState(false);
  const classes = useStyles();

  return (
    <>
      <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Productos</h2>

          <hr className="linea-h2" />
          <div className="cont__lista-input"></div>
          <Paper component="form" className={classes.root}>
            <Tooltip title="Seleccionar Filtro" placement="top">
              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                onClick={() => setFiltro(!filtro)}
              >
                <FcViewDetails />
              </IconButton>
            </Tooltip>

            <InputBase
              className={classes.input}
              placeholder="Filtrar Productos"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Tooltip title="Buscar" placement="top">
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <FcSearch className="buscar-icono" />
              </IconButton>
            </Tooltip>
          </Paper>
          <div className="cont__lista-tabla">
            <CollapsibleTable />
          </div>
        </div>
        <Modal filtro={filtro} setFiltro={setFiltro} />
      </div>
    </>
  );
};

export default Inventario;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginTop: "1%",
    background: "#16aca02a",
    maxWidth: "75%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: "20px",
  },
  iconButton: {
    padding: 7,
    background: "#0e7e4a28",
  },
  divider: {
    height: 26,
    margin: 2,
  },
}));
