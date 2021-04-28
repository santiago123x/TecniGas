import { useState, useEffect } from "react";
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

const FormPerfil = ({ titulo, datos, labels, tipo }) => {
  const [data, setData] = useState({ ...datos });
  const { register, handleSubmit } = useForm({});
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitAcc = (data, event) => {
    event.preventDefault();
    if (validaTodo(data) && contraseñas(data.contra, data.contraConf)) {
      return;
    }
    console.log(data);
  };
  const onSubmitPerf = (data, event) => {
    event.preventDefault();
    if (
      validaTodo(data) ||
      validarEmail(data.usu_email) ||
      validarTelefono(data.usu_tel)
    ) {
      return;
    }
    console.log(data);
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
                  value={data[dat]}
                  label={labels[index]}
                  onChange={handleInputChange}
                  inputRef={register}
                  fullWidth
                />
                <span className="span text-danger text-small d-block">
                  {data[dat].length == 0 && "Campo requerido"}
                  {dat == "usu_tel" &&
                    validarTelefono(data[dat]) &&
                    "El telefono debe tener entre 7 y 12 caracteres"}
                  {dat == "usu_email" &&
                    validarEmail(data[dat]) &&
                    "Debe ser un Email valido Ej: ej@ej.com"}
                </span>
                <span className="span text-danger text-small d-block">
                  {dat == "contraConf" &&
                    data.contraConf !== data.contra &&
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
          >
            Modificar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPerfil;

//errors[dat]?.message
