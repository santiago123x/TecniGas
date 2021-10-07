import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import useAxios from "../../Hooks/useAxios";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import Search from "../../Componentes/Search";
import { useStyles } from "./FormDevUseStyles";
import styleDev from "../styleDev.css";


const ListaDev = ({}) => {

  const [info, setInfo] = useState([]);
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/listaDev/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);
  
  

  const title = ["Código Devolución", "Código Factura", "Fecha Devolución", "Total Devuelto", "Opciones"];
  const titleDetails = ["Cantidad Devuelta", "Precio Unitario", "Código Producto", "Nombre", "Categoria"];

  let devo_cod = "";
  let datico = [{}];
  const classes = useStyles();

  const formateaFecha = () => {
      let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
      datico.length = 0;
      let rowsTemp=[];
    for(let i = 0; i<data.length; i++){
      let fecha = new Date(data[i].fecha_dev)
      .toLocaleDateString('es',opciones)
      .replace(/ /g,'-')
      .replace('.','')
      .replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
         const body = {
          devolucion_id : data[i].devolucion_id,
          id_venta : data[i].id_venta,
          fecha_dev : fecha,
          total_gral_d : data[i].total_gral_d,
          cantidad_det : data[i].cantidad_det,
          precio_uni : data[i].precio_uni,
          codigo_pro : data[i].codigo_pro,
          nombre_pro : data[i].nombre_pro,
          nombre_catg : data[i].nombre_catg
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
  
const direcciona = () =>{
  window.location="/crea_devolucion";
};

    return (
      <div className = "contteiner">
      <div className = "containerList">
      <div className = "titulo_list"><h1> Listado de Devoluciones</h1></div>
          <hr className="linea-h2" />
            <div className = "contSearch"> 
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Devoluciones"
              tooltip={`Tipos de Filtro:  Código Devolución, Código Factura, Fecha Devolución`}
            />
              <Button
              size = "medium"
              variant ="contained"
              color ="primary"
              type = "button"
              onClick={() => direcciona()}
              > 
                Ir a crear devolución
              </Button>
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
                    tipo='dev'
                    categoria='dev'
                    recarga={recarga}
                    setRecarga={setRecarga}
                  />
                )}
            </div>
        </div>
      </div>
      );

};
export default ListaDev;