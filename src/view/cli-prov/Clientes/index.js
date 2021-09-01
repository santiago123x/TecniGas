import { useState } from "react";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import useAxios from "../../Hooks/useAxios";
import Search from "../../Componentes/Search";
import Formulario from "../formulario/formulario";
import useAuth from "../../Hooks/useAuth";

const Cliente = () => {
  const auth = useAuth();
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/clipers/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);

  const title = ["Nombre - Empresa", "Cedula - NIT", "Telefono", "Opciones"];
  const titleDetails = ["Email", "Dirección"];

  return (
    <>
      <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Clientes</h2>
          <Formulario
            recarga={recarga}
            setRecarga={setRecarga}
            tipo="cliente"
            metodo="post"
            titulo="Crear Cliente"
            imagen="cli"
            tipoButton="true"
          />

          <hr className="linea-h2" />

          <Search
            valueInp={valueInp}
            setValueInp={setValueInp}
            titulo="Filtrar Clientes"
            tooltip={`Tipos de Filtro:  Nombre - Empresa, Cedula - NIT`}
          />

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
                titulosDetalles={titleDetails}
                tipo="clipro"
                categoria="cli"
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

export default Cliente;
