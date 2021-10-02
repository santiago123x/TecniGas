import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Button from "@material-ui/core/Button";
import CollapsibleTable from "../Componentes/Table/Table";
import Loading from "../Componentes/Loading/Loading";
import Error404 from "../Componentes/Error/Error";
import Search from "../Componentes/Search";
import "./InformesStyle.css";

const Informes = () => {
  const auth = useAuth();
  const [informe, setInforme] = useState([]);
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/listaVpersona/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);

  const title = ["Código Factura", "Fecha Venta", "Subtotal", "Total", "Total Iva"];
  const titleDetails = ["Nombre Prod", "Código Producto", "Categoria", "Descuento", "Cantidad Vendida", "Precio Unitario" , "Total"];
  const detalleDos = ["Comprador", "Tipo", "Usuario Vendedor", "Recibido", "Cambio", "Observación", "Estado"];
  let datico = [{}];

  const formateaFecha = () => {
      let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
      datico.length = 0;
      let rowsTempo=[];
    for(let i = 0; i<data.length; i++){
      let fecha = new Date(data[i].fecha_ve)
      .toLocaleDateString('es',opciones)
      .replace(/ /g,'-')
      .replace('.','')
      .replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
         const body = {
          id_venta:data[i].id_venta,
          nombre_pe:data[i].nombre_pe,
          tipo_clpr:data[i].tipo_clpr,
          nombre_usr:data[i].nombre_usr,
          fecha_ve:fecha,
          sub_total:data[i].sub_total,
          total_ve:data[i].total_ve,
          recibido:data[i].recibido,
          cambio:data[i].cambio,
          estado_ve:data[i].estado_ve,
          total_iva:data[i].total_iva,
          observacion_vta:data[i].observacion_vta,
          nombre_pro:data[i].nombre_pro,
          codigo_pro:data[i].codigo_pro,
          nombre_catg:data[i].nombre_catg,
          descuento:data[i].descuento,
          cantidad_ven:data[i].cantidad_ven,
          precio_ven:data[i].precio_ven,
          total_ven:data[i].total_ven
         };
          rowsTempo.push(body);         
       };
       setInforme(rowsTempo);
  };
useEffect(()=>{
  if(data){
  formateaFecha();
  }
}, [data]);
  
/*const direcciona = () =>{
  window.location="/crea_devolucion";
};*/
  return (
      <div className = "contteiner2">
      <div className = "containerList2">
      <div className = "titulo_list2"><h1> Listado De Ventas</h1></div>
          <hr className="linea-h22" />
            <div className = "contSearch"> 
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Ventas"
              tooltip={`Tipos de Filtro:  Código Factura, Fecha Venta, Nombre Producto, Código Producto`}
            />
            </div>
              <div className="lista-tabla2">
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Error404
                    ancho={200}
                    error="Se ha producido un problema, recargue la página."
                  />
                ) : 
                    (
                  <CollapsibleTable
                    data={informe}
                    filtro={valueInp}
                    titulos={title}
                    titulosDetalles={titleDetails}
                    detallesDos={detalleDos}
                    tipo='info'
                    categoria='info'
                    recarga={recarga}
                    setRecarga={setRecarga}
                  />
                )}
            </div>
          </div>
      </div>
    );              
};

export default Informes;
/*
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import useAxios from "../../Hooks/useAxios";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import Search from "../../Componentes/Search";
import { useStyles } from "./FormDevUseStyles";
import "./informesStyle";
import useAuth from "../Hooks/useAuth";

const Informes = () => {
  const auth = useAuth();
  const [info, setInfo] = useState([]);
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/listaVpersona/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);

  const title = ["Código Factura", "Atendido A", "Tipo", "Usuario", "Fecha Venta", "Subtotal", "Total", "Recibido",
  "Cambio", "Estado", "Total Del Iva", "Observación"];
  const titleDetails = ["Nombre Prod", "Código Producto", "Categoria", "Descuento", "Cantidad Vendida", "Precio Unitario" , "Total"];
  let datico = [{}];
  const classes = useStyles();

  const formateaFecha = () => {
      let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
      datico.length = 0;
      let rowsTemp=[];
    for(let i = 0; i<data.length; i++){
      let fecha = new Date(data[i].fecha_ve)
      .toLocaleDateString('es',opciones)
      .replace(/ /g,'-')
      .replace('.','')
      .replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
         const body = {
          id_venta:data[i].id_venta,
          nombre_pe:data[i].nombre_pe,
          tipo_clpr:data[i].tipo_clpr,
          nombre_usr:data[i].nombre_usr,
          fecha_ve:fecha,
          sub_total:data[i].sub_total,
          total_ve:data[i].total_ve,
          recibido:data[i].recibido,
          cambio:data[i].cambio,
          estado_ve:data[i].estado_ve,
          total_iva:data[i].total_iva,
          observacion_vta:data[i].observacion_vta,
          nombre_pro:data[i].nombre_pro,
          codigo_pro:data[i].codigo_pro,
          nombre_catg:data[i].nombre_catg,
          descuento:data[i].descuento,
          cantidad_ven:data[i].cantidad_ven,
          precio_ven:data[i].precio_ven,
          total_ven:data[i].total_ven
         };
          rowsTemp.push(body);         
       };
       setInfo(rowsTemp);
  };
useEffect(()=>{
  if(data){
  formateaFecha();
  }
}, [data]);
  
/*const direcciona = () =>{
  window.location="/crea_devolucion";
};*/

/*return (
    <>
      <div className = "contteiner">
      <div className = "containerList">
      <div className = "titulo_list"><h1> Listado De Ventas</h1></div>
          <hr className="linea-h2" />
            <div className = "contSearch"> 
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Devoluciones"
              tooltip={`Tipos de Filtro:  Código Factura, Fecha Venta, Nombre Producto, Código Producto`}
            />
            </div>
              <div className="lista-tabla">
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Error404
                    ancho={200}
                    error="Se ha producido un problema, recargue la página."
                  />
                ) : 
                    (
                  <CollapsibleTable
                    data={info}
                    filtro={valueInp}
                    titulos={title}
                    titulosDetalles={titleDetails}
                    tipo='info'
                    categoria='info'
                    recarga={recarga}
                    setRecarga={setRecarga}
                  />
                )}
            </div>
          </div>
      </div>
    </>
    );              
};

export default Informes;*/