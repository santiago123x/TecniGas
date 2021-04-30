import React from 'react'
import { TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';


const Inputs = ({classes,register,handleInputChange,datos,tipo,errors,dataCategoria}) => {
    
    const printSelect = ()=>{
   
    const inputs =  <>
        <div className="row">
        <Select
                native
                variant= "outlined"
                value={datos.id_categoria}
                onChange={handleInputChange}
                label="Categoria"
                className={classes.select}
                name= 'id_categoria'
                inputRef={register}
                inputProps={{
                  name: 'id_categoria',
                  id: 'id_categoria',
                }}
              >
                {dataCategoria.map((cat, index) => {
                  return(<option className="option" key={index} value={cat.id_categoria}>{cat.nombre_catg}</option>)
                })}        
              </Select>
            <span className="span text-danger text-small d-block">
                {errors.nombre_catg?.message}
            </span>
        </div>
  </>

  return inputs
  }
    return (
        <>
            <div className="row">
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    size="small"
                    type="text"
                    name={tipo=='inv'?'nombre_pro':"nombre_pe"}
                    value={tipo=='inv'?datos.nombre_pro: datos.nombre_pe}
                    label={tipo=='inv'?'Nombre del Producto' :"Nombre - Empresa"}
                    onChange={handleInputChange}
                    inputRef={register}
                  />
                  <span className="span text-danger text-small d-block">
                    {tipo=='inv'? errors.nombre_pro?.message:errors.nombre?.message}
                  </span>
                </div>
                <div className="row">
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    size="small"
                    type={tipo=='inv'?'number' :"text"}
                    name={tipo=='inv'?'stock_min' :"identificacion"}
                    value={tipo=='inv'?datos.stock_min: datos.identificacion}
                    label={tipo=='inv'?'Cantidad Minima' :"Identificación - NIT"}
                    onChange={handleInputChange}
                    inputRef={register}
                  />
                  <span className="span text-danger text-small d-block">
                    {tipo=='inv'? errors.stock_min?.message:errors.identificacion?.message}
                  </span>
                </div>
                <div className="row">
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    size="small"
                    type={tipo=='inv'?'number' :"email"}
                    name={tipo=='inv'?'cantidad_pro' :"email"}
                    label={tipo=='inv'?'Cantidad' :"Correo Electrónico"}
                    value={tipo=='inv'? datos.cantidad_pro :datos.email}
                    onChange={handleInputChange}
                    inputRef={register}
                  />
                  <span className="span text-danger text-small d-block">
                    {tipo=='inv'? errors.cantidad_pro?.message:errors.correo?.message}
                  </span>
                </div>
                {tipo=='inv'&& 
                    printSelect()
                }
                <div className="row">
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    size="small"
                    type={tipo=='inv'?'number' :"text"}
                    name={tipo=='inv'?'precio_may' :"direccion"}
                    label={tipo=='inv'?'Precio Mayorista' :"Dirección"}
                    value={tipo=='inv'? datos.precio_may :datos.direccion}
                    onChange={handleInputChange}
                    inputRef={register}
                  />
                  <span className="span text-danger text-small d-block">
                    {tipo=='inv'? errors.precio_may?.message:errors.direccion?.message}
                  </span>
                </div>
                <div className="row">
                  <TextField
                    className={classes.textfield}
                    variant="outlined"
                    size="small"
                    type="number"
                    name={tipo=='inv'?'precio_uni' :"telefono"}
                    label={tipo=='inv'?'Precio Publico' :"Teléfono"}
                    value={tipo=='inv'? datos.precio_uni :datos.telefono}
                    onChange={handleInputChange}
                    inputRef={register}
                  />
                  <span className="span text-danger text-small d-block">
                    {tipo=='inv'? errors.precio_uni?.message:errors.telefono?.message}
                  </span>
                </div>
                
        </>
    )
}

export default Inputs
