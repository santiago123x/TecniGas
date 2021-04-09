import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import "./Compra.css";
import Tablacompra from "./Tablacompra"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import useAxios from "../../Hooks/useAxios";
import Autocomplete from '@material-ui/lab/Autocomplete';
import moneda from '../../utilidades/moneda';
import { matchSorter } from 'match-sorter';
import axios from "axios";
import { Alert } from "bootstrap";

const Compra = () => {
  const productos = useAxios(`/producto/`);
  const proveedores = useAxios(`/proveedor/`);
  const date = new Date();
  const fechaActu = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const [compraVacia, setCompraVacia] = useState(true);
  const [proveedor, setProveedor] = useState(null);
  const [fecha, setFecha] = useState(fechaActu.toISOString().substr(0, 10));
  const [observacion, setObservacion] = useState("");
  const [compraDet, setCompraDet] = useState([]);
  const [produ, setProdu] = useState(null);
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState();
  const [totalDet, setTotalDet] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);
  const [compra_id, setCompra_id] = useState(null);

  const calcularTotalDetalle = () => {
    setTotalDet(cantidad * precio);
  };

  const calcularTotalCompra = () => {
    let suma = 0;
    compraDet.map((det) => (suma = det.totalDet + suma));
    setTotalCompra(suma);
  };

  const verificaCompra = () => {
    if (compraDet.length > 0 && proveedor != null)
      setCompraVacia(false);
    else
      setCompraVacia(true);
  };

  useEffect(() => {
    calcularTotalDetalle();
  }, [precio, cantidad]);

  useEffect(() => {
    calcularTotalCompra();
    verificaCompra();
  }, [compraDet, proveedor]);

  const registrarDet = e => {
    e.preventDefault();
    const nuevoDet = {
      producto_id: produ.producto_id,
      nombre_pro: produ.nombre_pro,
      precio: precio,
      cantidad: cantidad,
      totalDet: totalDet,
    };
    const detalles = [...compraDet, nuevoDet];
    setCompraDet(detalles);
    setPrecio("");
    setCantidad("");
    setProdu(null);
  };

  const filterProduc = (options, { inputValue }) =>
    matchSorter(options, inputValue,
      {
        keys: ['nombre_pro', 'codigo_pro'],
        threshold: matchSorter.rankings.CONTAINS
      });

  const filterProvee = (options, { inputValue }) =>
    matchSorter(options, inputValue,
      {
        keys: ['nombre_pe', 'identificacion', 'apellido'],
        threshold: matchSorter.rankings.CONTAINS
      });

  const guardarCompra = async () => {
    const body = {
      id_usuario: 2,
      fecha_ent: fecha,
      coment_cpra: observacion,
      total_gral: totalCompra,
      proveedor_id: proveedor.id_clipro,
    };
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/compra/",
      data: body,
    });
    if (response.status === 200) {
      setCompra_id(response.data[0].compra_id);
      guardarDetalles();
    } else
      alert("Ha susedido un problema intente mas tarde")
  };

  const guardarDetalles = () => {
    let nuevoBodyDet;
    compraDet.map(async det => {
      nuevoBodyDet = {
        producto_id: det.producto_id,
        cantidad_pd: det.cantidad,
        precio_cpra: det.precio,
        total_pd: det.totalDet,
        compra_id: compra_id,
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/compraDet/",
        data: nuevoBodyDet,
      });
    })
  }
 
  const guardar = () => {
    guardarCompra();
  }

  return (
    <div className="conten-compras" id="compra">
      <div className="formularios">
        <div className="conten-form info">
          <form className="form" id="form-info">
            <MiFilter
              id="proveedor"
              style={{ width: 200 }}
              options={proveedores.data}
              value={proveedor}
              filterOptions={filterProvee}
              getOptionLabel={option => `${option.nombre_pe} ${option.apellido}`}
              onChange={(event, newValue) => {
                setProveedor(newValue)
              }}
              renderInput={params => (
                <MiInput
                  {...params}
                  id="inputproveedor"
                  label="Proveedor"
                  variant="outlined"
                  size="small"
                />)
              }
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
          </form>
        </div>

        <div className="conten-form produ">
          <form className="form" id="form-produc" onSubmit={(e) => registrarDet(e)}>
            <MiFilter
              id="producto"
              style={{ width: 200 }}
              options={productos.data}
              value={produ}
              filterOptions={filterProduc}
              getOptionLabel={option => option.nombre_pro}
              onChange={(event, newValue) => {
                setProdu(newValue)
              }}
              renderInput={(params) => (
                <MiInput
                  {...params}
                  id="inputproduc"
                  label="Producto"
                  variant="outlined"
                  size="small"
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
            <MiButton variant="contained" color="primary" type="submit" /*onClick={() => { registrarDet() }}*/>
              Agregar
            </MiButton>
          </form>
        </div>
      </div>

      <div className="conten-tabla">
        <Tablacompra compraDet={compraDet} setCompraDet={setCompraDet} />
      </div>

      <div className="conten-button-compra">
        <MiButton variant="contained" color="primary" disabled={compraVacia} onClick={() => { guardar() }} >
          Terminar Compra
        </MiButton>
      </div>
    </div>
  );
};

export default Compra;

const MiButton = withStyles((theme) => ({
  root: {
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
    '& .MuiInputBase-input': {
      backgroundColor: "rgba(255, 255, 255, 0.25);",
      borderRadius: "4px",
      color: 'black',
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
    '& .PrivateNotchedOutline-root-3': {
      top: "0%",
    },
  },
})(TextField);

const MiFilter = withStyles({
  root: {
    '& .MuiFormControl-fullWidth': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: '4px',
    },
    '& .MuiInputBase-input': {
      backgroundColor: 'rgba(0, 0, 0, 0);',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input': {
      padding: '2.5px',
    }
  },
})(Autocomplete);
