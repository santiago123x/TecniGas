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
import { FaUserPlus } from "react-icons/fa";
import { normalizeUnits } from "moment";

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
    marginLeft:'2px',
    padding: 7,
    background: "#0e7e4a28",
    border: 'solid 2px rgba(11, 69, 134, 0.747)'
  
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
    width: '8vw',
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





const Ventas = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [date, changeDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const classes = useStyles();




  return (
    <>

      <div className="principal-container">
        <div className="flex-container-superior">
          <form className="form">
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
                  <FaUserPlus/>
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
              <TextField
                id="outlined-textarea"
                label="Nota"
                placeholder="Digite su Nota o detalle de Venta"
                rows={2}
                multiline
                variant="outlined"
              />

            </div>
          </form>
        </div>
        <div className="flex-container-intermedio">

        </div>
        <div className="flex-container-tabla">

        </div>
        <div className="flex-container-derecho">
          <div className="flex-container-derecho__form">

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
