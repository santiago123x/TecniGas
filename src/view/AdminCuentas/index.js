import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { IoArrowBack } from "react-icons/io5";
import "./admin.css";
import { useHistory } from "react-router-dom";
import Loading from "../Componentes/Loading/Loading";
import Error404 from "../Componentes/Error/Error";
import CollapsibleTable from "../Componentes/Table/Table";
import useAxios from "../Hooks/useAxios";
import Search from "../Componentes/Search";
import { ToastContainer } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import useAuth from "../Hooks/useAuth";
import CrearCuenta from "./CrearCuenta"

const AdminCuentas = () => {
  const auth = useAuth();
  const [valueInp, setValueInp] = useState("");
  const [recarga, setRecarga] = useState(false);
  const history = useHistory();
  const { data, loading, error } = useAxios("/usuario", recarga);
  
  const title = ["Nombre de Usuario", "Nombre y Apellido", "Rol", "Opciones"];
  const titleDetails = ["Cedula", , "Email", "Contraseña"];

  

  return (
    <div className="conteiner">
      <div className="cont__lista">
        <div className="cont__admin">
          <div className="buttonAdminBack">
            <Tooltip title="Volver a Perfil" placement="top">
              <Button
                size="small"
                variant="contained"
                color="default"
                onClick={() => {
                  history.push("/perfil");
                }}
              >
                <IoArrowBack />
              </Button>
            </Tooltip>
          </div>
          <h2 className="cont__lista-titulo titulo-admin">
            Administración de Usuarios
          </h2>
          <hr className="linea-h2" />
          <div className="contSearch">
            <Search
              valueInp={valueInp}
              setValueInp={setValueInp}
              titulo="Filtrar Usuarios"
              tooltip={`Tipos de Filtro: Nombre Usuario, Nombre y Apellido, Cedula, Rol`}
            />
            <div className="buttonCrear">
              <CrearCuenta/>
            </div>
          </div>
          <div className="cont__lista-tabla tablaUsu">
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
                tipo="usu"
                categoria="usu"
                recarga={recarga}
                setRecarga={setRecarga}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminCuentas;
