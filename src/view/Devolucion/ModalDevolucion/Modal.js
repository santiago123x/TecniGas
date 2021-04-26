import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as yup from 'yup';
import  {yupResolver} from '@hookform/resolvers/yup';
import { setLocale } from 'yup';
import useStyles from "./ModalUseStyle";

const Modal = ({}) => {

// Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState({
        nombre: "",
        identificacion: "",
        correo: "",
        direccion: "",
        telefono: "",
      });

// Asignación de los valores escritos en los campos de texto
      const [datos, setDatos] = useState({
        ...datos,
      });
    
// Función de escucha que obtiene el valor de los campos de texto
      const handleInputChange = (event) => {
        setDatos({
          ...datos,
          [event.target.name]: event.target.value,
        });
      };

//Control del modal
//Función que reinicia el modal
  const reset = (e) => {
    e.target.reset();
    setModal(!modal);
  };

  //Inicializa el estado del modal en falso
  const [modal, setModal] = useState(false);

  //Función para cambiar el estado del modal
  const abrirCerrarModal = () => {
    setModal(!modal);
  };
  
  //Formulario del modal
  const modalForm = (
      <div classname = "containerPrin">
          
      </div>
  );

    return (
        <div />
    );
};
export default Modal;