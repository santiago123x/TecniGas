import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Options from "./Options";
import FormLabel from "@material-ui/core/FormLabel";
import React from "react";

export default function Modal({ filtro, setFiltro, value, setValue, options }) {
  const dialog = useDialog();
  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={filtro}
        onClose={setFiltro}
      >
        <DialogTitle className={dialog.scrollPaper}>Filtro</DialogTitle>
        <DialogContent className={dialog.scrollPaper}>
          <form className={dialog.container}>
            <FormControl className={dialog.formControl}>
              <FormLabel component="legend">Tipo de Filtro</FormLabel>
              <RadioGroup
                aria-label="filtro"
                name="value"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  console.log(value);
                }}
              >
                {options.map((op, index) => {
                  return (
                    <Options
                      key={index}
                      values={op.value}
                      label={op.label}
                      value={value}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={dialog.scrollPaper}>
          <Button onClick={() => setFiltro(!filtro)} color="primary">
            Seleccionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useDialog = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  scrollPaper: {
    background: "#2965aa77",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

/*<Select
                native
                input={<Input id="demo-dialog-native" />}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  console.log(value);
                }}
              >
                <option
                  style={{ background: "#2965aa77" }}
                  aria-label="None"
                  value=""
                />
                <option style={{ background: "#2965aa77" }} value={10}>
                  Codigo del Producto
                </option>
                <option style={{ background: "#2965aa77" }} value={20}>
                  Nombre del Producto
                </option>
                <option style={{ background: "#2965aa77" }} value={30}>
                  Categoria
                </option>
              </Select>

              */
