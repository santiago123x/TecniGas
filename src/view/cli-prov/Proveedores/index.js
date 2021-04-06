import { useState } from "react";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import useAxios from "../../Hooks/useAxios";
import Search from "../../Componentes/Search";

const Proveedores = () => {
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/provpers/`);
  const { data, error, loading } = useAxios(url);

  const title = ["Nombre - Empresa", "Cedula - NIT", "Telefono"];
  const titleDetails = ["Email", "Dirección"];

  return (
    <>
      <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Proveedores</h2>


          <hr className="linea-h2" />
          <div className="cont__lista-input"></div>
          <Search
            valueInp={valueInp}
            setValueInp={setValueInp}
            titulo="Filtrar Proveedores"
            tooltip={`Tipos de Filtro: - Nombre - Cedula`}
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
                tipo="prov"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Proveedores;
