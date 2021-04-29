import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MiInput from "../../Componentes/MiInput/MiInput";
import Button from "@material-ui/core/Button";
import useStyles from "./FormDevUseStyles";
import styleDev from "../styleDev.css";
import Tablacompra from "../../inventario/Compra/Tablacompra";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const FormularioDev = ({}) => {

// Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState([{
      cod_factura: "",
      nombre_pro: "",
      cantidad: "",
      precio: "",
      totalDet: "",
      }]);
    
// Función de escucha que obtiene el valor de los campos de texto
      const handleInputChange = (event) => {
        setDatos({
          ...datos,
          [event.target.name]: event.target.value,
        });
      };

  //Por la inexistencia de una venta, select de persona_id    
  const personaId = useAxios("/persona");
  const persona = personaId.data;

  //Lo que debe de ir en el select01
  // const venta = useAxios("/venta");
  // const venta_id = venta.data;
      
  const classes = useStyles();
  
  //Formulario del modal
  const body = (
      <div className = "containerPrin">
        <form className = "miForm">
          <div className = "titulo">
            <h1> Devolución De Productos </h1>
            </div>
            <div className = "content_one">
              <div className = "select01">
                <Select
                  native
                  className = {classes.select}
                  name = "venta_id"
                  variant = "outlined"
                  size = "small"
                  inputLabelProps={{
                    shrink: true,
                  }}
                >
                  <option value={0}>Código Factura</option>
                  {persona.map((elemento) =>(
                    <option key={elemento.persona_id} value={elemento.persona_id}>{elemento.persona_id}</option>
                  ))}
                </Select>
                </div>
                <div className = "txt01">
                  <MiInput
                    variant = "outlined"
                    size = "small"
                    type = "date"
                    name = "fecha_dev"
                    label = "Fecha de Devolución"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
            <div className = "select02">
                <Select
                  native
                  className = {classes.select}
                  name = "id_producto"
                  variant = "outlined"
                  size = "small"
                  helperText = "Id Producto"
                >
                  <option value={0}>ID Producto</option>
                  {persona.map((elemento) =>(
                    <option key={elemento.persona_id} value={elemento.persona_id}>{elemento.persona_id}</option>
                  ))}
                </Select>
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