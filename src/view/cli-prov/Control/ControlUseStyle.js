import { makeStyles } from "@material-ui/styles";
//Cambia el estilo de elementos de material-ui
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid 000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "traslate(-50%, -50%)",
  }, iconButton: {
    marginLeft: '0%',
    padding: 7,
    background: "#0e7e4a28",
    border: 'solid 2px rgba(11, 69, 134, 0.747)',
    borderRadius: '10px',
    color: '#eeecee'

  },
  modalEliminar: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid 000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "traslate(-50%, -50%)",
  },
  textfield: {
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8.5px ",
    },
    "& .MuiFormLabel-root": {
      Function: "disable",
    },
    "& .PrivateNotchedOutline-root-2": {
      top: "0px",
      borderRadius: "15px",
      borderColor: "black",
    },
    "& .MuiInputBase-input": {
      borderRadius: "15px",
      color: "black",
    },
    "& .MuiInputBase-root": {
      borderRadius: "15px",
    },
    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: "7px",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "12px",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      backgroundColor: "#bbdeef",
      color: "black",
    },
  },
  textfieldPerfil: {
    "& .MuiOutlinedInput-inputMarginDense": {
      height: "10px",
    },

    "& .MuiFormLabel-root": {
      Function: "disable",
    },
    "& .PrivateNotchedOutline-root-2": {
      top: "0px",
      borderRadius: "15px",
      borderColor: "black",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderRadius: "15px",
      color: "rgba(0, 0, 0, 0.76)",
    },
    "& .MuiInputBase-root": {
      borderRadius: "15px",
    },
    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: "7px",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "12px",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.76)",
      borderRadius: "15px",
      // backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
  },
  select: {
    "& .MuiSelect-outlined": {
      padding: "0",
    },
    "& .MuiSelect-select": {
      backgroundColor: "#bbdeef",
      height: "20px",
    },
    "& .MuiSelect-selectMenu": {
      background: "black",
    },
  },
}));

export default useStyles;
