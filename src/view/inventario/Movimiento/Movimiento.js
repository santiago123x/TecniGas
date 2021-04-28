import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from '@material-ui/core/';
import MiFilter from '../../Componentes/MiFilter/Mifilter';
import MiInput from '../../Componentes/MiInput/MiInput';
import useAxios from "../../Hooks/useAxios";
import "./Movimiento.css"

const Movimiento = () => {
  const productos = useAxios(`/producto/`);

  const date = new Date();
  const fechaActu = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const [fecha, setFecha] = useState(fechaActu.toISOString().substr(0, 10));
  const [observacion, setObservacion] = useState("");
  const [produ, setProdu] = useState(null);
  const [cantidad, setCantidad] = useState();
  const [tipo, setTipo] = useState("");
  const [modal, setModal] = useState(false);
  const classes = useStyles();

  const guardarMovi = (e) => {
    e.preventDefault();
    const nuevoMovi = {
      producto_id: produ.producto_id,
      cantidad: cantidad,
      tipo: tipo,
      fecha: fecha,
      observacion: observacion
    };

    setModal(!modal);
  }

  const optionLabelProduc = (opcion) => {
    return `${opcion.codigo_pro} - ${opcion.nombre_pro}`
  }

  const filtroProducto = ['nombre_pro', 'codigo_pro'];

  return (
    <>
      <div>
        <MiButton
          variant="contained"
          color="primary"
          onClick={() => setModal(true)} >
          Movimiento
        </MiButton>
        <div id="modal" />
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={modal}>
          <DialogTitle className={classes.scrollPaper}>
            Movimiento Producto
          </DialogTitle>
          <DialogContent className={classes.scrollPaper}>
            <form
              className="formularioMovi"
              id='formularioMovi'
              onSubmit={(e) => guardarMovi(e)}
            >
              <MiFilter
                id="producto"
                label="Producto"
                tamaño={250}
                data={productos.data}
                value={produ}
                optionesFiltro={filtroProducto}
                optionLabel={optionLabelProduc}
                setValue={setProdu}
              />
              <MiInput
                id="cantidad"
                label="Cantidad"
                variant="outlined"
                size="small"
                type="number"
                value={cantidad}
                onChange={(evento) => {
                  setCantidad(parseInt(evento.target.value));
                }}
                inputProps={{
                  min: 1,
                }}
                required
              />
              <MiInput
                id="date"
                label="Fecha"
                type="date"
                value={fecha}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evento) => {
                  setFecha(evento.target.value)
                }}
              />
              <MiInput
                id="observacion"
                label="Observacion"
                multiline
                rows={4}
                value={observacion}
                variant="outlined"
                size="small"
                onChange={(evento) => {
                  setObservacion(evento.target.value)
                }}
                inputProps={{
                  maxLength: 150
                }}
              />
              <DialogActions>
                <MiButton type="submit" color="primary">
                  Terminar
                </MiButton>
                <MiButton color="warning" onClick={() => setModal(false)}>
                  Cancelar
                </MiButton>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Movimiento;

const MiButton = withStyles((theme) => ({
  root: {
    height: "30px",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  scrollPaper: {
    background: "cornflowerblue",
  },
}));