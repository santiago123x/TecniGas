import { useState } from "react";
import "../perfil.css";
import { useForm } from "react-hook-form";
import {
  type,
  validarTelefono,
  validarEmail,
  validaTodo,
  contraseñas,
} from "./validacionForm";
import Button from "@material-ui/core/Button";
import MiIput from "./MiInput";
import axios from "axios";
import { notify } from "../../Componentes/notify/Notify";

const uri = "http://localhost:5000";

const FormPerfil = ({
  titulo,
  datos,
  labels,
  tipo,
  onChange,
  recarga,
  setRecarga,
  id,
}) => {
  const { register, handleSubmit } = useForm({});
  const [loading, setLoading] = useState(false);

  const onSubmitAcc = async (data, event) => {
    event.preventDefault();
    if (validaTodo(data) && contraseñas(data.contraseña, data.contraConf)) {
      return;
    }
    const body = {
      nombre_usr: data.nombre_usr,
      contraseña: data.contraseña,
    };
    setLoading(true);
    await axios.put(`${uri}/usuario/${id}`, body);
    setLoading(false);
    notify(`Se ha actualizado el Usuario: `, data.nombre_usr, "info");
    setRecarga(!recarga);
  };

  const onSubmitPerf = async (data, event) => {
    event.preventDefault();
    if (
      validaTodo(data) ||
      validarEmail(data.email) ||
      validarTelefono(data.telefono)
    ) {
      return;
    }

    const body = {
      direccion: data.direccion,
      email: data.email,
      identificacion: data.identificacion,
      nombre_pe: data.nombre_pe,
      telefono: data.telefono,
    };
    setLoading(true);
    await axios.put(`${uri}/personaid/${id}`, body);
    setLoading(false);
    notify(`Se ha actualizado el Perfil: `, data.nombre_pe, "info");
    setRecarga(!recarga);
  };

  return (
    <div className="forms-perfil">
      <h4 className="cont__lista-titulo">{titulo}</h4>

      <form
        className="form-inputs-perfil"
        onSubmit={handleSubmit(tipo == "acc" ? onSubmitAcc : onSubmitPerf)}
      >
        <div className="inputs-perfil">
          {Object.keys(datos).map((dat, index) => {
            return (
              <div className="input-form" key={index}>
                <MiIput
                  variant="outlined"
                  size="small"
                  type={type(dat)}
                  name={dat}
                  value={datos[dat]}
                  label={labels[index]}
                  onChange={onChange}
                  inputRef={register}
                  fullWidth
                />
                <span className="span text-danger text-small d-block">
                  {datos[dat].length == 0 && "Campo requerido"}
                  {dat == "telefono" &&
                    validarTelefono(datos[dat]) &&
                    "El telefono debe tener entre 7 y 12 caracteres"}
                  {dat == "email" &&
                    validarEmail(datos[dat]) &&
                    "Debe ser un Email valido Ej: ej@ej.com"}
                </span>
                <span className="span text-danger text-small d-block">
                  {dat == "contraConf" &&
                    datos.contraConf !== datos.contraseña &&
                    "Las contraseñas deben ser igual"}
                </span>
              </div>
            );
          })}
        </div>
        <div className="perfil-buttonForm">
          <Button
            size="small"
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Modificar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPerfil;
