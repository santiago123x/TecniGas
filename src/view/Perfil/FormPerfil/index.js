import { useState, useEffect } from "react";
import "../perfil.css";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import useStyles from "../../cli-prov/Control/ControlUseStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { validaAcc, validaPerf, type } from "./validacionForm";
import Button from "@material-ui/core/Button";

const FormPerfil = ({ titulo, datos, labels, tipo }) => {
  const [data, setData] = useState({ ...datos });
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(tipo == "acc" ? validaAcc : validaPerf),
  });
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitAcc = (data, event) => {
    event.preventDefault();
    console.log(data);
  };

  const onSubmitPerf = (data, event) => {
    event.preventDefault();
    console.log(data);
  };
  const classes = useStyles();
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
                <TextField
                  className={classes.textfieldPerfil}
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
                  {errors[dat]?.message}
                </span>
                <span className="span text-danger text-small d-block">
                  {dat == "contraConf" &&
                    data.contraConf !== data.contra &&
                    "Las contraseña debe ser igual"}
                </span>
              </div>
            );
          })}
        </div>
        <Button
          size="medium"
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Modificar
        </Button>
      </form>
    </div>
  );
};

export default FormPerfil;
