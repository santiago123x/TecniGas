import { useState } from "react";
import CollapsibleTable from "../../Componentes/Table/Table";
import Modal from "../../Componentes/Modal/Modal";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import useAxios from "../../Hooks/useAxios";
import Search from "../../Componentes/Search";

const Proveedores = () => {
  const [filtro, setFiltro] = useState(false);
  const [valueInp, setValueInp] = useState("");
  const [valueSel, setValueSel] = useState(10);
  const [url, setUrl] = useState(`/proveedor/`);

  const { data, error, loading } = useAxios(url);

  const filtrar = () => {
    if (valueSel == 10 && valueInp !== "") {
      setUrl(`/proveedor/nom/${valueInp}`);
    } else if (valueSel == 20 && valueInp !== "") {
      setUrl(`/proveedor/ced/${valueInp}`);
    } else if (valueSel == 30 && valueInp !== "") {
      setUrl(`/proveedor/apell/${valueInp}`);
    }
  };

  const modalOptions = [
    { value: 10, label: "Nombre" },
    { value: 20, label: "Cedula" },
    { value: 30, label: "Apellido" },
  ];
  return (
    <>
      <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Proveedores</h2>

          <hr className="linea-h2" />
          <div className="cont__lista-input"></div>
          <Search
            filtrar={filtrar}
            filtro={filtro}
            setFiltro={setFiltro}
            valueInp={valueInp}
            setValueInp={setValueInp}
            url={url}
            setUrl={setUrl}
            tipo={`/proveedores/`}
            titulo="Filtrar Proveedores"
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
              <CollapsibleTable data={data} />
            )}
          </div>
        </div>
        <Modal
          filtro={filtro}
          setFiltro={setFiltro}
          value={valueSel}
          setValue={setValueSel}
          options={modalOptions}
        />
      </div>
    </>
  );
};

export default Proveedores;
