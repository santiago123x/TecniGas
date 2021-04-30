import { makeStyles, withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: "0 4px",
      display: "flex",
      alignItems: "center",
  
      marginTop: "6%",
      background: "rgba(40, 176, 255, 0)",
      boxShadow: 'none',
      width: "20vw",
  
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
  
    },
    iconButton: {
      marginLeft: '0%',
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
        padding: '2%',
        
  
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
        paddingLeft: '10%',
        color: "black"       
  
  
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
  
  const MiInput2 = withStyles({
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
        backgroundColor: "rgba(255, 255, 255, 0.25)",
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
      fontSize: 16,
      padding: '5px 26px 10px 12px',
     
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
        backgroundColor: 'rgba(255, 255, 255, 0.25)',         
      },
    },
  }))(InputBase);
  
  const MiFilter2 = withStyles({
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
  
  // const MiFilter2 = withStyles({
  //   root: {
  //     "& .MuiAutocomplete-hasPopupIcon": {
  //       padding: "4px",
  //     },
  //     "& .MuiAutocomplete-hasClearIcon": {
  //       padding: "4px",
  //     },
  //     "& .MuiAutocomplete-inputRoot": {
  //       backgroundColor: "rgba(114, 183, 230, 0.295)",
  //       height: "5.5vh",
  //       width: "18vw"
       
  //       // border: "solid black 1px"
  //     },
  //     "& .MuiAutocomplete-tag": {
  //       border: "solid red 5px"
  //     }
  //   },
  // })(Autocomplete);

  export {
    BootstrapInput, MiInput2, MiInput, useStyles, MiFilter2
  }