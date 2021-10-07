import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
//Cambia el estilo de elementos de material-ui
const useStyles = makeStyles((theme) => ({
  select: {
    "& .MuiSelect-outlined": {
      padding: "0",
    },
    "& .MuiSelect-select": {
      backgroundColor: "gba(114, 183, 230, 0.295)",
      borderRadius: '4px',
      border: 'solid black 1px',
      paddingLeft: '10%',
      color: "black" ,
      height: "35px",
      width: "190px",
      fontSize: 15
    },
    "& .MuiSelect-selectMenu": {
      background: "#bbdeef",
    }
  },
  modal: {
    display: "flex",
    position: "absolute",
    width: "605px",
    height: "640px",
    backgroundColor: "rgb(72 147 210)",
    border: "solid 5px rgba(176, 196, 222, 0.699)",
    borderRadius: "23px",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "2%",
    left: "30%",
    transform: "traslate(-50%, -50%)",
  }

}));

const MiInput = withStyles({

  root: {
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8.5px 14px ",
    },
    "& .MuiFormLabel-root": {
      color: 'black',
    
    },
    "& legend": {
      float: 'inherit',
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    '& .MuiInputBase-input': {
      //backgroundColor: "rgba(255, 255, 255, 0.25)",
      backgroundColor: 'rgba(114, 183, 230, 0.295);',
      border: 'solid black 1px',
      fontSize: 15,
      paddingLeft: '10%',
      color: "black" ,
      
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "0",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "rgba(0, 0, 0, 0.6)",
      fontWeight: "bold",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "5px",
      
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0",
    },
    '& .MuiTypography-colorTextSecondary': {
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 'bold',
      
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      backgroundColor: 'rgb(72 147 210)',
      marginLeft: '10px',
    }
  }
})(TextField);

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },

  input: {
    width: '10.5vw',
    size: "small",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '4px',
    border: 'solid 1px #342e2e71',
    fontSize: 15,
    padding: '5px 26px 10px 12px',
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',         
    },
  },
}))(InputBase);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#5aacf8",
    },
    '& .MuiIconButton-root': {
      padding: '0%',
      margin: '0 10%'
    },
  },
}))(TableRow);

export {useStyles, MiInput, BootstrapInput, StyledTableCell, StyledTableRow};