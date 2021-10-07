import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";

const Grafico = () =>{
  //Estado inicial y declaraciones
  const [modal, setModal] = useState(false);
  const tituloProd = "Ventas Por Producto";
  const tituloVen = "Ventas Por Mes";
  const tituloAno = "Ventas Por Año";
  let tipo = "";
  let titulo ="";

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      position: "absolute",
      width: "605px",
      height: "640px",
      backgroundColor: "rgb(72 147 210)",
      border: "solid 5px rgba(176, 196, 222, 0.699)",
      borderRadius: "23px",
      boxShadow: theme.shadows[5],
      padding: "16px 32px 24px",
      top: "2%",
      left: "30%",
      transform: "traslate(-50%, -50%)",
    }
  }));

  const clase = useStyles();

  const abrirCerrarModal = () =>{
    title();
    setModal(!modal);
  };
  
  const title = () =>{
    if(tipo == "prod"){
      titulo = tituloProd;
    }else if(tipo == "vent"){
      titulo = tituloVen;
    }else if(tipo == "venA"){
      titulo = tituloAno;
    }
  };

    const bodyModal = (
        <div className = {clase.modal}>
            <div className = "graficoPpl">
                <div className = "TtleGraph">
                    <h1>Gráfico De {titulo}</h1>
                </div>
                <div className = "grafico">
                </div>
                <div className = "btnsGraficar">
                <Button 
                    size = "small"
                    variant ="contained"
                    color ="primary"
                    type = "button"
                    onClick={() => abrirCerrarModal()}
                  >
                    Grafico De {tituloProd}
              </Button>
              <Button 
                    size = "small"
                    variant ="contained"
                    color ="primary"
                    type = "button"
                    onClick={() => abrirCerrarModal()}
                  >
                    Grafico De {tituloVen}
              </Button>
              <Button 
                    size = "small"
                    variant ="contained"
                    color ="primary"
                    type = "button"
                    onClick={() => abrirCerrarModal()}
                  >
                    Grafico De {tituloAno}
              </Button>
                <Button 
                    size = "small"
                    variant ="contained"
                    color ="primary"
                    type = "button"
                    onClick={() => abrirCerrarModal()}
                  >
                    Cerrar
              </Button>
              </div>
            </div>
        </div>
    );

    return (
    <>
      <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => abrirCerrarModal()}
          >
            Gráficos
      </Button>
    </>
    );

};
export default Grafico;

