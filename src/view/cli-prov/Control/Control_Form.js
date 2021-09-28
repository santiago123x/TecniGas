import React, { useState, useEffect } from "react";
import Control from "./Control.css";
import logoC from "../formulario/icono.ico";
import logoP from "../formulario/proveedor.ico";
import logoI from "../formulario/icono-inventario.ico";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {
  validarTelefono,
  validarEmail,
  validaTodo,
  validaMenor0,
} from "./validacionInp";
import { validaPut, put,putCategoria } from "../formulario/Validacion";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../Componentes/notify/Notify";
import { MdModeEdit } from "react-icons/md";
import useStyles from "./ControlUseStyle";
import Inputs from "./Inputs";
import { validarProd, putP } from "../../inventario/ModalProducto/ValidaProd";
import useAxios from "../../Hooks/useAxios";

const URL = "http://localhost:5000";


const Control_Form = ({
  tipo,
  metodo,
  titulo,
  imagen,
  recarga,
  setRecarga,
  objeto,
}) => {
  const estadoInicial = { ...objeto };
  const productos = useAxios("/productoall");
  const dataCategoria = useAxios("/categorias");

  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    ...objeto,
  });

  // Función de escucha que obtiene el valor de los campos de texto
  const handleInputChange = (event) => {
    //console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  //Control del modal
  //Función que reinicia el modal
  const reset = () => {
    if(tipo === "cli" || tipo === "pro"){
      setDatos({
        nombre_pe: "",
        identificacion: "",
        email: "",
        direccion: "",
        telefono: "",
      });
      setModal(!modal);
      setErrores({error:false});
    } else if(tipo === "inv"){
      setDatos({
        nombre_pro: "",
        cantidad_pro: "",
        stock_min: "",
        id_categoria: 0,
        precio_may: "",
        precio_uni: ""
      });
      setModal(!modal);
      setErrores({error:false});
    }
    
  };

  //Inicializa el estado del modal en falso
  const [modal, setModal] = useState(false);

  //Función para cambiar el estado del modal
  const abrirCerrarModal = () => {
    setModal(!modal);
    setErrores({error:false});
    setDatos({ ...estadoInicial });
  };

  const [errores, setErrores] = useState({
    error: false
  });

  const onSubmit2 = async () => {
    if(errores.error !== true){
      const codigoProdOld = objeto.codigo_pro;
      const idProd = objeto.producto_id;
      let codigo_pro = 0;
  
      if(datos.id_categoria == objeto.id_categoria){
  
        codigo_pro = objeto.codigo_pro;
      }else{
        let p = productos.data.filter((prod) => {
          return prod.id_categoria == datos.id_categoria
        }
        )      
        console.log (p)
        codigo_pro = p.length == 0 ? datos.id_categoria * 100 : p[p.length - 1].codigo_pro + 1;
      }
  
      //console.log(codigo_pro);
  
      const body = {
        nombre_pro: datos.nombre_pro,
        cantidad_pro: datos.cantidad_pro,
        stock_min: datos.stock_min,
        id_categoria: datos.id_categoria,
        precio_may: datos.precio_may,
        precio_uni: datos.precio_uni,
        codigo_pro: codigo_pro,
      };
  
      const validar = await validarProd(datos.nombre_pro, codigoProdOld);
  
      if (!validar) {
        try {
          await putP(idProd, body);
          reset();
          setRecarga(!recarga);
          notify(alertaexito, datos.nombre_pro + " " + objeto.codigo_pro, "info");
        } catch (err) {
          notify(alertamistake, "error");
        }
      } else if (!validar) {
        notify("Error al modificar, datos invalidos.", "error");
      }
    } else {
      notify("Datos inválidos, por favor rellene correctamente el fórmulario.", "error");
    }
    
  };

  const onSubmit3 = async ()=>{
    const id_categoria = objeto.id_categoria;
    const body = {
      nombre_catg : datos.nombre_catg,
    }
    console.log(id_categoria)
    try {
      await putCategoria(id_categoria, body);
      reset();
      setRecarga(!recarga);
      notify(alertaexito, datos.nombre_catg, "info");
    } catch (err) {
      notify(alertamistake, "error");
    }
  }

  const validacion = () => {
    if(tipo === "cli" || tipo === "pro"){
      if (
        validaTodo(datos) ||
        validarEmail(datos.email) ||
        validarTelefono(datos.telefono.toString())
      ) 
      {
        console.log(datos)
        setErrores({error:true});
        console.log(errores)
      } else{
        setErrores({error:false});
        console.log(errores)
      }
    }else if(tipo === "inv"){
      if (
        validaTodo(datos) ||
        validaMenor0(parseFloat(datos.precio_uni)) ||
        validaMenor0(parseFloat(datos.precio_may)) ||
        validaMenor0(parseInt(datos.stock_min)) ||
        validaMenor0(parseInt(datos.cantidad_pro))
        ) 
      {
        setErrores({error:true});
        console.log(errores)
  
      } else{
        setErrores({error:false});
        console.log(errores)
      }
    }
  };

  useEffect(()=>{
    if(datos){
      validacion();;
    }
  }, [datos]);
  const onSubmit = async () => {
    if(errores.error !== true){

      if (tipo !== "inv" && tipo !== "cat") {
        let tp;
  
        if (tipo === "cli") {
          tp = "cliente";
        } else {
          tp = "proveedor";
        }
  
        const idCliPro = objeto.identificacion;
        const body = {
          nombre_pe: datos.nombre_pe,
          identificacion: datos.identificacion,
          email: datos.email,
          direccion: datos.direccion,
          telefono: datos.telefono.toString(),
        };
        const validaP = await validaPut(idCliPro, datos.identificacion, tp);
  
        if (validaP) {
          try {
            await put(idCliPro, body);
            reset();
            setRecarga(!recarga);
            notify(alertaexito, datos.identificacion, "info");
          } catch (err) {
            notify(alertamistake, "error");
          }
        } else if (!validaP) {
          notify("Error al modificar, datos invalidos.", "error");
        }
      }else if(tipo === "cat"){
        onSubmit3();
      } else {
        onSubmit2();
      }
    } else{
      setErrores({error:false});
      notify("Datos inválidos, por favor rellene correctamente el fórmulario.","", "error");
    }
    
  };

  const alertaexito =
    tipo === "inv"
      ? "Se ha actualizado el producto correctamente"
      : tipo === "cli"
      ? "Se ha actualizado el cliente correctamente "
      : tipo === 'cat'
      ? "Se ha actualizado la categoria correctamente "
      : "Se ha actualizado el proveedor correctamente ";
  const alertamistake = "Error al intentar modificar, intente de nuevo.";

  const classes = useStyles();

  const body = (
    <div>
      <div className="container_control mt-5">
        <div className="foco_control">
          <div className="header_form">
            <div className="cliente_control">
              <img
                className="imagen"
                src={imagen == "inv" ? logoI : imagen === "cli" ? logoC : logoP}
              />
            </div>
            <div className="titulos">
              <h4 className="titulo-form">{titulo}</h4>
              <h4 className="subtitulo-form">Actualización De Datos</h4>
            </div>
          </div>
          <div className="contenedor_form">
            <form
              id="formPut"
              className="form-group_btn"
            >
              <div className="conten-btn">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={()=>onSubmit()}
                >
                  Actualizar
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

            <div className="formulario_control">
              <form
                id="formPut"
                className="form-group_control"
              >
                <Inputs
                  classes={classes}
                  handleInputChange={handleInputChange}
                  datos={datos}
                  tipo={tipo}
                  dataCategoria={dataCategoria.data}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Tooltip title="Editar" placement="top">
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() => abrirCerrarModal()}
        >
          <MdModeEdit />
        </IconButton>
      </Tooltip>

      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
    </div>
  );
};
export default Control_Form;
