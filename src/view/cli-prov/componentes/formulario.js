import React, {Fragment, useState} from "react";
import { useForm } from "react-hook-form";
import style_Form from "./style_Form.css"
import { FcPortraitMode } from "react-icons/fc";
import {Modal, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {makeStyles, withStyles} from "@material-ui/core/styles";


const Formulario = () => {
    // Asignación de los valores escritos en los campos de texto
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        identificacion: '',
        correo: '',
        direccion: '',
        telefono: ''
    })

    // Función de escucha que obtiene el valor de los campos de texto
    const handleInputChange = (prop) => (event) => {
        //console.log(event.target.value)
        setDatos({
            ...datos,
            [prop] : event.target.value
        })
    }

    /*const enviarDatos = (event) => {
        event.preventDefault();
        console.log(datos.nombre + " " + datos.apellido)
    }*/
    
    //Realiza validaciones al enviar el formulario
    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        console.log(data)
        e.target.reset()
    }

    //Cambian el estilo de elementos de material-ui
    const useStyles=makeStyles((theme)=>({
        modal:{
            position: "absolute",
            width: 400,
            backgroundColor: "white",
            border: "2px solid 000",
            boxShadow: theme.shadows[5],
            padding: "16px 32px 24px",
            top: "50%",
            left: "50%",
            transform: "traslate(-50%, -50%)"
        },
        container:{
            textAlign:"center"
        }
    }))

    const MiInput = withStyles({
        root: {
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
            borderRadius: '15px',
            backgroundColor: '#B8DEFD'
            
          },
          '& .MuiOutlinedInput-adornedStart': {
            paddingLeft: '7px',
            
            
          },
          '& .MuiOutlinedInput-multiline': {
            padding: '12px',
            
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            backgroundColor: '#B8DEFD',
            color:'black',
          }
        },
      })(TextField);

    //Inicializa el estado del modal en falso  
    const [modal, setModal]=useState(false);

    //Función para cambiar el estado del modal  
    const abrirCerrarModal = () =>{
        setModal(!modal);
    }

    const styles=makeStyles();

    const body=(
        <div className={styles.modal}>
            <div className="container mt-5">
            <div className="foco">
                <div className="cliente">
                <FcPortraitMode className="form-icons" />
                <h4 className ="titulo-form" > Formulario Clientes </h4>
                 </div>   
                <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                            <div className="col-md-10">
                            <MiInput
                                variant="outlined"
                                size="small"
                                label="Nombre"
                                type="text"
                                name="nombre"
                                onChange={handleInputChange}
                                inputRef={
                                    register({
                                        required: {
                                            value: true,
                                            message: 'Campo Obligatorio'
                                        },
                                        maxLength:{
                                            value: 50,
                                            message: 'Digite un dato de menos de 50 caracteres'
                                        }
                                    })
                                }
                            />
                            <span className= "span text-danger text-small d-block">
                                {errors?.nombre?.message}
                            </span>
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            
                            <MiInput
                                variant="outlined"
                                size="small"
                                label="Apellido"
                                type="text"
                                name="apellido"
                                onChange={handleInputChange}
                                inputRef={
                                    register({
                                        required: {
                                            value: true,
                                            message: 'Campo Obligatorio'
                                        },
                                        maxLength:{
                                            value: 50,
                                            message: 'Digite un dato de menos de 50 caracteres'
                                        }
                                    })
                                }
                            />
                        <span className= "span text-danger text-small d-block">
                            {errors?.apellido?.message}
                        </span>
                        </div>
                        </div>
                   
                    <div className="row">
                        <div className="col-md-10">
                        <MiInput
                            variant="outlined"
                            size="small"
                            label="Identificación"
                            type="number"
                            name="identificacion"
                            onChange={handleInputChange}
                            inputRef={
                                register({
                                    required: {
                                        value: true,
                                        message: 'Campo Obligatorio'
                                    },
                                    maxLength:{
                                        value: 50,
                                        message: 'Digite un dato de menos de 50 caracteres'
                                    } 
                                })
                            }
                        />
                        <span className= "span text-danger text-small d-block">
                            {errors?.identificacion?.message}
                        </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <MiInput
                                variant="outlined"
                                size="small"
                                label="Correo Electrónico"
                                type="email"
                                name="correo"
                                onChange={handleInputChange}
                                inputRef={
                                    register({
                                        required: {
                                            value: true,
                                            message: 'Campo Obligatorio'
                                        },
                                        maxLength:{
                                            value: 50,
                                            message: 'Digite un dato de menos de 50 caracteres'
                                        }
                                    })
                                }
                            />
                        <span className= "span text-danger text-small d-block">
                            {errors?.correo?.message}
                        </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <MiInput
                                variant="outlined"
                                size="small"
                                label="Dirección"
                                type="text"
                                name="direccion"
                                onChange={handleInputChange}
                                inputRef={
                                    register({
                                        required: {
                                            value: true,
                                            message: 'Campo Obligatorio'
                                        },
                                        maxLength:{
                                            value: 50,
                                            message: 'Digite un dato de menos de 50 caracteres'
                                        }
                                    })
                                }
                            />
                        <span className= "span text-danger text-small d-block">
                            {errors?.apellido?.message}
                        </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <MiInput
                                variant="outlined"
                                size="small"
                                label="Teléfono"
                                type="text"
                                name="telefono"
                                onChange={handleInputChange}
                                inputRef={
                                    register({
                                        required: {
                                            value: true,
                                            message: 'Campo Obligatorio'
                                        },
                                        maxLength:{
                                            value: 50,
                                            message: 'Digite un dato de menos de 50 caracteres'
                                        }
                                    })
                                }
                            />
                        <span className= "span text-danger text-small d-block">
                            {errors?.apellido?.message}
                        </span>
                        </div>
                    </div>
                    <div className="col-sm-5">
                    <div className="guardar">    
                    <Button size="small" variant="contained" color="primary" type="submit">Guardar</Button>
                    </div>
                    <div className="cancelar">
                    <Button size="small" variant="contained" color="secondary" onClick={()=>abrirCerrarModal()}>Cancelar</Button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>     
    ) 
       

  

    return(
        <div className={styles.container} >
            <Button size="small" variant="contained"  color="primary" onClick={()=>abrirCerrarModal()}>Crear Cliente</Button>   
            <Modal
            open={modal}
            onClose={abrirCerrarModal}>
            {body}
            </Modal>
        </div>
      
    );
  };
  
  export default Formulario;