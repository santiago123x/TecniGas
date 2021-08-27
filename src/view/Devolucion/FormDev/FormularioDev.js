import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MiInput from "../../Componentes/MiInput/MiInput";
import Button from "@material-ui/core/Button";
import useStyles from "./FormDevUseStyles";
import styleDev from "../styleDev.css";
import TablaDev from "./TablaDev";
import Select from "@material-ui/core/Select";
import useAxios from "../../Hooks/useAxios";
import { validaPro, getDetalleVen, getProdDeta } from "./validacionAxios";

const FormularioDev = ({}) => {

// Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState([{
      cod_factura: "",
      fecha_dev: "",
      id_producto: "",
      cantidad: "",
      nota: ""
      }]);
    
// Función de escucha que obtiene el valor de los campos de texto
      const handleInputChange = (event) => {
        setDatos({
          ...datos,
          [event.target.name]: event.target.value,
        });
      };

  

  //Realiza validaciones al enviar el formulario
  const { register, handleSubmit } = useForm();

  //Lista de id de ventas realizadas. Select01
   const listVent = useAxios("/venta");
   const venta = listVent.data;

  //Lista de productos de la venta. Select02
  let produList = {};
  const [pro, setPro] = useState ([]);

  //Componentes de la tabla
  const [comp, setComp] = useState([{
    cod_producto : "",
    nombre : "",
    categoria : "",
    cantidad : "",
    precio : ""
  }]);
      
  const classes = useStyles();

  const submitFa =  async (e) => {
    const idVenta = datos.cod_factura;
    const valida = await getDetalleVen(idVenta);
    console.log(valida);
      if (valida !== false)
      {
        produList = valida;
        setPro(valida);
        console.log(produList);
      } else {
        console.log("Error: valida == false");
      }
    
  };

  const subtMarca = async (e) => {
    const cod_venta = datos.cod_factura;
    console.log(cod_venta);
    const idPro = datos.id_producto;
    console.log(idPro);
    
      const producto = await validaPro(idPro);
      console.log(producto);
      console.log("viste a producto");
      const detapro = await getProdDeta(cod_venta, idPro);
        console.log(detapro);
        console.log("viste a detalle producto");
      if (producto !== false && producto !== ""){
        if (detapro !== false && detapro !== "") {
          const cuerpo = [{
            cod_producto : producto[0].codigo_pro,
            nombre : producto[0].nombre_pro,
            categoria : producto[0].nombre_catg,
            cantidad : datos.cantidad,
            precio : detapro[0].precio_ven
          }];
          setComp(cuerpo);
          console.log(cuerpo);
        } else {
          console.log("Error: detaPro !== true ");
        } 
      } else {
        console.log("Error: Producto == false o vacío");
      }
    
  };
  
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
                  name = "cod_factura"
                  variant = "outlined"
                  size = "small"
                  onChange = {handleInputChange}
                >
                  <option value={0}>Código Factura</option>
                  {venta.map((elemento) =>(
                    <option key={elemento.id_venta} value={elemento.id_venta}>{elemento.id_venta}</option>
                  ))}
                </Select>
                </div>
                <div className = "txt01">
                  <MiInput
                    variant = "outlined"
                    size = "small"
                    type = "date"
                    name = "fecha_dev"
                    label = "Fecha Devolución"
                    onChange = {handleInputChange}
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
                  type = "button"
                  onClick={() => submitFa()}
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
                  onChange = {handleInputChange}
                >
                  <option value={0}>ID Producto</option> 
                  {pro.map((elemento) =>(
                    <option key={elemento.producto_id} value={elemento.producto_id}>{elemento.producto_id}</option>
                  ))}
                  
                </Select>
              </div>
              <div className = "txt02">
                <MiInput 
                  variant = "outlined"
                  size = "small"
                  label = "Cantidad"
                  name = "cantidad"
                  onChange = {handleInputChange}
                />
              </div>
            </div>
            <div className = "content_three">
              <div className = "txt04">
                <MiInput 
                  variant = "outlined"
                  size = "small"
                  multiline
                  rows = {4}
                  label = "Nota De Devolución"
                  name = "nota"
                  onChange = {handleInputChange}
                />
              </div>
              <div className = "btn_marcar">
                <Button 
                  size = "medium"
                  variant ="contained"
                  color ="primary"
                  type = "button"
                  onClick={() => subtMarca()}
                >
                  Marcar Producto
                </Button>
              </div>
            </div>
            <div className = "table">
              <TablaDev
                detaPro = {comp}
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