import { makeStyles } from "@material-ui/core/styles";
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
