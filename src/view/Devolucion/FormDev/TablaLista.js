import React, { useState, useEffect } from "react";
import MiInput from "../../Componentes/MiInput/MiInput";
import Button from "@material-ui/core/Button";
import useAxios from "../../Hooks/useAxios";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import Search from "../../Componentes/Search";
import Select from "@material-ui/core/Select";
import useStyles from "./FormDevUseStyles";
import styleDev from "../styleDev.css";
import { notify } from "../../Componentes/notify/Notify";

const feDa = new Date();
const fechaAct = new Date(
  feDa.getFullYear(),
  feDa.getMonth(),
  feDa.getDate()
);

const ListaDev = ({}) => {

  const [info, setInfo] = useState([]);
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/listaDev/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);
  

  const title = ["Código Devolución", "Código Factura", "Fecha Devolución", "Total Devuelto", "Opciones"];
  const titleDetails = ["Cantidad Devuelta", "Precio Unitario", "Código Producto"];

  let devo_cod = "";
  let datico = [{}];
  const classes = useStyles();

  const formateaFecha = () => {
      let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
      datico.length = 0;
    for(let i = 0; i<data.length; i++){
      let fecha = new Date(data[i].fecha_dev)
      .toLocaleDateString('es',opciones)
      .replace(/ /g,'-')
      .replace('.','')
      .replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
         let body = {
          devolucion_id : data[i].devolucion_id,
          id_venta : data[i].id_venta,
          fecha_dev : fecha,
          total_gral_d : data[i].total_gral_d,
          cantidad_det : data[i].cantidad_det,
          precio_uni : data[i].precio_uni,
          codigo_pro : data[i].codigo_pro
         };
         setInfo(...info, body);
       };
  };
useEffect(()=>{
  if(data){
  formateaFecha();
  }
}, [data]);
  

    return (
      <div className = "containerList">
      <div className = "titulo_list"><h1> Listado De Devoluciones</h1></div>
          <hr className="linea-h2" />
            <div className = "content-table">
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Devoluciones"
              tooltip={`Tipos de Filtro:  Código Devolución, Código Factura`}
            />
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
                    tipo="dev"
                    categoria="dev"
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