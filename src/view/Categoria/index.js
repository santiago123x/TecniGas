import { useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loading from "../Componentes/Loading/Loading";
import Error404 from "../Componentes/Error/Error";
import { ToastContainer } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import CollapsibleTable from "../Componentes/Table/Table";
import Search from "../Componentes/Search";
import "../inventario/Inv/Inventario.css";
import "react-toastify/dist/ReactToastify.css";
import CrearCat from './crearCat.js';
import './crearCat.css';


import React from 'react'

const Categoria = () => {
const auth = useAuth();
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/categoriasH`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);
  

  const title = [
    "Categoria",
    "Opciones",
  ];
  

    return (
        <>
        <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Productos</h2>
          
          <hr className="linea-h2" />
          <div className='contSearch'>
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Categorias"
              tooltip={`Tipos de Filtro: - Categoria`}
            />
            <CrearCat 
            recarga={recarga}
            setRecarga={setRecarga}
            />
          </div>

          <div className="cont__lista-tabla">
            {loading ? (
              <Loading />
            ) : error ? (
              <Error404
                ancho={200}
                error="Se ha producido un problema, Recargue la pagina."
              />
            ) : (
              <CollapsibleTable
                data={data}
                filtro={valueInp}
                titulos={title}
                titulosDetalles={[]}
                tipo="cat"
                recarga={recarga}
                setRecarga={setRecarga}
              />
            )}
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};
  


export default Categoria
