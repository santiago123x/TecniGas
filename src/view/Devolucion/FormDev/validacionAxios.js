import axios from "axios";

const URL = "http://localhost:5000/";

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
        const response = await axios.get(`${URL}detavenp/${idVent}/${idPro}`);
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

export {
    validaPro,
    getDetalleVen,
    getProdDeta,
};