import { useContext } from "react";
import IvaContext from "../Context/Iva/IvaContext";

const Login = () => {
  const { iva, dispatch } = useContext(IvaContext);
  console.log(iva);
  return (
    <>
      <h1>Hola Soy Login</h1>
    </>
  );
};

export default Login;
