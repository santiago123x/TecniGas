import axios from "axios";

let dev_id = {};

const getDetalleVen = async (cod_venta) => {
    let detalle = {};
    try {
        const response = await axios.get(`/ventadetalle/${cod_venta}`);
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
    let dato = [];
    try {
        const response = await axios.get(`/producto/id/${idPro}`);
        dato = response.data;
        
        if (dato !== "" && dato !== null){
            return dato;
        } else {
            return false;
        }
    } catch (error) {
       console.error(error);
       return null 
    }
};

const getProdDeta = async (idVent, idPro) => {
    let info = {};
    try {
        const response = await axios.get(`/detapro/${idVent}/${idPro}`);
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
        const detalle = await axios.get(`/ventadetalle/${id_venta}/${id_producto}`);
        dato = detalle.data;
        bodyDet = {
            cantidad_ven : dato.cantidad_ven - body.cantidad_ven,
            precio_ven : body.precio_ven,
            total_ven : (dato.cantidad_ven - body.cantidad_ven) * body.total_ven 
        };
        try {
            const response = await axios.put(`/ventadetalle/${id_venta}/${id_producto}`, bodyDet);
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
        const response = await axios.put(`/venta/${id_venta}`, body);
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
        const resp = await axios.get(`/producto/id/${id_producto}`);
        dato =  resp.data;
        try {
            if(dato[0].estado_pro === "desactivado"){
                cantidadProducto = cantidad_pro;
            } else if (dato[0].estado_pro === "activado"){
                numero = dato[0].cantidad_pro;
                cantidadProducto = Number(numero) + Number(cantidad_pro);
            }
            const response = await axios.put(`/productodev/${id_producto}/${cantidadProducto}`);
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

const devolucion = async (id_venta, body, orden) => {
    let respuesta = false;
    let dato = {};
    try {
        const response = await axios.get(`/devolucion/${id_venta}`);
        dato = response.data;
            try {
                const response = await axios.post(`/devolucion`, body);
                dato = response.data;
                dev_id = dato[0];
                return dato[0];
            } catch (error) {
                console.error(error);
            }
    } catch (error) {
        console.error(error);
         
    }
    return respuesta;
};

const detalleDev = async (producto_id, body, orden) => {
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
        const post = await axios.post(`/detadevo`, bodyDetalle);
        respuesta = true;
        if(respuesta){
            return respuesta;
        }  
    } catch (error) {
        console.error(error);
        
    }
   
    return respuesta;
};

const getCategoria = async (id_categoria) =>{
    let dato = "";
    try{
        const getCat = await axios.get(`/categoriaID/${id_categoria}`);
        dato = getCat.data;
    } catch(error) {
        console.error(error); 
    }
    return dato;
};

const listaDev = async() =>{
    let dato = [];
    try{
        const getList = await axios.get(`/listaDev/`);
        dato = getList.data;
    }catch(error) {
        console.error(error);
    }
    return dato;
};

const eliminaDetaDev = async(devolucion_id, producto_id) =>{
    let respuesta = false;
    try {
        const elimina = await axios.delete(`/detadevo/${devolucion_id}/${producto_id}`);
        respuesta = true;
    } catch (error) {
        console.error(error);
    }
    return respuesta;
};

const deleteDev = async(devolucion_id) =>{
    let respuesta = false;
    let dat = [];
    let producto_id;
    try {
        const datos = await axios.get(`/detadevo/${devolucion_id}`);
        dat = datos.data;
        
        dat.map(async(element) =>{
            const eliminador = await axios.delete(`/detadevo/${devolucion_id}/${element.producto_id}`);
        })
        const del = await axios.delete(`/devolucion/${devolucion_id}`);
        respuesta = true;
    } catch (error) {
        console.error(error);
    }
    return respuesta;
};

const putDetaDevo = async(devolucion_id, producto_id, body) =>{
    let respuesta = false;
    try {
        const put = await axios.put(`/detadevo/${devolucion_id}/${producto_id}`, body);
        respuesta = true;
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
    detalleDev,
    getCategoria,
    listaDev,
    eliminaDetaDev,
    deleteDev,
    putDetaDevo
};