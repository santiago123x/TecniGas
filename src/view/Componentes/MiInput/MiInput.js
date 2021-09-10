import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const MiInput = withStyles({
  root: {
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8.5px 14px ",
    },
    "& .MuiFormLabel-root": {
      color: "black",
    },
    "& legend": {
      float: 'inherit',
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    '& .MuiInputBase-input': {
      //backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderRadius: "4px",
      color: 'black',
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
  },
})(TextField);

export default MiInput;