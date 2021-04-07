import "./ventas.css";
import "./normalize.css";
import Button from '@material-ui/core/Button';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { lightBlue } from "@material-ui/core/colors";
import Select from '@material-ui/core/Select';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { FaUserPlus, FaCartPlus } from "react-icons/fa";
import DenseTable from "./tabla_ventas.js";
import useAxios from "../Hooks/useAxios";
import { id } from "date-fns/locale";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { matchSorter } from "match-sorter";







const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 4px",
    display: "flex",
    alignItems: "center",

    marginTop: "1%",
    background: "rgba(40, 176, 255, 0)",
    boxShadow: 'none'

  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,

  },
  iconButton: {
    marginLeft: '4px',
    padding: 7,
    background: "#0e7e4a28",
    border: 'solid 2px rgba(11, 69, 134, 0.747)',
    borderRadius: '10px',
    color: '#eeecee'

  },
  divider: {
    height: 26,
    margin: 2,
  },
}));

const MiInput = withStyles({
  root: {
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: '8.5px ',
    },
    '& .MuiFormLabel-root': {
      color: 'black',
      marginLeft: '10px',
      padding: '2%'

    },
    '& .PrivateNotchedOutline-root-2': {
      top: '0px',
    },
    '& .MuiInputBase-input': {
      backgroundColor: 'rgba(114, 183, 230, 0.295);',
      borderRadius: '4px',
      height: '3vh',
      width: '10vw',
      border: 'solid black 1px',


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
      marginLeft: '10px'
    }
  },
})(TextField);


const MiSelect = withStyles({
  root: {
    '.MuiSelect-select': {
      backgroundColor: 'rgba(114, 183, 230, 0.295);',
      borderRadius: '4px',
      width: '100px',

    },

  },
})(Select);

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: '12vw',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'rgba(114, 183, 230, 0.295)',
    borderRadius: '4px',
    border: 'solid 1px black',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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





const Ventas = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [date, changeDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const classes = useStyles();
  const tabla = DenseTable();


  const [url, setUrl] = useState(`/producto/`);
  const data = useAxios(url);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState([]);
  console.log(input2)
  const [precioSel, setPrecioSel] = useState("");
  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: ["nombre_pro", "codigo_pro"],
      threshold: matchSorter.rankings.CONTAINS,
    });





  return (
    <>

      <div className="principal-container">
        <div className="flex-container-superior">
          <form className="formsuperior">
            <div className="form__section">
              <Paper className={classes.root}>
                <Select
                  defaultValue={0}
                  input={<BootstrapInput />}
                >
                  <MenuItem default value={0} >Cliente</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <IconButton aria-label="menu" className={classes.iconButton}>
                  <FaUserPlus />
                </IconButton>
              </Paper>

              {/* <Button variant="contained" size="large" color="primary">Agregar</Button> */}
            </div>
            <div className="form__section">
              <MiInput
                label="Documento"
              />
            </div>
            <div className="form__section">
              <MiInput
                label="Nro venta"
              />
            </div>

            <div className="form__section">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="Fecha de Venta"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                />
              </MuiPickersUtilsProvider>
            </div>

            <div className="form__section">
              <Select
                defaultValue={0}
                input={<BootstrapInput />}
              >
                <MenuItem value={0} >Forma de pago</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

            </div>
            <div className="form__section">
              <Select
                defaultValue={0}
                input={<BootstrapInput />}
              >
                <MenuItem default value={0} >Estado</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

            </div>
            <div className="form__section">
              <BootstrapInput
                label="Nota"
                placeholder="Digite su Nota"
                rows={2}
                multiline />


            </div>
          </form>
        </div>
        <div className="flex-container-intermedio">
          <form className="formintermedio">
            <div className="form__section">
              <MiFilter
                id="producto"
                style={{ width: 200 }}
                options={data.data}
                value={input}
                filterOptions={filterOptions}
                getOptionLabel={(option) => option ? option.codigo_pro + " - " + option.nombre_pro :''}
                onChange={(event, newValue) => {
                  //newValue !== null ?
                  setInput(newValue);
                  newValue !== null ?
                    setInput2([{ pre: newValue.precio_may, index: "Precio As: " },
                    { pre: newValue.precio_uni, index: "Precio Pu: " }]) :
                    setInput2(null)
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


              {/* <Paper className={classes.root}>
                <input value={input} onChange={(e)=>{
                  setInput(e.target.value)
                                    
                }} list="select-producto" name="select" className="select__copia"></input>
                
                <datalist className="select__datalist" id="select-producto">
                  {data.data.map((dat,index)=>{
                    return (<option id={dat.codigo_pro} key={index}>{dat.codigo_pro} - {dat.nombre_pro} </option>)
                  })
                  }
                </datalist>
                <button onClick={() => {
                  data.data.includes
                }} >holi</button>
                
                 <Select
                  defaultValue={0}
                  input={<BootstrapInput />}
                >
                  <MenuItem default value={0} >Producto</MenuItem>
                  {data.data.map((dat,index)=>{
                    return (<MenuItem value={dat.codigo_pro} key={index}>{dat.nombre_pro}</MenuItem>)
                  })
                  }
                  
                </Select> 
                <IconButton aria-label="menu" className={classes.iconButton}>
                  <FaCartPlus />
                </IconButton>
              </Paper> */}
            </div>
            <div className="form__section">
              <MiInput
                label="Cantidad"
              />
            </div>
            <div className="form__section">
              <MiFilter
                id="precio"
                style={{ width: 200 }}
                options={input2}
                value={precioSel}
                getOptionLabel={(option) => option ? `${option.pre}` : '' }

                onChange={(event, newValue) => {
                  setPrecioSel(newValue);
                }}
                renderOption= {(option) => (
                  <>
                    <span>{option.index}</span>
                    {option.pre}  </>
                )}
                renderInput={(params) => (
                  <MiInput
                    {...params}
                    disabled='true'
                    id="inputprec"
                    label="Precio"
                    variant="outlined"
                    size="small"
                  //onChange={handleChangeDet('producto')}
                  />
                )}
              />
            </div>
            <div className="form__section">
              <MiInput
                label="Descuento"
              />
            </div>
            <div className="form__section">
              <Button variant="contained" color="primary">
                Agregar
              </Button>
            </div>
          </form>

        </div>
        <div className="flex-container-tabla">
          <DenseTable />
        </div>
        <div className="flex-container-derecho">
          <div className="flex-container-derecho__form">

            <div className="form__section">
              <MiInput
                label="Total a Pagar"
              />
            </div>
            <div className="form__section">
              <MiInput
                label="Recibido"
              />
            </div>
            <div className="form__section">
              <MiInput
                label="Cambio"
              />
            </div>
            <div className="form__section">
              <Button variant="contained" color="primary">
                Realizar Pago
              </Button>
            </div>
          </div>
        </div>

      </div>




      {/* <div className="ventas-form" className={classes.root}>
        
        <TextField  id="outlined-basic" label="Cliente" variant="outlined" />
        <TextField  id="outlined-basic" label="Documento" variant="outlined" />
        <TextField  id="outlined-basic" label="Forma de Pago" variant="outlined" />        
               
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="Basic example"
            value={selectedDate}
            onChange={handleDateChange}
            animateYearScrolling
          />
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary">
          :D
        </Button>

        
      </div> */}
    </>
  );
};

export default Ventas;
