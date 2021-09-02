import { useState } from "react";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import useAxios from "../../Hooks/useAxios";
import Search from "../../Componentes/Search";
import Formulario from "../formulario/formulario";
import useAuth from "../../Hooks/useAuth";
import '../Clientes/clientes.css'

const Proveedores = () => {
  const auth = useAuth();
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/provpers/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);

  const title = ["Nombre - Empresa", "Cedula - NIT", "Telefono", "Opciones"];
  const titleDetails = ["Email", "Dirección"];

  return (
    <>
      <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Proveedores</h2>
          

          <hr className="linea-h2" />
          <div className='contSearch'>
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Proveedores"
              tooltip={`Tipos de Filtro:  Nombre - Empresa, Cedula - NIT`}
            />
            <Formulario
              recarga={recarga}
              setRecarga={setRecarga}
              tipo="proveedor"
              metodo="post"
              titulo="Crear Proveedor"
              imagen="prov"
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
                titulosDetalles={titleDetails}
                tipo="clipro"
                categoria="prov"
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

export default Proveedores;
