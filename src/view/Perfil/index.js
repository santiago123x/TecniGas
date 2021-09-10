import { useState, useEffect, useContext } from "react";
import "./perfil.css";
import FormPerfil from "./FormPerfil";
import Button from "@material-ui/core/Button";
import useAxios from "../Hooks/useAxios";
import Loading from "../Componentes/Loading/Loading";
import Error404 from "../Componentes/Error/Error";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import useAuth from "../Hooks/useAuth";
import UserContext from '../Context/User/UserContext';

const Perfil = () => {
  const {user} = useContext(UserContext);
  const history = useHistory();
  const auth = useAuth();
  const [recarga, setRecarga] = useState(false);
  const [datosCuenta, setDatosCuenta] = useState({
    nombre_usr: "",
    contraseña: "",
    contraConf: "",
  });
  const [datosPerfil, setDatosPerfil] = useState({
    nombre_pe: "",
    identificacion: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  
  
  const { data, loading, error } = useAxios(`/usuario/${user.user.usuario_id}`, recarga);
  

  const labelAcc = ["Nombre de Usuario", "Contraseña", "Confirmar Contraseña"];
  const labelPerf = ["Nombre", "Cedula", "Telefono", "Email", "Dirección"];
  const handleInputChangeCuenta = (event) => {
    setDatosCuenta({
      ...datosCuenta,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputChangePerfil = (event) => {
    setDatosPerfil({
      ...datosPerfil,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (data.length !== 0) {
      setDatosCuenta({
        nombre_usr: data.nombre_usr,
        contraseña: data.contraseña,
        contraConf: data.contraseña,
      });
      setDatosPerfil({
        nombre_pe: data.nombre_pe,
        identificacion: data.identificacion,
        telefono: data.telefono,
        email: data.email,
        direccion: data.direccion,
      });
    }
  }, [data]);
  return (
    <div className="conteiner">
      <div className="cont__lista">
        {loading && <Loading />}
        {!loading && error && (
          <Error404
            ancho={200}
            error="Se ha producido un problema, Recargue la pagina."
          />
        )}
        {!loading && !error && (
          <>
            <h2 className="cont__lista-titulo titulo-perfil">{`Bienvenido ${datosPerfil.nombre_pe}`}</h2>
            <div className="perfil-forms">
              <FormPerfil
                titulo="Datos de Acceso"
                datos={datosCuenta}
                labels={labelAcc}
                tipo="acc"
                onChange={handleInputChangeCuenta}
                recarga={recarga}
                setRecarga={setRecarga}
                id={data.usuario_id}
              />
              {data !== [] && data.rol === "Administrador" && (
                <div>
                  <Tooltip title="Administración de cuentas" placement="top">
                    <Button
                      size="small"
                      variant="contained"
                      color="default"
                      onClick={() => {
                        history.push("/administracioncuentas");
                      }}
                    >
                      Administración
                    </Button>
                  </Tooltip>
                </div>
              )}
              <FormPerfil
                titulo="Perfil"
                datos={datosPerfil}
                labels={labelPerf}
                tipo="perf"
                onChange={handleInputChangePerfil}
                recarga={recarga}
                setRecarga={setRecarga}
                id={data.persona_id}
              />
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Perfil;
