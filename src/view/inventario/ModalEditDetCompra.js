import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import React, {useState} from "react";
import { render } from "@testing-library/react";

export default function Modal({ modal, setModal, det , index }) {
  const dialog = useDialog();
  const [cantidad, setCantidad] = useState(det.cantidad);
  const [precio, setPrecio] = useState(det.precio);



  return (
    <>
      <Dialog
        //disableBackdropClick
        //disableEscapeKeyDown
        open={modal}
      >
        <DialogTitle className={dialog.scrollPaper}>{det.nombre_pro}</DialogTitle>
        <DialogContent className={dialog.scrollPaper}>
          <form className={dialog.formControl}>
            <TextField
              id="cantidad"
              label="Cantidad"
              size="small"
              type="number"
              value={cantidad}
              onChange={(evento) => {
                setCantidad(parseInt(evento.target.value))
              }}
            />
            <TextField
              id="precio"
              label="Precio"
              size="small"
              type="number"
              value={precio}
              onChange={(evento) => {
                setPrecio(parseInt(evento.target.value))
              }}
            />
          </form>
        </DialogContent>
        <DialogActions className={dialog.scrollPaper}>
          <Button onClick={() => setModal(!modal)} color="primary">
            Terminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useDialog = makeStyles((theme) => ({
  root: {
    
  },
  scrollPaper: {
    background: "#2965aa77",
    '& .MuiFormControl-root': {
      display: "block",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

