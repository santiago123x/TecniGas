import FormularioProd from "../inventario/Componentes/Modal/FormularioProd.js"
import { useState } from "react";

const Ventas = () => {
  const [recarga, setRecarga] = useState(false);
  return (
    <>
      <h1>Hola Soy Ventas</h1>
      <FormularioProd
            recarga={recarga}
            setRecarga={setRecarga}
            tipo="Producto"
            metodo="post"
            titulo="Crear Producto"
            
          />
    </>
  );
};

export default Ventas;
