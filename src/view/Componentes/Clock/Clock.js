import React, { useState, useEffect } from "react";

const Clock = ({ colapsado, icon }) => {
  const date = new Date();
  const [hora, setHora] = useState(date.toLocaleTimeString());
  const [dia, setDia] = useState(date.toLocaleDateString());
  const [clickFecha, setClickFecha] = useState(false);

  let intervalo = setInterval(() => {
    const date = new Date();
    setHora(date.toLocaleTimeString());
  }, 1000);

  useEffect(() => () => clearInterval(intervalo), []);

  return (
    <div>
      {colapsado === true && icon === true && <div>{hora}</div>}
      {colapsado === false && icon === false && (
        <div
          id="time"
          onClick={() => {
            setDia(date.toLocaleDateString());
            setClickFecha(!clickFecha);
          }}
        >
          <div>Hora: {hora}</div>
          {clickFecha && <div>Fecha : {dia}</div>}
        </div>
      )}
    </div>
  );
};

export default Clock;
