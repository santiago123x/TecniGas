import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./FormularioProdStyle.css";

import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarProducto, post } from "./ValidaProd";
import * as yup from 'yup';
import  {yupResolver} from '@hookform/resolvers/yup';
import { setLocale } from 'yup';


const URL = "http://localhost:5000";

const FormularioProd = ({ tipo, metodo, titulo, recarga, setRecarga }) => {

  //Cambian el estilo de elementos de material-ui
  const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: 400,
      backgroundColor: "white",
      border: "2px solid 000",
      boxShadow: theme.shadows[5],
      padding: "16px 32px 24px",
      top: "50%",
      left: "50%",
      transform: "traslate(-50%, -50%)",
    },
    textfield: {
      '& .MuiOutlinedInput-inputMarginDense': {
        padding: '8.5px ',
        
      },
      '& .MuiFormLabel-root': {
        Function: 'disable',
        
      },
      '& .PrivateNotchedOutline-root-2': {
        top: '0px',
        borderRadius:'15px',
        borderColor:'black'
        
      },
      '& .MuiInputBase-input': {
        borderRadius:'15px',
        color:'black',

      },
      '& .MuiInputBase-root': {
        borderRadius:'15px',

      },
      '& .MuiOutlinedInput-adornedStart': {
        paddingLeft: '7px',
        
      },
      '& .MuiOutlinedInput-multiline': {
        padding: '12px',
        
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        backgroundColor: '#bbdeef',
        color:'black',
        
      },
    },
  }));

  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    categoria: "",
    nombre: "",
    precioUni: "",
    precioMay: "",
    stockMin: "",
    codigoPro: "",
    cantidadPro: "",
  });

  const alertasucces = "Se ha creado el producto: "
  const alertaerror = "Este producto ya existe: "

  // Función de escucha que obtiene el valor de los campos de texto
  const handleInputChange = (prop) => (event) => {
    //console.log(event.target.value)
    setDatos({
      ...datos,
      [prop]: event.target.value,
    });
  };

  setLocale({
    mixed: {
      notType: 'Por favor ingrese datos válidos',
    },
    number:{
      min: 'Debe contener más de 9 digitos',
    }
  });
   
  const schema = yup.object().shape({
    categoria:yup.string().required("Por favor seleccione una categoría"),
    nombre:yup.string().required().test("validaNombre","Debe contener más de 3 caracteres", valor => valor.toString().length > 3),
    precioUni:yup.number().required().test("validaPrecioUni", "el valor debe ser un numero positivo", valor => valor > 0),
    precioMay:yup.number().required().test("validaPrecioMay", "el valor debe ser un numero positivo", valor => valor > 0),
    stockMin:yup.number().required("Por favor ingrese un numero minimo de stock"),
    codigoPro:yup.number().required("Por favor ingrese un nuevo codigo de producto"),
    cantidadPro:yup.number().required("Porfavor ingrese una cantidad valida del producto"),
  });

  //Realiza validaciones al enviar el formulario
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
 
  const onSubmit = async (data, e) => {
      e.preventDefault();
        const valida = await validarProducto(data.nombre, parseInt(data.codigoPro));
      const body = {
        id_categoria: parseInt(data.categoria),
        nombre_pro: data.nombre,
        precio_uni: parseFloat(data.precioUni),
        precio_may: parseFloat(data.precioMay),
        stock_min: parseInt(data.stockMin),
        codigo_pro: parseInt(data.codigoPro),
        cantidad_pro: parseInt(data.cantidadPro),
      };

      console.log(body);
      //console.log(valida);

       switch (metodo) {
         case "post":
           if (!valida) {             
               await post(body);
               reset(e);
               setRecarga(!recarga);
               notify(alertasucces, data.nombre, "info");
             } else {               
               reset(e);
               setRecarga(!recarga);
               notify(alertaerror, data.nombre, "error");
             }
           break;
       }

  };

  const notify = (suffix, nombre = "", tipo) => {
    if (tipo === "info") {
      toast.info(`${suffix} ${nombre}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${suffix} ${nombre}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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

  const styles = makeStyles();
  const classes = useStyles();

  const body = (
    <div className={styles.modal}>
      <div className="container mt-5">
        <div className="foco">
          <div className="producto">
            
            <h4 className="titulo-form">{titulo}</h4>
          </div>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="text"
               name="categoria"
               label="Categoría"
               onChange={handleInputChange}
               inputRef={register}
              />
              <span className="span text-danger text-small d-block">
              {errors.categoria?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="text"
               name="nombre"
               label="Nombre Producto"
               onChange={handleInputChange}
               inputRef={register}
               />
             <span className="span text-danger text-small d-block">
              {errors.nombre?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="number"
               name="precioUni"
               label="Precio unitario"
               onChange={handleInputChange}
               inputRef={register}
               />
              <span className="span text-danger text-small d-block">
              {errors.precioUni?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="number"
               name="precioMay"
               label="Precio Mayorista"
               onChange={handleInputChange}
               inputRef={register}
               />
              <span className="span text-danger text-small d-block">
              {errors.precioMay?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="number"
               name="stockMin"
               label="Stock minimo del producto"
               onChange={handleInputChange}
               inputRef={register}
             />
             <span className="span text-danger text-small d-block">
              {errors.stockMin?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="number"
               name="codigoPro"
               label="Codigo del producto"
               onChange={handleInputChange}
               inputRef={register}
             />
             <span className="span text-danger text-small d-block">
              {errors.codigoPro?.message}
              </span>
            </div>
            <div className="row">
             <TextField
               className={classes.textfield}
               variant="outlined"
               size="small"
               type="number"
               name="cantidadPro"
               label="Cantidad del producto"
               onChange={handleInputChange}
               inputRef={register}
             />
             <span className="span text-danger text-small d-block">
              {errors.codigoPro?.message}
              </span>
            </div>
            <div className="botones">
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
              >
                Guardar
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="reset"
                onClick={() => abrirCerrarModal()}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div >
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => abrirCerrarModal()}
      >
        {titulo}
      </Button>
      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default FormularioProd;