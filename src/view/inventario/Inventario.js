import { useState, useEffect } from "react";
import "./Inventario.css";
import CollapsibleTable from "./Componentes/Table/Table";
import Modal from "./Componentes/Modal/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { FcSearch, FcViewDetails } from "react-icons/fc";
import useAxios from "../Hooks/useAxios";

const Inventario = () => {
  const [filtro, setFiltro] = useState(false);
  const [valueInp, setValueInp] = useState("");
  const [valueSel, setValueSel] = useState(10);
  const [url, setUrl] = useState(`/producto/`);
  const [metodo, setMetodo] = useState("");
  const [body, setBody] = useState(null);
  const classes = useStyles();
  const { data, error, loading } = useAxios(url);

  const filtrar = () => {
    if (valueSel == 10 && valueInp !== "") {
      setUrl(`/producto/cod/${valueInp}`);
    } else if (valueSel == 20 && valueInp !== "") {
      setUrl(`/producto/nom/${valueInp}`);
    } else if (valueSel == 30 && valueInp !== "") {
      setUrl(`/producto/cat/${valueInp}`);
    }
  };
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
              inputProps={{ "aria-label": "Filtrar Productos" }}
              value={valueInp}
              onChange={(e) => {
                setValueInp(e.target.value);
              }}
            />
            <Tooltip title="Buscar" placement="top">
              <IconButton
                type="button"
                className={classes.iconButton}
                aria-label="search"
                onClick={() => {
                  valueInp === "" ? setUrl(`/producto/`) : filtrar();
                  console.log(valueInp);
                  console.log(valueSel);
                }}
              >
                <FcSearch className="buscar-icono" />
              </IconButton>
            </Tooltip>
          </Paper>

          <div className="cont__lista-tabla">
            {loading ? (
              <h2>Cargando ...</h2>
            ) : error ? (
              <h3>Error: {error}</h3>
            ) : (
              <CollapsibleTable data={data} />
            )}
          </div>
        </div>
        <Modal
          filtro={filtro}
          setFiltro={setFiltro}
          value={valueSel}
          setValue={setValueSel}
        />
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
