import React, { useState, useEffect } from "react";
import "./Error.css";
import Robot from "./robot.png";

export const Error404 = ({
  error = "Se ha Producido un Error, Por favor Recargue la Pagina.",
  ancho = 400,
}) => {
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
    </div>
  );
};

export default Error404;
