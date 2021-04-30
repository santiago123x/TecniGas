import React, { useEffect, useState } from "react";
import "./Compra.css";
import Tablacompra from "./Tablacompra"
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import useAxios from "../../Hooks/useAxios";
import moneda from '../../utilidades/moneda';
import axios from "axios";
import { Alert } from "bootstrap";
import MiFilter from '../../Componentes/MiFilter/Mifilter';
import MiInput from '../../Componentes/MiInput/MiInput';


const Compra = () => {
  const productos = useAxios(`/producto/`);
  const proveedores = useAxios(`/proveedor/`);
  const date = new Date();
  const fechaActu = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const [compraVacia, setCompraVacia] = useState(true);
  const [proveedor, setProveedor] = useState(null);
  const [fecha, setFecha] = useState(fechaActu.toISOString().substr(0, 10));
  const [observacion, setObservacion] = useState("");
  const [compraDet, setCompraDet] = useState([]);
  const [produ, setProdu] = useState(null);
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState();
  const [totalDet, setTotalDet] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  const calcularTotalDetalle = () => {
    setTotalDet(cantidad * precio);
  };

  const calcularTotalCompra = () => {
    let suma = 0;
    compraDet.map((det) => (suma = det.totalDet + suma));
    setTotalCompra(suma);
  };

  const verificaCompra = () => {
    if (compraDet.length > 0 && proveedor != null)
      setCompraVacia(false);
    else
      setCompraVacia(true);
  };

  useEffect(() => {
    calcularTotalDetalle();
  }, [precio, cantidad]);

  useEffect(() => {
    calcularTotalCompra();
    verificaCompra();
  }, [compraDet, proveedor]);

  const registrarDet = e => {
    e.preventDefault();
    const nuevoDet = {
      producto_id: produ.producto_id,
      nombre_pro: produ.nombre_pro,
      precio: precio,
      cantidad: cantidad,
      totalDet: totalDet,
    };
    const detalles = [...compraDet, nuevoDet];
    setPrecio("");
    setCantidad("");
    setProdu(null);
    setCompraDet(detalles);
  };

  const guardarCompra = async () => {
    const body = {
      id_usuario: 2,
      fecha_ent: fecha,
      coment_cpra: observacion,
      total_gral: totalCompra,
      proveedor_id: proveedor.id_clipro,
    };
    await axios({
      method: "post",
      url: "http://localhost:5000/compra/",
      data: body,
    }).then(response => {
      if (response.status === 200) {
        const id = response.data[0].compra_id;
        guardarDetalles(id);
      } else
        alert("Ha susedido un problema intente mas tarde")
    });
  };

  const guardarDetalles = (id) => {
    let nuevoBodyDet;
    compraDet.map(async det => {
      nuevoBodyDet = {
        producto_id: det.producto_id,
        cantidad_pd: det.cantidad,
        precio_cpra: det.precio,
        total_pd: det.totalDet,
        compra_id: id,
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/compraDet/",
        data: nuevoBodyDet,
      });
    }) 
  }

  const optionLabelProvee = (opcion) => {
    return `${opcion.nombre_pe}`
  }

  const optionLabelProduc = (opcion) => {
    return `${opcion.codigo_pro} - ${opcion.nombre_pro}`
  }

  const filtroProveedor = ['nombre_pe', 'identificacion'];

  const filtroProducto = ['nombre_pro', 'codigo_pro'];


  const guardar = () => {
    guardarCompra();
  }

  return (
    <div className="conten-compras" id="compra">
      <div className="formularios">
        <div className="conten-form info">
          <form className="form" id="form-info">
            <MiFilter
              data={proveedores.data}
              optionesFiltro={filtroProveedor}
              value={proveedor}
              setValue={setProveedor}
              tamaño={250}
              id='proveedor'
              label='Proveedor'
              optionLabel={optionLabelProvee}
            />
            <MiInput
              id="total"
              label="Total"
              variant="outlined"
              size="small"
              disabled
              value={moneda(totalCompra)}
            />
            <MiInput
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
                setFecha(evento.target.value)
              }}
            />
            <MiInput
              id="observacion"
              label="Observacion"
              multiline
              rows={4}
              value={observacion}
              variant="outlined"
              size="small"
              onChange={(evento) => {
                setObservacion(evento.target.value)
              }}
              inputProps={{
                maxLength: 150
              }}
            />
          </form>
        </div>

        <div className="conten-form produ">
          <form className="form" id="form-produc" onSubmit={(e) => registrarDet(e)}>
            <MiFilter
              id="producto"
              label="Producto"
              tamaño={200}
              data={productos.data}
              value={produ}
              optionesFiltro={filtroProducto}
              optionLabel={optionLabelProduc}
              setValue={setProdu}
            />
            <MiInput
              id="cantidad"
              label="Cantidad"
              variant="outlined"
              size="small"
              type="number"
              value={cantidad}
              onChange={(evento) => {
                setCantidad(parseInt(evento.target.value));
              }}
              inputProps={{
                min: 1,
              }}
              required
            />
            <MiInput
              id="precio"
              label="Precio Uni"
              variant="outlined"
              size="small"
              type="number"
              value={precio}
              onChange={(evento) => {
                setPrecio(parseInt(evento.target.value));
              }}
              inputProps={{
                min: 1,
              }}
              required
            />
            <MiButton variant="contained" color="primary" type="submit">
              Agregar
            </MiButton>
          </form>
        </div>
      </div>

      <div className="conten-tabla">
        <Tablacompra compraDet={compraDet} setCompraDet={setCompraDet} />
      </div>

      <div className="conten-button-compra">
        <MiButton variant="contained" color="primary" disabled={compraVacia} onClick={() => { guardar() }} >
          Terminar Compra
        </MiButton>
      </div>
    </div>
  );
};

export default Compra;

const MiButton = withStyles((theme) => ({
  root: {
    height: "30px",
  },
}))(Button);
