import { useState } from "react";
import FormularioDev from "./FormDev/FormularioDev";
import TablaLista from "./FormDev/TablaLista";
import useAuth from "../Hooks/useAuth";


const Devolucion = () => {
  const auth = useAuth();
  const [recarga, setRecarga] = useState(false);
  return (
    <>
      <TablaLista />
    </>
  );
};

export default Devolucion;