import { useState } from "react";
import "./perfil.css";
import FormPerfil from "./FormPerfil";
import Button from "@material-ui/core/Button";

const Perfil = ({ nombre_usu = "Pedro", tipo = "admin" }) => {
  const testDatos1 = {
    nick: "pepito12",
    contra: "pepo",
    contraConf: "pepo",
  };
  const labelAcc = ["Nombre de Usuario", "Contraseña", "Confirmar Contraseña"];
  const labelPerf = ["Nombre", "Cedula", "Telefono", "Email", "Dirección"];
  const testDatos2 = {
    usu_nom: "Pepito Gomez",
    usu_cedula: "17827481",
    usu_tel: "316029102",
    usu_email: "pepe@pepe.com",
    usu_direc: "debajodeunpuente",
  };

  return (
    <div className="conteiner">
      <div className="cont__lista">
        <h2 className="cont__lista-titulo titulo-perfil">{`Bienvenido ${nombre_usu}`}</h2>
        <div className="perfil-forms">
          <FormPerfil
            titulo="Datos de Acceso"
            datos={testDatos1}
            labels={labelAcc}
            tipo="acc"
          />
          {tipo == "admin" && (
            <div>
              <Button size="small" variant="contained" color="default">
                Administración
              </Button>
            </div>
          )}
          <FormPerfil
            titulo="Perfil"
            datos={testDatos2}
            labels={labelPerf}
            tipo="perf"
          />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
