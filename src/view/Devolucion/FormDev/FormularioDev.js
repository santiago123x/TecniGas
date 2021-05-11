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
import { notify } from "../../Componentes/notify/Notify";
import { ToastContainer } from "react-toastify";

const feDa = new Date();
const fechaAct = new Date(
  feDa.getDate(),
  feDa.getMonth(),
  feDa.getFullYear(),
);

const FormularioDev = ({}) => {

// Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState({
      cod_factura: 0,
      fecha_dev: fechaAct.toISOString().substr(0, 10),
      codigo_pro: 0,
      cantidad: "",
      nota: ""
      });
    
// Función de escucha que obtiene el valor de los campos de texto
      const handleInputChange = (event) => {
        setDatos({
          ...datos,
          [event.target.name]: event.target.value,
        });
      };

  

  //Realiza validaciones al enviar el formulario
  const { register, handleSubmit } = useForm();

  //Estado de errores
  const [errores, setErrores] = useState({
    selCodFactura : false,
    fecha: false,
    selCodPro: false,
    cantidad: false
  });    

  //Lista de id de ventas realizadas. Select01
   const listVent = useAxios("/venta");
   const venta = listVent.data;

  //Lista de productos de la venta. Select02
  const [pro, setPro] = useState ([]);

  //Detalles de la venta
  const [detaVen, setDetaVen] = useState([]);

  //Componentes de la tabla
  const [detaPro, setDetaPro] = useState([]);
  
  //Mensajes para el usuario
  const busca = "¡Ya puedes seleccionar un producto!";
  const error_cant = "La cantidad máxima para devolver de este producto es de: ";
  const error_list = "!Solo puedes elegir el mismo producto una vez!";
  const error_gral = "¡Ha ocurrido un error! Por favor recarga la página";
  let type = "";

  const classes = useStyles();

  const validaFecha = () => {
    const año = fechaAct.getFullYear();
    const mes = fechaAct.getMonth() + 1;
    const dia = fechaAct.getDate();
    const fechaV = año + "-" + mes + "-" + dia;
    if(datos.fecha_dev > fechaV) {
      return false;
    } else {
      return true;
    }
  }; 

  const submitFa =  async (e) => {
    e.preventDefault();
    if (datos.cod_factura === 0 && (!validaFecha())){
       setErrores({
        ...errores,
        selCodFactura : true,
        fecha: true
      });
    } else if (datos.cod_factura === 0 || (!validaFecha())){
      if(datos.cod_factura === 0){
        setErrores({
          ...errores,
          selCodFactura : true
        });
      } else if (!validaFecha()) {
        setErrores({
          ...errores,
          fecha: true
        });
      }
  } else {
        setErrores({
          ...errores,
          selCodFactura : false,
          fecha: false
        });
        
        const idVenta = datos.cod_factura;
        pro.length = 0;
        const valida = await getDetalleVen(idVenta);
          if (valida)
          {
            valida.forEach(async (element) => {
              const producto = await validaPro(element.producto_id);
              setPro([
                ...pro,
              producto[0]]);
            });
            setDetaVen([valida[0]]);
            type = "info";
            notify(busca, "", type); 
          } else {
           type = "error";
           notify(error_gral, "", type);
          }
      }
  };

  const subtMarca = async (e) => {
      const cod_venta = datos.cod_factura;
      let idPro = {};
      let producto = {};
      let res = false;
      let detap = {};
    if (datos.codigo_pro === 0 && (datos.cantidad === "" || datos.cantidad <= 0)){
      setErrores({
       ...errores,
       selCodPro : true,
       cantidad : true
     });
    } else if (datos.codigo_pro === 0){
      setErrores({
        ...errores,
        selCodPro : true
      });
    } else if (datos.cantidad === "" || datos.cantidad <= 0){
      setErrores({
        ...errores,
        cantidad : true
      });
    } else if (detaPro.length !== 0) {
          detaPro.forEach((element) => {
            if(element.cod_producto == datos.codigo_pro)
            {
              type = "error";
            notify(error_list, "", type);
            }
          });
    } else { 
      setErrores({
        ...errores,
        selCodPro : false,
        cantidad : false
      });
      while(res === false){
        pro.forEach((element) => {
          if (element.cod_producto === datos.cod_producto){
            idPro = element.producto_id;
            producto = [element];
            res = true;
          }
        });
      };

      if (detaPro.length === 0) {
        detap = await getProdDeta(cod_venta, idPro);
      } 
      
        if (producto !== false && producto !== ""){
          if (detap !== false && detap !== "") {
            if (datos.cantidad > detaVen[0].cantidad_ven){
              type = "error";
              notify(error_cant,  detaVen[0].cantidad_ven, type);
            } else {
              const cuerpo = {
                cod_producto : producto[0].codigo_pro,
                nombre_pro : producto[0].nombre_pro,
                categoria : producto[0].nombre_catg,
                cantidad : datos.cantidad,
                precio : detap[0].precio_ven
              };
              setDetaPro([
                ...detaPro,
                cuerpo]);
              }
          } else {
            type = "error";
            notify(error_gral, "", type);
          } 
        } else {
          type = "error";
          notify(error_gral, "", type);
        }
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
                  value = {datos.cod_factura}
                >
                  <option value={0}>Código Factura</option>
                  {venta.map((elemento) =>(
                    <option key={elemento.id_venta} value={elemento.id_venta}>{elemento.id_venta}</option>
                  ))}
                </Select>
                {errores && errores.selCodFactura && 
                <span className="span text-danger text-small d-block">
                  Seleccione un código de factura
                </span>
                }
                </div>
                <div className = "txt01">
                  <MiInput
                    variant = "outlined"
                    size = "small"
                    type = "date"
                    name = "fecha_dev"
                    label = "Fecha Devolución"
                    value = {datos.fecha_dev}
                    onChange = {handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                </MiInput>
                {errores && errores.fecha && 
                <span className="span text-danger text-small d-block">
                Ingrese la fecha actual o anterior
                </span>}   
                </div>
                <div className = "btn_save">
                <Button 
                  size = "large"
                  variant ="contained"
                  color ="primary"
                  type = "button"
                  onClick={(e) => submitFa(e)}
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
                  name = "codigo_pro"
                  variant = "outlined"
                  size = "small"
                  value = {datos.codigo_pro}
                  onChange = {handleInputChange}
                >
                  <option value={0}>Producto</option> 
                  {pro.map((elemento, index) =>(
                    <option key={index} value={elemento.codigo_pro}>{`${elemento.codigo_pro} - ${elemento.nombre_pro}`}</option>
                  ))}
                </Select>
                {errores && errores.selCodPro && 
                <span className="span text-danger text-small d-block">
                  Seleccione una opción
                </span>
                }
              </div>
              <div className = "txt02">
                <MiInput 
                  variant = "outlined"
                  size = "small"
                  label = "Cantidad"
                  name = "cantidad"
                  type = "number"
                  onChange = {handleInputChange}
                />
                {errores && errores.cantidad && 
                datos.cantidad === ""?
                <span className="span text-danger text-small d-block">
                  Campo obligatorio.
                </span>
                : errores && errores.cantidad && datos.cantidad <= 0 && 
                <span className="span text-danger text-small d-block">
                  Ingrese números mayores que cero.
                </span>
                }
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
                detaPro = {detaPro}
                setDetaPro = {setDetaPro}
                detaVen = {detaVen}
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
          <ToastContainer />
        </>
    );
};
export default FormularioDev;