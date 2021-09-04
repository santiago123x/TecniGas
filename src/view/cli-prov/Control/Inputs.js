import React from "react";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { validarTelefono, validarEmail, validaMenor0 } from "./validacionInp";

const Inputs = ({
  classes,
  register,
  handleInputChange,
  datos,
  tipo,
  dataCategoria,
}) => {
  const printSelect = () => {
    const inputs = (
      <>
        <div className="row">
          <Select
            native
            variant="outlined"
            value={datos.id_categoria}
            onChange={handleInputChange}
            label="Categoria"
            className={classes.select}
            name="id_categoria"
            inputRef={register}
            inputProps={{
              name: "id_categoria",
              id: "id_categoria",
            }}
          >
            {dataCategoria.map((cat, index) => {
              return (
                <option className="option" key={index} value={cat.id_categoria}>
                  {cat.nombre_catg}
                </option>
              );
            })}
          </Select>
          <span className="span text-danger text-small d-block"></span>
        </div>
      </>
    );

    return inputs;
  };
  return (
    <>
    {tipo === 'cat' ? 
    
    (
      <div className="row">
      <TextField
      className={classes.textfield}
      variant="outlined"
      size="small"
      type="text"
      name={ "nombre_catg"}
      value={datos.nombre_catg}
      label={"Categoria"}
      onChange={handleInputChange}
      inputRef={register}
      />
      <span className="span text-danger text-small d-block">
        {tipo === "cat"
          ? datos.nombre_catg.length === 0 && "Campo requerido"
          : datos.nombre_catg.length === 0 && "Campo requerido"}
      </span>
      </div>
    )
    :
    (
      <>
      <div className="row">
        <TextField
          className={classes.textfield}
          variant="outlined"
          size="small"
          type="text"
          name={tipo === "inv" ? "nombre_pro" : "nombre_pe"}
          value={tipo === "inv" ? datos.nombre_pro : datos.nombre_pe}
          label={tipo === "inv" ? "Nombre del Producto" : "Nombre - Empresa"}
          onChange={handleInputChange}
          inputRef={register}
        />
        <span className="span text-danger text-small d-block">
          {tipo === "inv"
            ? datos.nombre_pro.length === 0 && "Campo requerido"
            : datos.nombre_pe.length === 0 && "Campo requerido"}
        </span>
      </div>
      <div className="row">
        <TextField
          className={classes.textfield}
          variant="outlined"
          size="small"
          type={tipo === "inv" ? "number" : "text"}
          name={tipo === "inv" ? "stock_min" : "identificacion"}
          value={tipo === "inv" ? datos.stock_min : datos.identificacion}
          label={tipo === "inv" ? "Cantidad Minima" : "Identificación - NIT"}
          onChange={handleInputChange}
          inputRef={register}
        />
        <span className="span text-danger text-small d-block">
          {tipo === "inv"
            ? datos.stock_min.length === 0 && "Campo requerido"
            : datos.identificacion.length === 0 && "Campo requerido"}
          {tipo === "inv" &&
            validaMenor0(parseInt(datos.stock_min)) &&
            "Debe ser mayor que 0"}
        </span>
      </div>
      <div className="row">
        <TextField
          className={classes.textfield}
          variant="outlined"
          size="small"
          type={tipo === "inv" ? "number" : "email"}
          name={tipo === "inv" ? "cantidad_pro" : "email"}
          label={tipo === "inv" ? "Cantidad" : "Correo Electrónico"}
          value={tipo === "inv" ? datos.cantidad_pro : datos.email}
          onChange={handleInputChange}
          inputRef={register}
        />
        <span className="span text-danger text-small d-block">
          {tipo === "inv"
            ? datos.cantidad_pro.length === 0 && "Campo requerido"
            : datos.email.length === 0 && "Campo requerido"}
          {tipo === "inv" &&
            validaMenor0(parseInt(datos.cantidad_pro)) &&
            "Debe ser mayor que 0"}
          {tipo !== "inv" &&
            validarEmail(datos.email) &&
            "Debe ser un Email valido Ej: ej@ej.com"}
        </span>
      </div>
      {tipo === "inv" && printSelect()}
      <div className="row">
        <TextField
          className={classes.textfield}
          variant="outlined"
          size="small"
          type={tipo === "inv" ? "number" : "text"}
          name={tipo === "inv" ? "precio_may" : "direccion"}
          label={tipo === "inv" ? "Precio Mayorista" : "Dirección"}
          value={tipo === "inv" ? datos.precio_may : datos.direccion}
          onChange={handleInputChange}
          inputRef={register}
        />
        <span className="span text-danger text-small d-block">
          {tipo === "inv"
            ? datos.precio_may.length === 0 && "Campo requerido"
            : datos.direccion.length === 0 && "Campo requerido"}
          {tipo === "inv" &&
            validaMenor0(parseFloat(datos.precio_may)) &&
            "Debe ser mayor que 0"}
        </span>
      </div>
      <div className="row">
        <TextField
          className={classes.textfield}
          variant="outlined"
          size="small"
          type="number"
          name={tipo === "inv" ? "precio_uni" : "telefono"}
          label={tipo === "inv" ? "Precio Publico" : "Teléfono"}
          value={tipo === "inv" ? datos.precio_uni : datos.telefono}
          onChange={handleInputChange}
          inputRef={register}
        />
        <span className="span text-danger text-small d-block">
          {tipo === "inv"
            ? datos.precio_uni.length === 0 && "Campo requerido"
            : datos.telefono.length === 0 && "Campo requerido"}
          {tipo === "inv" &&
            validaMenor0(parseFloat(datos.precio_uni)) &&
            "Debe ser mayor que 0"}
          {tipo !== "inv" &&
            validarTelefono(datos.telefono) &&
            "El telefono debe tener entre 7 y 12 caracteres"}
        </span>
      </div>
      </>
      )
      }
    </>
  );
};

export default Inputs;
