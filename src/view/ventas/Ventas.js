import "./ventas.css";
import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DenseTable from "./tabla_ventas.js";
import useAxios from "../Hooks/useAxios";
import { matchSorter } from "match-sorter";
import {
  BootstrapInput, MiInput2, MiFilter2
} from "./estilo_componentes/estilos";
import { notify } from "../Componentes/notify/Notify";
import { ToastContainer } from "react-toastify";
import Formulario from "../cli-prov/formulario/formulario";






function createRow(codigo, nombre, cantidad, precio, descuento, subtotal) {
  return { codigo, nombre, cantidad, precio, descuento, subtotal };
}






const Ventas = () => {

  //Estados iniciales (useState)
  const [rows, setRows] = useState([]);
  const [url, setUrl] = useState(`/producto/`);
  const data = useAxios(url);
  const [productos, setProductos] = useState("");
  const [precios, setPrecios] = useState([]);
  const [precioSel, setPrecioSel] = useState("");
  const [total, setTotal] = useState({
    total: 0,
    recibido: 0,
  })
  const [recarga, setRecarga] = useState(false);
  const [cambio, setCambio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [urlClientes, setUrlClientes] = useState(`/clipers`);
  const [inputClientes, setInputClientes] = useState({ cliente: "", documento: "" });
  const date = new Date();
  const fechaActu = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const [fecha, setFecha] = useState(fechaActu.toISOString().substr(0, 10));
  const dataClientes = useAxios(urlClientes, recarga);

  // Constantes iniciales
  const filterOptionsClientes2 = ["nombre_pe", "identificacion"];
  const iva = 0.19;
  
  

  //Funciones

  const calcularTotal = (antsub) => {

    setTotal({
      ...total, total: total.total + antsub
    })
  }

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: ["nombre_pro", "codigo_pro"],
      threshold: matchSorter.rankings.CONTAINS,
    });

  const filterOptionsClientes = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: ["nombre_pe", "identificacion"],
      threshold: matchSorter.rankings.CONTAINS,
    });

  const optionLabelCliente = (opcion) => {
    return `${opcion.identificacion + " - " + opcion.nombre_pe}`;
  };

  const validaProd = (codigo) => {
    let result = false;
    rows.forEach((row) => {

      if (row.codigo == codigo) {

        result = true;
      }

    })
    return result;
  }

  //Agregar filas a la tabla

  const creaFilas = () => {

    if (productos == "" || cantidad == 0 || precioSel == "") {
      notify("Debe llenar todos los campos", "", "error");
      return;
    } if (validaProd(productos.codigo_pro)) {
      notify("Este producto ya fue agregado a la compra", "", "error");
      setCantidad(0);
      setDescuento(0);
      setProductos("");
      setPrecioSel("");
      return;
    }
    const productConIva = parseInt(precioSel.pre) + (parseInt(precioSel.pre) * iva);
    const subtotal = (productConIva - parseInt(descuento)) * parseInt(cantidad);
    const row = createRow(productos.codigo_pro, productos.nombre_pro, cantidad, precioSel.pre, descuento, subtotal);
    setRows([...rows, row]);
    setCantidad(0);
    setDescuento(0);
    setProductos("");
    setPrecioSel("");

  }

  //UseEffect's!

  useEffect(() => {
    if (total.recibido >= total.total) {
      setCambio(total.recibido - total.total);
    } else {
      setCambio("Recibido invalido");
    }

  }, [total.total, total.recibido])

  useEffect(() => {
    setTotal({ ...total, total: rows.reduce((sum, li) => sum + li.subtotal, 0) })
  }, [rows])

  return (
    <>

      <div className="principal-container">
        <div className="flex-container-superior">
          <form className="formsuperior">

            <div className="form__section">
              <MiFilter2
                id="cliente"
                options={dataClientes.data}
                style={{ width: 240 }}
                value={inputClientes.cliente}
                filterOptions={filterOptionsClientes}
                getOptionLabel={(option) => option ? option.identificacion + " - " + option.nombre_pe : ''}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setInputClientes({ cliente: newValue, documento: newValue.identificacion })

                  } else {
                    setInputClientes({ cliente: "", documento: "" })

                  }
                }}
                renderInput={(params) => (
                  <MiInput2
                    {...params}
                    id="inputCliente"
                    label="Cliente"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <Formulario
                recarga={recarga}
                setRecarga={setRecarga}
                tipo="cliente"
                metodo="post"
                titulo="Crear Cliente"
                imagen="cli"
                tipoButton="false"
              />

            </div>
            <div className="form__section">
              <MiInput2
                label="Documento"
                disabled="true"
                value={inputClientes.documento}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="form__section">
              <MiInput2
                label="Nro venta"
                variant="outlined"
                size="small"
              />
            </div>

            <div className="form__section">
              <MiInput2
                id="date"
                label="Fecha"
                type="date"
                value={fecha}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evento) => {
                  setFecha(evento.target.value);
                }}
              />
            </div>
            <div className="form__section">
              <MiInput2
                style={{ width: '17vw' }}
                label="Nota"
                placeholder="Digite su Nota"
                rows={3}
                multiline
                variant="outlined"
                size="small" />


            </div>

            <div className="form__section">

              <Select
                defaultValue={0}
                input={<BootstrapInput />}
                label="Estado"

              >
                <MenuItem default value={0} >Estado</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

            </div>

          </form>
        </div>
        <div className="flex-container-intermedio">
          <form className="formintermedio">
            <div className="form__section">
              <MiFilter2
                id="producto"
                style={{ width: 200 }}
                options={data.data}
                value={productos}
                filterOptions={filterOptions}
                getOptionLabel={(option) => option ? option.codigo_pro + " - " + option.nombre_pro : ''}
                onChange={(event, newValue) => {
                  //newValue !== null ?
                  if (newValue !== null) {
                    setProductos(newValue);
                    setPrecios([{ pre: newValue.precio_may, index: "Precio As: $" },
                    { pre: newValue.precio_uni, index: "Precio Pu: $" }])

                  } else {
                    setPrecios([])
                    setProductos(null);
                  }
                }}
                renderInput={(params) => (
                  <MiInput2
                    {...params}
                    id="inputproduc"
                    label="Producto"
                    variant="outlined"
                    size="small"

                  //onChange={handleChangeDet('producto')}
                  />
                )}
              />


            </div>
            <div className="form__section">
              <MiInput2
                type="number"
                label="Cantidad"
                variant="outlined"
                size="small"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>
            <div className="form__section">
              <MiFilter2
                id="precio"
                style={{ width: 200 }}
                options={precios}
                value={precioSel}
                getOptionLabel={(option) => option ? `$${option.pre}` : ''}

                onChange={(event, newValue) => {
                  setPrecioSel(newValue);
                }}
                renderOption={(option) => (
                  <>
                    <span>{option.index}</span>
                    {option.pre}  </>
                )}
                renderInput={(params) => (
                  <MiInput2
                    {...params}

                    id="inputprec"
                    label="Precio"
                    variant="outlined"
                    size="small"

                  />
                )}
              />
            </div>
            <div className="form__section">
              <MiInput2
                type="number"
                label="Descuento"
                variant="outlined"
                size="small"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
              />
            </div>
            <div className="form__section">
              <Button
                variant="contained"
                color="primary"
                onClick={() => creaFilas()}
              >
                Agregar
              </Button>
            </div>
          </form>

        </div>
        <div className="flex-container-tabla">
          <DenseTable rows={rows} />
        </div>
        <div className="flex-container-derecho">
          <div className="flex-container-derecho__form">
            <div className="flex-container-derecho__form__inputs">
              <div className="form__section">
                <MiInput2
                  disabled
                  label="Total"
                  variant="outlined"
                  size="small"
                  value={total.total}
                />
              </div>
              <div className="form__section">
                <MiInput2
                  type="number"
                  label="Recibido"
                  variant="outlined"
                  size="small"
                  value={total.recibido}
                  onChange={(e) => {
                    setTotal({ ...total, recibido: e.target.value })
                  }}
                />
              </div>
              <div className="form__section">
                               
                
                <MiInput2
                  disabled
                  label="Cambio"
                  variant="outlined"
                  size="small"
                  value={cambio}
                />
              </div>
            </div>

            <div className="form__section">
              <Button variant="contained" color="primary" style={{ maxHeight: 30 }} fullWidth>
                Pagar
              </Button>
            </div>
          </div>
        </div>
        <ToastContainer />

      </div>





    </>
  );
};

export default Ventas;
