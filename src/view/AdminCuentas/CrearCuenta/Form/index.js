import { useState} from "react";
import "../creacuenta.css";
import { useForm } from "react-hook-form";
import {
  type,
  validarTelefono,
  validarEmail,
} from "../../../Perfil/FormPerfil/validacionForm";
import MiIput from "../../../Componentes/MiInput/MiInput";
import { FaEye } from "react-icons/fa";
import MenuItem from "@material-ui/core/MenuItem";

const CreaCuenta = ({
  titulo,
  datos,
  labels,
  onChange,  
  recarga,
  setRecarga,
}) => {
  const { register } = useForm({});
  const [verContra, setVerContra] = useState("password");
  const [verContraConf, setVerContraConf] = useState("password");

  const cambioContra = () => {
    verContra === "text" ? setVerContra("password") : setVerContra("text");
  };

  const role = [
    { rol: "Administrador" },
    { rol: "Vendedor" },
    { rol: "Contador" },
  ];

  const cambioContraConf = () => {
    verContraConf === "text"
      ? setVerContraConf("password")
      : setVerContraConf("text");
  };

  return (
    <div className="forms-perfil">
      <h4 className="cont__lista-titulo">{titulo}</h4>

      <form className="form-inputs-perfil">
        <div className="inputs-perfil">
          {Object.keys(datos).map((dat, index) => {
            return (
              <div className="input-form" key={index}>
                <MiIput
                  variant="outlined"
                  size="small"
                  name={dat}
                  disabled={recarga}
                  select={dat === "rol"}
                  fullWidth
                  value={datos[dat]}
                  label={labels[index]}
                  onChange={onChange}
                  inputRef={register}
                  type={
                    dat === "contraConf"
                      ? verContraConf
                      : dat === "contraseña"
                        ? verContra
                        : type(dat)
                  }
                  inputProps={
                    (dat === "contraConf" || dat === "contraseña") && {
                      maxLength: 15,
                    }
                  }
                  InputProps={
                    (dat === "contraConf" || dat === "contraseña") &&
                    datos[dat].length > 0 && {
                      endAdornment: (
                        <>
                          <FaEye
                            className="icono-boton"
                            onClick={dat === "contraConf" ? () => cambioContraConf() :
                              () => cambioContra()}
                          />
                        </>
                      ),
                    }
                  }
                >
                  {dat === "rol" &&
                    role.map((option) => (
                      <MenuItem key={option.rol} value={option.rol}>
                        {option.rol}
                      </MenuItem>
                    ))}
                </MiIput>
                <span className="span text-danger text-small d-block">
                  {datos[dat].length == 0 && "Campo requerido"}
                  {dat === "telefono" &&
                    validarTelefono(datos[dat]) &&
                    "El telefono debe tener entre 7 y 12 caracteres"}
                  {dat === "email" &&
                    validarEmail(datos[dat]) &&
                    "Debe ser un Email valido Ej: ej@ej.com"}
                </span>
                <span className="span text-danger text-small d-block">
                  {dat === "contraConf" &&
                    datos.contraConf.length > 0 &&
                    datos.contraConf !== datos.contraseña &&
                    "Las contraseñas deben ser iguales"}
                </span>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default CreaCuenta;
