import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MiInput from "../../Componentes/MiInput/MiInput";
import Button from "@material-ui/core/Button";
import useStyles from "./FormDevUseStyles";
import styleDev from "../styleDev.css";
import TablaDev from "./TablaDev";
import Select from "@material-ui/core/Select";
import useAxios from "../../Hooks/useAxios";
import { notify } from "../../Componentes/notify/Notify";
import { ToastContainer } from "react-toastify";
import { 
    validaPro,
    getDetalleVen,
    getCategoria,
    getProdDeta,
    putDetaVent,
    putVenta,
    putProducto,
    devolucion,
    detalleDev} from "./validacionAxios";

const feDa = new Date();
const fechaAct = new Date(
  feDa.getFullYear(),
  feDa.getMonth(),
  feDa.getDate()
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
  const [pro, setPro] = useState([]);

  //Detalles de la venta
  const [detaVen, setDetaVen] = useState([]);

  //Componentes de la tabla
  const [detaPro, setDetaPro] = useState([]);

  
  //Mensajes para el usuario
  const busca = "¡Ya puedes seleccionar un producto!";
  const error_cant = "La cantidad máxima para devolver de este producto es de: ";
  const error_list = "!Solo puedes elegir el mismo producto una vez!";
  const error_gral = "¡Ha ocurrido un error! Por favor recarga la página";
  const error_val = "Rellena correctamente el formulario";
  const success = "¡Usted ha realizado una devolución exitosa!";
  let type = "";

  //let fecha_re = new Date();

  const classes = useStyles();
  var valida = [];

  //Validaciones del formulario

  /*const validaFechita = () => {
    const año = fechaAct.getFullYear();
    const mes = fechaAct.getMonth() + 1;
    const dia = fechaAct.getDate();
    const fechaV = año + '-' + mes + '-' + dia;
    //fecha_re = fechaV;
    console.log(fechaV)
    console.log(datos.fecha_dev);
    if(datos.fecha_dev > fechaV) {
      return 0;
    } else {
      return 1;
    }
  }; */

  const validaFecha = () => {
    var fecha_venta = new Date();
    var fec = new Date();
    for(var i = 0; i<venta.length ; i++){
      if (venta[i].id_venta == datos.cod_factura){
        fecha_venta = Date.parse(venta[i].fecha_ve);
        i = venta.length;
      }
    }
    
    const año = fechaAct.getFullYear();
    const mes = fechaAct.getMonth() + 1;
    const dia = fechaAct.getDate();
    const fechaV = año + '-' + mes + '-' + dia;
    //fecha_re = fechaV;
    fec = Date.parse(datos.fecha_dev);
    
    if(fec >= fecha_venta){
      return 1;
    } else {
      return 0;
    }
  };

  const validacionUno = () => {
    const fechita = validaFecha();
    if (datos.cod_factura == 0 && fechita == 0){
      setErrores({
       ...errores,
       selCodFactura : true,
       fecha: true
     });
     return 0;
   } else if (datos.cod_factura == 0 || fechita == 0){
     if(datos.cod_factura == 0){
       setErrores({
         ...errores,
         selCodFactura : true
       });
       return 0;
     } else if (fechita == 0) {
       setErrores({
         ...errores,
         fecha: true
       });
       return 0;
     }
 } else {
       setErrores({
         ...errores,
         selCodFactura : false,
         fecha: false
       });
      }
      return 1;
  };

  

  const submitFa =  async (e) => {
    e.preventDefault();
    pro.length = 0;
        detaPro.length = 0;
        setDatos({
          ...datos,
          codigo_pro : 0,
          cantidad : "",
          nota : ""
        });
    const valSelectU = validacionUno();
    if (valSelectU == 1){
        
        const idVenta = datos.cod_factura;
        valida = await getDetalleVen(idVenta);
          if (valida)
          {
            setPro(...pro, valida);
            type = "info";
            notify(busca, "", type)
          } else {
           type = "error";
           notify(error_gral, "", type);
          }
          
          setDetaVen(valida);
      }
  };

  const cuentaPro = () => {
    let conta_producto = 0;
    pro.forEach((elemento)=>{
      conta_producto = conta_producto + elemento.cantidad_ven;
    });
    return conta_producto;
  };

  const validacionDos = () => {
    if (datos.codigo_pro == 0 && (datos.cantidad == "" || datos.cantidad <= 0)){
      setErrores({
       ...errores,
       selCodPro : true,
       cantidad : true
     });
     return 0;
    } else if (datos.codigo_pro == 0){
      setErrores({
        ...errores,
        selCodPro : true
      });
      return 0;
    } else if(datos.cantidad == "" && datos.cantidad <= 0){
      setErrores({
        ...errores,
        cantidad : true
      });
      return 0;
    }else if (datos.cantidad == "" || datos.cantidad <= 0){
      setErrores({
        ...errores,
        cantidad : true
      });
      return 0;
    } else {
      return 1;
    }
  };

  const subtMarca = async (e) => {
    const valSelectD = validacionDos();
      const cod_venta = datos.cod_factura;
      let idPro = {};
      let producto = {};
      let detap = {};
     if(valSelectD == 1)  {
       console.log(detaVen);
      setDatos({
        ...datos,
        codigo_pro : 0,
        cantidad : "",
        nota : ""
      });
      var er = 0;
      if (detaPro.length !== 0){
        detaPro.forEach((element) => {
          if(element.cod_producto == datos.codigo_pro)
          {
             er = 1;
          }
        });
      } 
          if(er === 1)
            {
              type = "error";
              notify(error_list, "", type);
            } else {
              
              setErrores({
                ...errores,
                selCodPro : false,
                cantidad : false
              });
                let i = 0;
                for(i; i<pro.length ; i++){
                  if (pro[i].codigo_pro == datos.codigo_pro){
                    idPro = pro[i].producto_id;
                    producto = [pro[i]];
                    i = pro.length;
                  }
                };
              
                if (producto !== false && producto !== ""){
                  if (detap !== false && detap !== "") {
                      if (datos.cantidad > producto[0].cantidad_ven){
                        type = "error";
                        notify(error_cant,  producto[0].cantidad_ven, type);
                      } else {
                        const nomCat = await getCategoria(producto[0].id_categoria);
                        const cuerpo = {
                          cod_producto : producto[0].codigo_pro,
                          nombre_pro : producto[0].nombre_pro,
                          categoria : nomCat[0].nombre_catg,
                          cantidad : datos.cantidad,
                          precio : producto[0].precio_ven
                        };
                        setDetaPro([
                          ...detaPro,
                          cuerpo]);
                        };
                  } else {
                    type = "error";
                    notify(error_gral, "", type);
                  } 
                } else {
                  type = "error";
                  notify(error_gral, "", type);
                }
            }
          }
  };

  const submitDev = async () =>{
    let testDetaV = true;
    let cantidadPro = 0;
    let total_gral_d = 0;
    let bodyProducto = {};
    let bodyVenta = {};
    let bodyDevolucion = {};
    let bodyDetalle = {};
    let id_producto = {};
    let iva = 0;
    let editaPro = {};
    let detalle = {};
    let observacion_vta = "";
    let testDetalle = true;
    let cuentaProd = 0;
    let cuentaProdDev = 0;
    let tool = 0;
    const id_venta = datos.cod_factura;
      detaPro.forEach(async(element) => {
        pro.forEach((elemento) => {
        if(elemento.codigo_pro == element.cod_producto){
          id_producto = elemento.producto_id;
          
        }
        
      });
      cuentaProd = cuentaPro();
        bodyProducto = {
          cantidad_ven : element.cantidad,
          precio_ven : element.precio,
          total_ven : element.cantidad * element.precio
        };
        total_gral_d = total_gral_d + bodyProducto.total_ven;
        const putDetalleV = true;
        //await putDetaVent(id_venta, id_producto, bodyProducto);
        if(putDetalleV !== true){
          testDetaV = false;
          return;
        }
        cuentaProdDev = cuentaProdDev + parseInt(element.cantidad);
      });
      if(testDetaV){
        bodyDevolucion = {
          id_venta : id_venta,
          comentario_dev : datos.nota,
          fecha_dev : datos.fecha_dev,
          total_gral_d : total_gral_d 
        };
        const nuevaDevo = true;
        //await devolucion(id_venta, bodyDevolucion);
        if(nuevaDevo !== false && nuevaDevo !== ""){
          observacion_vta = "Se ha registrado una devolución con el identificador : " + nuevaDevo.devolucion_id;
          venta.forEach((element) =>{
            if(element.id_venta == id_venta){
              iva = element.total_iva / cuentaProd;
              tool = cuentaProd - cuentaProdDev;
              if (tool == 0){
                iva = iva * 1;
              } else {
                iva = iva * tool;
              }

              bodyVenta = {
                sub_total : element.sub_total - total_gral_d,
                total_ve : (element.sub_total - total_gral_d) + iva,
                observacion_vta : observacion_vta
              };
              return;
            }
          });
          const editaVenta = true;
          //await putVenta(id_venta, bodyVenta);
          if(editaVenta){
            id_producto = 0;
            detaPro.forEach(async (element) => {
              pro.forEach((elemento) => {
                if(elemento.codigo_pro == element.cod_producto){
                  id_producto = elemento.producto_id;
                  
                }
              });
              cantidadPro = element.cantidad;
              editaPro = true;
              //await putProducto(id_producto, cantidadPro);
              
            });
            if(editaPro){
              id_producto = 0;
              detaPro.forEach(async(element) =>{
                pro.forEach((elemento) => {
                  if(elemento.codigo_pro == element.cod_producto){
                    id_producto = elemento.producto_id;
                    
                  }
                });
                bodyDetalle = {
                  cantidad_det : element.cantidad,
                  precio_uni : element.precio,
                  precio_total : element.cantidad * element.precio
                };
                detalle = true;
                //await detalleDev(id_producto, bodyDetalle);
                if(detalle == false){
                  testDetalle = false; 
                  return;
                }
              });
  
              if(testDetalle){
                type = "info";
                notify(success, "", type);
                setDatos({
                  cod_factura: 0,
                  fecha_dev: fechaAct.toISOString().substr(0, 10),
                  codigo_pro: 0,
                  cantidad: "",
                  nota: ""
                });
                //window.location.reload();
              } else if(detalle == false) {
                type = "error";
                notify(error_gral, "", type);
              }
            } else if(detaPro == false){
              type = "error";
              notify(error_gral, "", type);
            }
          } else if(editaVenta == false){
            type = "error";
            notify(error_gral, "", type);
          }
        } else if(nuevaDevo == false){
          type = "error";
          notify(error_gral, "", type);
        }
      } else if (testDetaV == false){
        type = "error";
        notify(error_gral, "", type);
      }
  };
  
  //Formulario
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
                Ingrese fecha de venta o superior
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
                  id = "cantidad" 
                  variant = "outlined"
                  size = "small"
                  label = "Cantidad"
                  name = "cantidad"
                  type = "number"
                  value = {datos.cantidad}
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
                  value = {datos.nota}
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
                setPro = {setPro}
                setDatos = {setDatos}
                orden = "prod"
              />
            </div>
            <div className = "final_form">
            <div className = "btn_devolver">
              <Button
              size = "small"
              variant ="contained"
              color ="primary"
              type = "button"
              onClick={() => submitDev()}
              >
                Devolver Productos
              </Button>

            </div>
            <div className = "btn_listar">
              <Button
              size = "small"
              variant ="contained"
              color ="primary"
              type = "button"
              onClick={() => submitDev()}
              >
                Listar Devoluciones
              </Button>
            </div>
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