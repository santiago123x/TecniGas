import React, { useEffect, useState, useLayoutEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./Compra.css";
import Tablacompra from "./Tablacompra";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import useAxios from "../../Hooks/useAxios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moneda from "../../utilidades/moneda";
import { matchSorter } from "match-sorter";

const Compra = () => {
  const productos = useAxios(`/producto/`);

  const datap = [
    {
      producto_id: 1,
      id_categoria: 1,
      nombre_pro: "Martillo",
      precio_uni: 7000,
      precio_may: 580,
      codigo_pro: 101,
    },
    {
      producto_id: 2,
      id_categoria: 2,
      nombre_pro: "Estufa de Gas",
      precio_uni: 60000,
      precio_may: 5000,
      codigo_pro: 201,
    },
  ];

  const [compraVacia, setCompraVacia] = useState(true);
  const [proveedor, setProveedor] = useState();
  const [fecha, setFecha] = useState();
  const [observacion, setObservacion] = useState();
  const [compraDet, setCompraDet] = useState([]);
  const [produ, setProdu] = useState(null);
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState();
  const [totalDet, setTotalDet] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  const calcularTotalDetalle = () => {
    setTotalDet(cantidad * precio);
  };

  const calcularTotalCompra = () => {
    let suma = 0;
    compraDet.map((det) => (suma = det.totalDet + suma));
    setTotalCompra(suma);
  };

  const verificaCompra = () => {
    if (compraDet.length > 0) setCompraVacia(false);
    else setCompraVacia(true);
  };

  useEffect(() => {
    calcularTotalDetalle();
  }, [precio, cantidad]);

  useEffect(() => {
    calcularTotalCompra();
    verificaCompra();
  }, [compraDet]);

  const registrarDet = () => {
    const nuevoDet = {
      producto_id: produ.producto_id,
      nombre_pro: produ.nombre_pro,
      precio: precio,
      cantidad: cantidad,
      totalDet: totalDet,
    };
    const detalles = [...compraDet, nuevoDet];
    setCompraDet(detalles);
    setCantidad("");
    setPrecio("");
    setProdu(null);
  };

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: ["nombre_pro", "codigo_pro"],
      threshold: matchSorter.rankings.CONTAINS,
    });

  return (
    <div className="conten-compras">
      <div className="formularios">
        <div className="conten-form info">
          <form className="form" id="form-info">
            <MiInput
              id="proveedor"
              label="Provedor"
              variant="outlined"
              size="small"
            />
            <MiInput
              id="total"
              label="Total"
              variant="outlined"
              size="small"
              disabled
              value={moneda(totalCompra)}
            />
            <MiInput
              id="date"
              label="Fecha"
              type="date"
              value={fecha}
              defaultValue={new Date().toLocaleDateString()}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
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
            />
          </form>
        </div>
        <div className="conten-form produ">
          <form className="form" id="form-produc">
            <MiFilter
              id="producto"
              style={{ width: 200 }}
              options={productos.data}
              value={produ}
              filterOptions={filterOptions}
              getOptionLabel={(option) => option.nombre_pro}
              onChange={(event, newValue) => {
                //newValue !== null ?
                setProdu(newValue); //:
                //setProdu(null)
              }}
              renderInput={(params) => (
                <MiInput
                  {...params}
                  id="inputproduc"
                  label="Producto"
                  variant="outlined"
                  size="small"
                  //onChange={handleChangeDet('producto')}
                />
              )}
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
            />
            <MiInput
              id="precio"
              label="Precio"
              variant="outlined"
              size="small"
              type="number"
              value={precio}
              onChange={(evento) => {
                setPrecio(parseInt(evento.target.value));
              }}
            />
            <MiButton
              variant="contained"
              color="primary"
              onClick={() => {
                registrarDet();
              }}
            >
              Agregar
            </MiButton>
          </form>
        </div>
      </div>

      <div className="conten-tabla">
        <Tablacompra compraDet={compraDet} setCompraDet={setCompraDet} />
      </div>
      <div className="conten-button-compra">
        <MiButton variant="contained" color="primary" disabled={compraVacia}>
          Terminar Compra
        </MiButton>
      </div>
    </div>
  );
};

export default Compra;

const MiButton = withStyles((theme) => ({
  root: {
    /*color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },*/
    height: "30px",
  },
}))(Button);

const MiInput = withStyles({
  root: {
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8.5px ",
    },
    "& .MuiFormLabel-root": {
      color: "black",
    },
    "& .PrivateNotchedOutline-root-2": {
      top: "0px",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "rgba(114, 183, 230, 0.295);",
      borderRadius: "4px",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "0px",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "rgba(0, 0, 0, 0.6)",
      fontWeight: "bold",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      backgroundColor: "rgb(72 147 210)",
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0%",
    },
  },
})(TextField);

const MiFilter = withStyles({
  root: {
    "& .MuiAutocomplete-hasPopupIcon": {
      padding: "4px",
    },
    "& .MuiAutocomplete-hasClearIcon": {
      padding: "4px",
    },
  },
})(Autocomplete);

/*
class="MuiInputBase-root MuiOutlinedInput-root MuiAutocomplete-inputRoot 
MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd 
MuiOutlinedInput-adornedEnd MuiInputBase-marginDense MuiOutlinedInput-marginDense"

*/
