import axios from "axios";

const URL = "http://localhost:5000/";
let dev_id = {};

const getDetalleVen = async (cod_venta) => {
    let detalle = {};
    try {
        const response = await axios.get(`${URL}ventadetalle/${cod_venta}`);
        detalle = response.data;
        if (detalle !== "" && detalle !== null){
            return detalle;
            } else {
              return false;
        }
    } catch (error) {
        console.error(error);
    }
};

const validaPro = async (idPro) => {
    let dato = {};
    try {
        const response = await axios.get(`${URL}producto/id/${idPro}`);
        dato = response.data;
        if (dato !== "" && dato !== null){
            return dato;
        } else {
            return false;
        }
    } catch (error) {
       console.error(error); 
    }
};

const getProdDeta = async (idVent, idPro) => {
    let info = {};
    try {
        const response = await axios.get(`${URL}detapro/${idVent}/${idPro}`);
        info = response.data;
        if (info !== "" && info !== null) {
            return info;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
};

const putDetaVent = async (id_venta, id_producto, body) => {
    let respuesta = false;
    let dato = {};
    let bodyDet = {};
    try {
        const detalle = await axios.get(`${URL}ventadetalle/${id_venta}/${id_producto}`);
        dato = detalle.data;
        bodyDet = {
            cantidad_ven : dato.cantidad_ven - body.cantidad_ven,
            precio_ven : body.precio_ven,
            total_ven : (dato.cantidad_ven - body.cantidad_ven) * body.total_ven 
        };
        try {
            const response = await axios.put(`${URL}ventadetalle/${id_venta}/${id_producto}`, bodyDet);
            respuesta = true;
            return respuesta;
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
    return respuesta;
};

const putVenta = async (id_venta, body) => {
    let respuesta = false;
    try {
        const response = await axios.put(`${URL}venta/${id_venta}`, body);
        respuesta = true;
        return respuesta;
    } catch (error) {
        console.error(error);
    }
    return respuesta;
};

const putProducto = async (id_producto, cantidad_pro) => {
    let respuesta = false;
    let dato = {};
    let numero = 0;
    let cantidadProducto = 0;
    try {
        const resp = await axios.get(`${URL}producto/id/${id_producto}`);
        dato =  resp.data;
        try {
            if(dato[0].estado_pro === "desactivado"){
                cantidadProducto = cantidad_pro;
            } else if (dato[0].estado_pro === "activado"){
                numero = dato[0].cantidad_pro;
                cantidadProducto = Number(numero) + Number(cantidad_pro);
            }
            const response = await axios.put(`${URL}productodev/${id_producto}/${cantidadProducto}`);
            respuesta = true;
            return respuesta;
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
    return respuesta;
};

const devolucion = async (id_venta, body) => {
    let respuesta = false;
    let dato = {};
    try {
        const response = await axios.get(`${URL}devolucion/${id_venta}`);
        dato = response.data;
        if(dato !== ""){
            try {
                const editar = await axios.put(`${URL}devolucion/${dato.devolucion_id}`, body);
                dato = editar.data;
                dev_id = dato[0];
                return dato[0];   
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post(`${URL}devolucion`, body);
                dato = response.data;
                dev_id = dato[0];
                return dato[0];
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error(error);
         
    }
    return respuesta;
};

const detalleDev = async (producto_id, body) => {
    let respuesta = false;
    let dato = {};
    let bodyDetalle = {
        devolucion_id : dev_id.devolucion_id,
        producto_id : producto_id,
        cantidad_det : body.cantidad_det,
        precio_uni : body.precio_uni,
        precio_tot : body.precio_total
    };
    try {
        const response = await axios.get(`${URL}detadevo/${dev_id.devolucion_id}/${producto_id}`);
        dato = response.data;
        if(dato !== ""){
            try {
                const editar = await axios.put(`${URL}detadevo/${dato.id_detalle}`, bodyDetalle);
                respuesta = true;
                if(respuesta){
                    return respuesta;
                }   
            } catch (error) {
               console.error(error); 
               
            }
        } else {
            try {
                const post = await axios.post(`${URL}detadevo`, bodyDetalle);
                respuesta = true;
                if(respuesta){
                    return respuesta;
                }  
            } catch (error) {
                console.error(error);
                
            }
        }
    } catch (error) {
        console.error(error);
        
    }
    return respuesta;
};

export {
    validaPro,
    getDetalleVen,
    getProdDeta,
    putDetaVent,
    putVenta,
    putProducto,
    devolucion,
    detalleDev
};