import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as yup from 'yup';
import  {yupResolver} from '@hookform/resolvers/yup';
import { setLocale } from 'yup';
import useStyles from "../../cli-prov/Control/ControlUseStyle";
import styleDev from "../styleDev.css";

const FormularioDev = ({}) => {

// Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState({
        nombre: "",
        identificacion: "",
        correo: "",
        direccion: "",
        telefono: "",
      });
    
// Función de escucha que obtiene el valor de los campos de texto
      const handleInputChange = (event) => {
        setDatos({
          ...datos,
          [event.target.name]: event.target.value,
        });
      };


  const classes = useStyles();
  
  //Formulario del modal
  const body = (
      <div className = "containerPrin">
        <form>
          <div className = "titulo">
            <h1> Devolución De Productos </h1>
            </div>
            <div className = "content_one">
              <div className = "txt01">
                <TextField 
                  className={classes.textfieldDev}
                  variant="outlined"
                  size="small"
                  label = "Código Factura"
                />
                </div>
                <div className = "btn_save">
                <Button 
                  size = "small"
                  variant="contained"
                  color="primary"
                  type = "submit"
                >
                  Buscar
                </Button>
                </div>
            </div>
            <div className="line"> 
              <hr className="lineTop"/>
            </div>
        </form>
      </div>
  );

    return (
        <div>
          {body}
        </div>
    );
};
export default FormularioDev;