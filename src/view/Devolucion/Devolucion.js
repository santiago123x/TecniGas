import { useState } from "react";
import FormularioDev from "./FormDev/FormularioDev";


const Devolucion = () => {
  const [recarga, setRecarga] = useState(false);
  return (
    <>
      <FormularioDev />
    </>
  );
};

export default Devolucion;