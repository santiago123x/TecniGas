import React, { useCallback, useState, useEffect, useContext,useLayoutEffect } from "react";
import UserContext from '../Context/User/UserContext'
import { makeStyles, withStyles } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { FaKey, FaUser, FaEye, FaCheck } from "react-icons/fa";
import logo from "./imagenes/logo.ico";
import llama from "./imagenes/llama.gif";
import "./login.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { notify } from "../Componentes/notify/Notify";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  usuario: {
    borderRadius: "6px 6px 0 0",
  },
  contraseña: {
    borderRadius: "0 0 6px 6px",
  },
  divider: {
    height: 25,
    margin: "5px 15px 5px 30px",
    width: "1px",
    backgroundColor: "darkgray",
  },
  button: {
    width: "20px",
    height: "20px",
  },
}));
/*
const algoritmo = 'aes-192-cbc';
const password = 'SBfvAsJqGKKRjDxD2hK7xD58';
const Crypto = require("crypto");


const encriptar = (contra) => {
  try {
    const iv = Crypto.randomBytes(8).toString('hex');
    const cipher = Crypto.createCipheriv(algoritmo, password, iv);
    cipher.update(contra, 'utf8', "hex");
    const contraCipher = cipher.final("hex");
    return iv + contraCipher;
  } catch (err) {
    console.error(err);
  }
}

const desencriptar = (hex) => {
  try {
    console.log(hex)
    const iv = hex.slice(0, 16);
    const contraCipher = hex.slice(16);
    let decipher = Crypto.createDecipheriv(algoritmo, password, iv);
    decipher.update(contraCipher, "hex", 'utf8');
    return decipher.final('utf8');
  } catch (err) {
    console.error(err);
  }
}

console.log(desencriptar(encriptar('1234')));
*/
const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [verContra, setVerContra] = useState("password");
  const [redo, setRedo] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const classes = useStyles();

  let {dispatch,user} = useContext(UserContext);
  let history = useHistory();
  const cambio = () => {
    verContra === "text" ? setVerContra("password") : setVerContra("text");
  };

  useLayoutEffect(()=>{
    if(user.user){
      switch (user.user.rol){
        case 'Administrador':
          history.push('/perfil');
          break;
        case 'Vendedor':
          history.push('/ventas');
          break;
        case 'Contador':
          history.push('/informes');
          break;
        default:
          break;
      }
    }
  },[user])

  useEffect(() => {
    contraseña.length === 0 && setVerContra("password");
  }, [contraseña]);

  const verificarUsu = async () => {
    try {
      const body = {
        nombre_usr: usuario,
        contraseña,
      };
      setLoading(true);
      await axios
        .post(`http://localhost:5000/verifiusu/`, body)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const data = response.data;
            if (response.data.isAuth) {
              dispatch({type:'LOGIN',payload: data});
              const nombre = data.user.nombre_pe;
              setVerificado(true);
              notify("Bienvenido: ", nombre, "info");

              if(data.user.rol == 'Administrador'){
                history.push('/perfil');
              }else if(data.user.rol == 'Vendedor'){
                history.push('/ventas');
              }else if(data.user.rol == 'Contador'){
                history.push('/informes');
              }

            }
           else {
            notify("Usuario o contraseña invalida por favor verifique");
            setVerificado(false);
          }}
          setLoading(false);
          //window.location.reload()
        });
    } catch (error) {
      notify("Ha susedido un problema intente mas tarde, error: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="login-conte">
      <ToastContainer />
      <div className="login">
        <img src={logo} className="logo" alt="logo Tecnigas" />
        <h1>Tecnigas</h1>
        <MiInputB
          placeholder="Usuario"
          className={classes.usuario}
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          startAdornment={
            <>
              <FaUser className="iconologin" />
              <Divider className={classes.divider} orientation="vertical" />
            </>
          }
        />
        <MiInputB
          className={classes.contraseña}
          type={verContra}
          placeholder="Contraeña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          inputProps={{
            maxLength: 15,
          }}
          startAdornment={
            <>
              <FaKey className="iconologin" />
              <Divider className={classes.divider} orientation="vertical" />
            </>
          }
          endAdornment={
            contraseña.length > 0 && (
              <>
                <FaEye className="iconoboton" onClick={() => cambio()} />
              </>
            )
          }
        />
        <button
          className={`boton-login ${redo}`}
          onClick={() => verificarUsu()}
        >
          {loading ? (
            <img src={llama} className="llama" alt="llama azul" />
          ) : verificado ? (
            <FaCheck className="check" />
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

const MiInputB = withStyles({
  root: {
    padding: "2% 6%",
    display: "flex",
    alignItems: "center",
    width: "90%",
    margin: 0.5,
    backgroundColor: "ghostwhite",
    "& hr": {
      opacity: 0.5,
      height: 25,
    },
  },
})(InputBase);

export default Login;
