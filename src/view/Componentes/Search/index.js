import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { FcSearch, FcViewDetails } from "react-icons/fc";
import { makeStyles } from "@material-ui/styles";

const Search = ({ valueInp, setValueInp, titulo, tooltip }) => {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
      <Tooltip title={tooltip} placement="top">
        <IconButton className={classes.iconButton} aria-label="menu">
          <FcViewDetails />
        </IconButton>
      </Tooltip>

      <InputBase
        className={classes.input}
        placeholder={titulo}
        inputProps={{ "aria-label": "Filtrar Productos" }}
        value={valueInp}
        onChange={(e) => {
          setValueInp(e.target.value);
        }}
      />

      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
        disabled
      >
        <FcSearch className="buscar-icono" />
      </IconButton>
    </Paper>
  );
};

export default Search;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    background: "#16aca02a",
    maxWidth: "75%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: "20px",
  },
  iconButton: {
    padding: 7,
    background: "#0e7e4a28",
  },
  divider: {
    height: 26,
    margin: 2,
  },
}));
