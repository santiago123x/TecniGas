import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import "./Compra.css";
import Tablacompra from "./Tablacompra"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import InputAdornment from '@material-ui/core/InputAdornment';

const Compra = () => {

  const [compra, setCompra] = useState({
    producto_id: '',
    cantidad: '',
    precio: '',
    total: '',
  });

  const handleChange = (prop) => (event) => {
    setCompra({ ...compra, [prop]: event.target.value });
  };

  return (
    <div className="conten-compras">
      <div className="formularios">
        <div className="conten-form info">
          <form className="form" id="form-info">
            <MiInput id="proveedor" label="Provedor" variant="outlined" size="small" />
            <MiInput id="usuario" label="Usuario" variant="outlined" size="small" minlength="4" maxlength="8" />
            <MiInput id="total" label="Total" variant="outlined" size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }} />
            <MiInput id="date" label="Fecha" type="date" variant="outlined" size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <MiInput id="observacion" label="Observacion" multiline rowsMax={4} variant="outlined" size="small" />
          </form>
        </div>
        <div className="conten-form produ">
          <form className="form" id="form-produc">
            <MiInput id="produc" label="Producto" variant="outlined" size="small" onChange={handleChange()} />
            <MiInput id="cantid" label="Cantidad" variant="outlined" size="small" onChange={handleChange('cantidad')} />
            <MiInput id="precio" label="Precio" variant="outlined" size="small" onChange={handleChange('precio')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <MiButton variant="contained" color="primary">
              Agregar
          </MiButton>
          </form>
        </div>
      </div>

      <div className="conten-tabla">
        <Tablacompra />
      </div>
      <div className="conten-button-compra">
        <MiButton variant="contained" color="primary" >
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
    height: '30px',
  },
}))(Button);

const MiInput = withStyles({
  root: {
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: '8.5px ',
    },
    '& .MuiFormLabel-root': {
      color: 'black',
    },
    '& .PrivateNotchedOutline-root-2': {
      top: '0px',
    },
    '& .MuiInputBase-input': {
      backgroundColor: 'rgba(114, 183, 230, 0.295);',
      borderRadius: '4px'
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: '7px',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '0px',
    },
    '& .MuiTypography-colorTextSecondary': {
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      backgroundColor: 'rgb(72 147 210)',
    }
  },
})(TextField);

