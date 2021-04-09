import "./ventas.css";
import "./normalize.css";
import Button from '@material-ui/core/Button';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { lightBlue } from "@material-ui/core/colors";
import Select from '@material-ui/core/Select';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { FaUserPlus, FaCartPlus } from "react-icons/fa";
import DenseTable from "./tabla_ventas.js";
import useAxios from "../Hooks/useAxios";
import { id } from "date-fns/locale";
import { matchSorter } from "match-sorter";
import {
  MiFilter, BootstrapInput, MiSelect, MiInput2, MiInput, useStyles, MiFilter2
} from "./estilo_componentes/estilos"











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
  
  
  
  const [urlClientes, setUrlClientes] = useState(`/clientes/`);
  const dataClientes = useAxios(urlClientes);
  const [inputClientes, setInputClientes] = useState({cliente: "" , documento: "" });
  const filterOptionsClientes = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: ["nombre_pe", "identificacion"],
      threshold: matchSorter.rankings.CONTAINS,
    });




  return (
    <>

      <div className="principal-container">
        <div className="flex-container-superior">
          <form className="formsuperior">
            <div className="form__section">
              <Paper className={classes.root} >
              <MiFilter2
                id="cliente"
                style={{ width: 200 }}
                options={dataClientes.data}
                value={inputClientes.cliente}
                filterOptions={filterOptionsClientes}
                getOptionLabel={(option) => option ? option.identificacion + " - " + option.nombre_pe:''}
                onChange={(event, newValue) => {
                  //newValue !== null ?
                  if (newValue !== null) {
                    setInputClientes({cliente: newValue, documento: newValue.identificacion})                    
                    
                  }else{
                    setInputClientes({cliente: "", documento: ""})                    
                                      
                  }                                    
                }}
                renderInput={(params) => (
                  <MiInput2
                    {...params}
                    id="inputCliente"
                    label="Cliente"
                    variant="outlined"
                    size="small"
                    
                  //onChange={handleChangeDet('producto')}
                  />
                )}
              />
                <IconButton aria-label="menu" className={classes.iconButton}>
                  <FaUserPlus />
                </IconButton>
              </Paper>

              {/* <Button variant="contained" size="large" color="primary">Agregar</Button> */}
            </div>
            <div className="form__section">
              <MiInput
                label="Documento"
                disabled="true"
                value= {inputClientes.documento}
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
                rows={3}
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
                  if (newValue !== null) {
                    setInput(newValue);
                    setInput2([{ pre: newValue.precio_may, index: "Precio As: " },
                    { pre: newValue.precio_uni, index: "Precio Pu: " }])
                    console.log(newValue)
                  }else{
                    setInput2([])
                    setInput(null);
                  }                                    
                }}
                renderInput={(params) => (
                  <MiInput2
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
                  <MiInput2
                    {...params}
                    
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
