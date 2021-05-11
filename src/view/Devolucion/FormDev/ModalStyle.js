import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexWrap: "wrap",
    width: 400,
    backgroundColor: "rgb(114, 183, 230)",
    border: "2px solid 000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    margin: "20% 40%",
    top: "50%",
    left: "50%",
    transform: "traslate(-50%, -50%)",
  },
}));

export default useStyles;