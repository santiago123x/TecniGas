import React, { useState, useEffect } from "react";
import "./Error.css";
import Robot from "./robot.png";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export const Error404 = ({
  error = "Se ha Producido un Error, Por favor Recargue la Pagina.",
  ancho = 400,
  boton = false,
}) => {
  let history = useHistory();

  const pushInicio = () => {
    history.push("/");
  };

  const [clase, setClase] = useState(null);
  useEffect(() => {
    if (ancho <= 200) {
      setClase("small");
    } else {
      setClase("big");
    }
  }, []);
  return (
    <div className="error-container">
      <img width={ancho} className="cont__error-img" src={Robot}></img>
      {clase && <h3 className={`titulo ${clase}`}>Error: {error}</h3>}
      {boton && (
        <div className="button-error">
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => pushInicio()}
          >
            Ir al Inicio
          </Button>
        </div>
      )}
    </div>
  );
};

export default Error404;
