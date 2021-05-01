import { makeStyles } from "@material-ui/styles";
//Cambia el estilo de elementos de material-ui
const useStyles = makeStyles((theme) => ({
  select: {
    "& .MuiSelect-outlined": {
      padding: "0",
    },
    "& .MuiSelect-select": {
      backgroundColor: "rgb(72 147 210)",
      height: "35px",
      width: "150px"
    },
    "& .MuiSelect-selectMenu": {
      background: "#bbdeef",
    },
  },
}));

export default useStyles;