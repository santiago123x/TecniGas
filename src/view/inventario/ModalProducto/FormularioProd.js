import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormularioProdStyle.css";
import useAxios from "../../Hooks/useAxios";
import { Modal, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ToastContainer } from "react-toastify";
import { notify } from "../../Componentes/notify/Notify";
import "react-toastify/dist/ReactToastify.css";
import { validarProducto, post, validaTodo, validaMenor0 } from "./ValidaProd";
import Select from "@material-ui/core/Select";
import useStyles from "./FormularioProdStyles";

const FormularioProd = ({
  tipo,
  metodo,
  titulo,
  recarga,
  setRecarga,
  dataCategoria,
}) => {
  const idata = useAxios("/productoall/", recarga);

  // Asignación de los valores escritos en los campos de texto
  const [datos, setDatos] = useState({
    categoria: "",
    nombre: "",
    precioUni: "",
    precioMay: "",
    stockMin: "",
    codigoPro: "",
    cantidadPro: "",
    codigoPro2: "",
  });

  const alertasucces = "Se ha creado el producto: ";
  const alertaerror = "Este producto ya existe: ";
  const alertadesact = "Porfavor elija otro nombre para el producto: ";

  // Función de escucha que obtiene el valor de los campos de texto
  const handleInputChange = (event) => {
    //console.log(event.target.value)
    if (event.target.name == "categoria") {
      const productosFilt = idata.data.filter(
        (prod) => prod.id_categoria == event.target.value
      );
      const codigo = productosFilt[productosFilt.length - 1].codigo_pro + 1;
      setDatos({
        ...datos,
        categoria: event.target.value,
        codigoPro: codigo,
        codigoPro2: codigo,
      });
    } else {
      setDatos({ ...datos, [event.target.name]: event.target.value });
    }
  };

  //Realiza validaciones al enviar el formulario
  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (
      validaTodo(data) ||
      validaMenor0(parseFloat(data.precioUni)) ||
      validaMenor0(parseFloat(data.precioMay)) ||
      validaMenor0(parseInt(data.stockMin)) ||
      validaMenor0(parseInt(data.cantidadPro))
    ) {
      return;
    }
    console.log("eepa");
    const valida = await validarProducto(
      data.nombre,
      parseInt(datos.codigoPro)
    );
    const body = {
      id_categoria: parseInt(data.categoria),
      nombre_pro: data.nombre,
      precio_uni: parseFloat(data.precioUni),
      precio_may: parseFloat(data.precioMay),
      stock_min: parseInt(data.stockMin),
      codigo_pro: parseInt(datos.codigoPro),
      cantidad_pro: parseInt(data.cantidadPro),
    };

    console.log(valida);
    //console.log(body);
    switch (metodo) {
      case "post":
        switch (valida) {
          case "encontrado":
            reset();
            setRecarga(!recarga);
            notify(alertaerror, data.nombre, "error");
            break;
          case "noencontrado":
            await post(body);
            reset();
            setRecarga(!recarga);
            notify(alertasucces, data.nombre, "info");
            break;
          case "desactivado":
            notify(alertadesact, data.nombre, "error");
            break;
        }

        break;
    }
  };

  const reset = () => {
    setDatos({
      ...datos,
      categoria: "",
      nombre: "",
      precioUni: "",
      precioMay: "",
      stockMin: "",
      cantidadPro: "",
    });
    setModal(!modal);
  };

  //Inicializa el estado del modal en falso
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (idata.data) {
      const productosFilt = idata.data?.filter(
        (prod) => prod.id_categoria == 1
      );

      const codigo = productosFilt[productosFilt.length - 1]?.codigo_pro + 1;

      setDatos({ ...datos, codigoPro: codigo, codigoPro2: codigo });
    }
  }, [idata.data]);

  //Función para cambiar el estado del modal
  const abrirCerrarModal = () => {
    reset();
  };

  const classes = useStyles();

  const body = (
    <div>
      <div className="container mt-5">
        <div className="foco">
          <div className="producto">
            <h4 className="titulo-form">{titulo}</h4>
          </div>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <Select
                native
                variant="outlined"
                value={datos.categoria}
                onChange={handleInputChange}
                label="Categoria"
                className={classes.select}
                name="categoria"
                inputRef={register}
                inputProps={{
                  name: "categoria",
                  id: "categoria",
                }}
              >
                {dataCategoria.map((cat, index) => {
                  return (
                    <option
                      className="option"
                      key={index}
                      value={cat.id_categoria}
                    >
                      {cat.nombre_catg}
                    </option>
                  );
                })}
              </Select>

              <span className="span text-danger text-small d-block"></span>
            </div>
            <div className="row">
              <TextField
                className={classes.textfield}
                variant="outlined"
                size="small"
                type="text"
                name="nombre"
                label="Nombre Producto"
                value={datos.nombre}
                inputRef={register}
                onChange={handleInputChange}
              />
              <span className="span text-danger text-small d-block">
                {datos.nombre.length == 0 && "Campo requerido"}
              </span>
            </div>
            <div className="row">
              <TextField
                value={datos.precioUni}
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
                {datos.precioUni.length == 0 && "Campo requerido"}
                {validaMenor0(parseFloat(datos.precioUni)) &&
                  "Debe ser mayor que 0"}
              </span>
            </div>
            <div className="row">
              <TextField
                className={classes.textfield}
                value={datos.precioMay}
                variant="outlined"
                size="small"
                type="number"
                name="precioMay"
                label="Precio Mayorista"
                onChange={handleInputChange}
                inputRef={register}
              />
              <span className="span text-danger text-small d-block">
                {datos.precioMay.length == 0 && "Campo requerido"}
                {validaMenor0(parseFloat(datos.precioMay)) &&
                  "Debe ser mayor que 0"}
              </span>
            </div>
            <div className="row">
              <TextField
                value={datos.stockMin}
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
                {datos.stockMin.length == 0 && "Campo requerido"}
                {validaMenor0(parseInt(datos.stockMin)) &&
                  "Debe ser mayor que 0"}
              </span>
            </div>
            <div className="row">
              <TextField
                disabled
                value={datos.codigoPro2}
                className={classes.textfield}
                variant="outlined"
                size="small"
                type="number"
                name="codigoPro"
                label="Codigo del producto"
                onChange={handleInputChange}
                inputRef={register}
              />
              <span className="span text-danger text-small d-block"></span>
            </div>
            <div className="row">
              <TextField
                value={datos.cantidadPro}
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
                {datos.cantidadPro.length == 0 && "Campo requerido"}
                {validaMenor0(parseInt(datos.cantidadPro)) &&
                  "Debe ser mayor que 0"}
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
    <div>
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
