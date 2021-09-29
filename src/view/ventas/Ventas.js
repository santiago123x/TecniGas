import "./ventas.css";
import Button from '@material-ui/core/Button';
import { useState, useEffect, useContext } from "react";
import IvaContext from "../Context/Iva/IvaContext";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DenseTable from "./tabla_ventas.js";
import useAxios from "../Hooks/useAxios";
import { matchSorter } from "match-sorter";
import {
  BootstrapInput, MiInput2, MiFilter2
} from "./estilo_componentes/estilos";
import { notify } from "../Componentes/notify/Notify";
import Formulario from "../cli-prov/formulario/formulario";
import {validaVentas} from "./validador/ValidaVenta";
import { RiCoinsLine } from "react-icons/ri";
import axios from 'axios';
import useAuth from "../Hooks/useAuth";
import UserContext from '../Context/User/UserContext';



function createRow(codigo, nombre, cantidad, precio, descuento, subtotal) {
  return { codigo, nombre, cantidad, precio, descuento, subtotal };
}






const Ventas = () => {

  //Estados iniciales (useState)
  const auth = useAuth();
  const {user} = useContext(UserContext);
  const [estado, setEstado] = useState(0);
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
  const [observacion, setObservacion] = useState("");
  const [recarga, setRecarga] = useState(false);
  const [recarga2, setRecarga2] = useState(false);
  const [cambio, setCambio] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalIva, setTotalIva] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [urlClientes, setUrlClientes] = useState(`/clipers`);
  const [inputClientes, setInputClientes] = useState({ cliente: "", documento: "" });
  const [idVenta, setIdVenta] = useState("");
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
  const { iva: { iva } } = useContext(IvaContext);
  const idVentaAnt = useAxios("/lastventa", recarga2).data.max;
  const usuario = user.user.usuario_id;
  


  //Funciones

  const limpiaVenta = () => {
     setInputClientes({ cliente: "", documento: "" });
     setRecarga2(!recarga2);
     setObservacion("");
     setIdVenta(idVenta + 1);
     setEstado(0);
     setSubtotal(0);
     setTotalIva(0);
     setTotal(0);
     setTotal({
       ...total, total: 0, recibido: 0
     });
     setCambio(0);
    setRows([]);    
  }

  const postVenta = async (body) => {
    try {
      const response = await axios.post(`http://localhost:5000/postventa`, body);
      return true;
    } catch (error) {
      return false;
    }
  };

  const postDetalleVenta = async (body) => {
    try {
      const response = await axios.post(`http://localhost:5000/postdetalleventa`, body);      
    } catch (error) {      
    }
  };

  
  const putDescuentaUnidades = async (idProd, body) => {
    //console.log(idProd, body)
    try {
      const response = await axios.put(`http://localhost:5000/productocantidad/${idProd}`, body);
      return true;
    } catch (err) {
      return false;
    }
  };

  const realizarVenta = () => {
     
    if(validaVentas(inputClientes.cliente, estado, parseFloat(total.recibido),total.total,rows)){
      notify("Revise los datos de la venta", "", "error");
      return
    }
    let est = "";
    if (estado == 10) {
      est = "Pagado"
    } else if (estado == 20) {
      est = "Pendiente"
    }

    const body = {
      cliente_id: inputClientes.cliente.id_clipro,
      usuario_id: usuario,
      fecha_ve: fecha,
      iva: 1,
      total_iva: totalIva, 
      sub_total: subtotal,
      total_ve: total.total,
      observacion_vta: observacion,
      recibido: parseFloat(total.recibido),
      cambio: cambio,
      estado_ve: est,
    }

    let vendido = postVenta(body);    
    let idproducto = 0;
    let cantidadProd = 0;
   
    rows.forEach((r)=> {
      data.data.map((d)=>{
        if(d.codigo_pro == r.codigo){
          idproducto = d.producto_id;
          cantidadProd = d.cantidad_pro;
                   
        }        
      })
      
      

      const body2 = {
        id_venta: idVenta,
        producto_id: idproducto,
        descuento: parseFloat(r.descuento),
        cantidad_ven: parseInt(r.cantidad),
        precio_ven: r.precio,
        total_ven: r.subtotal,
      }

      const body3 = {
        cantidad_pro: (cantidadProd - parseInt(r.cantidad))
      }

      
      
      putDescuentaUnidades(idproducto, body3)  
           
      postDetalleVenta(body2);      
    })

      
    
    if(vendido){
      limpiaVenta();
      notify("Compra exitosa", "", "info");
    }
    

  }

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

  const validaExistencias= (codigo, cantidad) => {
    let result = false;
    let producto = data.data.filter(p => p.codigo_pro == codigo);    

       if ( producto[0].cantidad_pro < cantidad) {
         result = true;
       }  
      
    
    return result;
  }

  //Agregar filas a la tabla

  const creaFilas = () => {
    

    if (productos == "" || cantidad < 1 || precioSel == "" || descuento < 0 || descuento > precioSel.pre) {
      notify("Verfique todos los campos", "", "error");
      return;
    } if (validaProd(productos.codigo_pro)) {
      notify("Este producto ya fue agregado a la compra", "", "error");
      setCantidad(0);
      setDescuento(0);
      setProductos("");
      setPrecioSel("");
      return;
    }if(validaExistencias(productos.codigo_pro, cantidad)){
      notify("Este producto no tiene suficientes existencias", "", "error");
      setCantidad(0);
      return;
    }


    const subtotal = (parseInt(precioSel.pre) - parseInt(descuento)) * parseInt(cantidad);
    const row = createRow(productos.codigo_pro, productos.nombre_pro, cantidad, precioSel.pre, descuento, subtotal);


    setRows([...rows, row]);
    setCantidad(0);
    setDescuento(0);
    setProductos("");
    setPrecioSel("");

  }

  //UseEffect's!

  useEffect(() => {
    if ((total.recibido >= total.total) && estado == 10) {
      setCambio(total.recibido - total.total);
    } else {
      setCambio(0);
    }

  }, [total.total, total.recibido, estado])

  useEffect(() => {
    setTotal({ ...total, total: rows.reduce((sum, li) => sum + li.subtotal, 0) })
  }, [rows])

  useEffect(() => {
    console.log();
    
    setSubtotal(isNaN(total.total - (total.total * iva)) ? 0 : total.total - (total.total * iva));
    setTotalIva(isNaN(total.total * iva) ? 0 :total.total * iva );

  }, [total.total, iva])

  useEffect(() => {
    //console.log(idVentaAnt);

    if(idVentaAnt == null){
      setIdVenta(1);
    }else{
      setIdVenta(idVentaAnt+1); 
    }
      
  }, [idVentaAnt])


  return (
    <>

      <div className="principal-container">
        <div className="flex-container-superior">
          <form className="formsuperior">

            <div className="form__section">
              <div className="filterClientes">
                <MiFilter2
                  id="cliente"
                  options={dataClientes.data}
                  style={{ width: 240 }}
                  value={inputClientes.cliente}
                  filterOptions={filterOptionsClientes}
                  getOptionLabel={(option) => option ? option.nombre_pe + " - " + option.identificacion : ''}
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
              <span className="span text-danger text-small d-block spanventas">
                {inputClientes.cliente.length == 0 && "Seleccione un Cliente"}
              </span>
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
                disabled
                label="Nro venta"
                variant="outlined"
                size="small"
                value={idVenta}
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
                value={observacion}
                onChange={(e) => { setObservacion(e.target.value) }}
                multiline
                variant="outlined"
                size="small" />


            </div>

            <div className="form__section">

              <Select
                defaultValue={0}
                input={<BootstrapInput />}
                value={estado}
                label="Estado"
                onChange={(e) => setEstado(e.target.value)}
              >
                <MenuItem default value={0} >Estado</MenuItem>
                <MenuItem value={10}>Pagado</MenuItem>
                <MenuItem value={20}>Pendiente</MenuItem>
              </Select>

              <span className="span text-danger text-small d-block spanventas">
                {estado == 0 && "Seleccione un estado para la venta"}
              </span>

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
                    setPrecioSel("");

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
              <span className="span text-danger text-small d-block spanventas">
                {cantidad <= 0 && "ingrese una cantidad válida"}
              </span>
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
              <span className="span text-danger text-small d-block spanventas">
                {descuento < 0 && "ingrese una descuento válido"}
              </span>
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
          <DenseTable rows={rows} setRows={setRows} />
        </div>
        <div className="flex-container-derecho">
          <div className="flex-container-derecho__form">
            <div className="flex-container-derecho__form__inputs">
              <div className="form__section">
                <MiInput2
                  disabled
                  label="Subtotal"
                  variant="outlined"
                  size="small"
                  value={subtotal}
                />
              </div>
              <div className="form__section">
                <MiInput2
                  disabled
                  label="Iva"
                  variant="outlined"
                  size="small"
                  value={totalIva}
                />
              </div>
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
                <span className="span text-danger text-small d-block spanventas">
                  {total.recibido < total.total && estado == 10 && "Ingrese un valor apropiado"}
                </span>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ maxHeight: 30 }}
                onClick={() => realizarVenta()}
                fullWidth>
          
                Pagar
              </Button>
            </div>
          </div>
        </div>


      </div>





    </>
  );
};

export default Ventas;
