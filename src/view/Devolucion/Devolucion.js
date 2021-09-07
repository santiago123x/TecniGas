import { useState } from "react";
import FormularioDev from "./FormDev/FormularioDev";
import useAuth from "../Hooks/useAuth";


const Devolucion = () => {
  const auth = useAuth();
  const [recarga, setRecarga] = useState(false);
  return (
    <>
      <FormularioDev />
    </>
  );
};

export default Devolucion;