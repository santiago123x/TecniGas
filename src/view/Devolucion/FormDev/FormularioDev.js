import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MiInput from "../../Componentes/MiInput/MiInput";
import Button from "@material-ui/core/Button";
import useStyles from "../../cli-prov/Control/ControlUseStyle";
import styleDev from "../styleDev.css";
import Tablacompra from "../../inventario/Compra/Tablacompra";
import Select from "@material-ui/core/Select";

const FormularioDev = ({}) => {

// Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState([{
      nombre_pro: "",
      cantidad: "",
      precio: "",
      totalDet: ""
      }]);
    
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
        <form className = "miForm">
          <div className = "titulo">
            <h1> Devolución De Productos </h1>
            </div>
            <div className = "content_one">
              <div className = "txt01">
                <Select
                  native
                  className = {classes.select}
                  variant = "outlined"
                  size = "small"
                  label = "Código Factura"
                />
                </div>
                <div className = "btn_save">
                <Button 
                  size = "large"
                  variant ="contained"
                  color ="primary"
                  type = "submit"
                >
                  Buscar
                </Button>
                </div>
            </div>
            <div className = "line"> 
              <hr className = "lineTop"/>
            </div>
            <div className = "content_two">
              <div className = "txt02">
                <MiInput
                  variant = "outlined"
                  size = "small"
                  label = "ID Producto"
                />
              </div>
              <div className = "txt03">
                <MiInput 
                  variant = "outlined"
                  size = "small"
                  label = "Cantidad"
                />
              </div>
            </div>
            <div className = "content_three">
              <div className = "txt04">
                <MiInput 
                  variant = "outlined"
                  size = "small"
                  multiline
                  rows={4}
                  label = "Nota De Devolución"
                />
              </div>
              <div className = "btn_marcar">
                <Button 
                  size = "medium"
                  variant ="contained"
                  color ="primary"
                  type = "submit"
                >
                  Marcar Producto
                </Button>
              </div>
            </div>
            <div className = "table">
              <Tablacompra
                compraDet = {datos}
                setCompraDet = {setDatos}
              />
            </div>
            <div className = "btn_devolver">
              <Button
              size = "medium"
              variant ="contained"
              color ="primary"
              type = "submit"
              >
                Devolver Productos
              </Button>
            </div> 
        </form>
      </div>
  );

    return (
        <>
          {body}
        </>
    );
};
export default FormularioDev;