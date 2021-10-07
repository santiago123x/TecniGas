import {useState} from 'react'
import { Modal, TextField, Button } from "@material-ui/core";
import { notify } from "../Componentes/notify/Notify";
import useStyles from "../inventario/ModalProducto/FormularioProdStyles";
import {
    getCat,
    postCat,
    validaCatg,
} from './validaCat'
import './crearCat.css'




const CrearCat = ({
    recarga,
    setRecarga,
  }) => {
    const [modal, setModal] = useState(false);
    const [datos,setDatos] = useState({
        nombre_catg : '',
    })

  
    const alertasucces = "Se ha creado la Categoría: ";
    const alertaerror = "Ha ocurrido un error";




    const reset = () => {
        setDatos({
          nombre_catg : ''
        });
        setModal(!modal);
      };

    const abrirCerrarModal = () => {
        reset();
      };

      const onSubmit = async (data, e) =>{
        e.preventDefault();

        if(data.nombre_catg === ''){
            notify('Faltan campos por completar', '', "error");
            return
        }

        const allCategorias = await getCat();

        
        const validar = validaCatg(allCategorias, data.nombre_catg )
        switch(validar){
            case 'activado':
                reset();
                setRecarga(!recarga);
                notify(alertasucces, data.nombre_catg, "info");
                break;
            case 'crear':

                const bool = await postCat(data);

                if(bool){
                    reset();
                    setRecarga(!recarga);
                    notify(alertasucces, data.nombre_catg, "info");
                }else{
                    reset();
                    setRecarga(!recarga);
                    notify(alertaerror, '', "error");
                }
                break
            case 'existe':
                notify('Existe una categoría con el mismo nombre', "error");
                break;
            default:
                break;
        }

        

        
      }

      const classes = useStyles();

    const body = 
        (
        <div>
            <div className="container mt-5">
                <div className="focoC">
                    <div className="categoria">
                        <h4 className="titulo-form">{'Crear Categoría'}</h4>
                    </div>
                    <form className="form-groupCat" onSubmit={e => onSubmit(datos, e)}>
                    <div className="row">
                        <TextField
                            className={classes.textfield}
                            variant="outlined"
                            size="small"
                            type="text"
                            name="nombre_catg"
                            label="Nombre de la Categoría"
                            value={datos.nombre_catg}
                            onChange={(e)=>setDatos({nombre_catg: e.target.value})}
                        />
                        <span className="span text-danger text-small d-block">
                            {datos.nombre_catg.length === 0 && "Campo requerido"}
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
        )


        
    
    return (
        <div>
            <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => abrirCerrarModal()}
            >
                {'Crear Categoría'}
            </Button>
            <Modal open={modal} onClose={abrirCerrarModal}>
                {body}
            </Modal>
        </div>
    )
}

export default CrearCat
