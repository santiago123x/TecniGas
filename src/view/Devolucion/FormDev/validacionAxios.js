import axios from "axios";

const URL = "http://localhost:5000/";

const getDetalleVen = async (cod_venta) => {
    const detalle = {};
    try {
        const response = await axios.get(`${URL}ventadetalle/${cod_venta}`);
        detalle = response.data;
    } catch (error) {
        console.error(error);
    }

    if (detalle !== "")
    {
        return detalle;
    } else {
        return false;
    }
};

const validaPro = async (idPro) => {
    const dato = {};
    try {
        const response = await axios.get(`${URL}producto/id/${idPro}`);
        dato = response.data;
    } catch (error) {
       console.error(error); 
    }

    if (dato !== ""){
        return dato;
    } else {
        return false;
    }
};

const getProdDeta = async (idVent, idPro) => {
    const info = {};
    try {
        const response = await axios.get(`${URL}detavenpro/${idVent}/${idPro}`);
        info = response.data;
        return info;

    } catch (error) {
        console.error(error);
    }
};

export {
    validaPro,
    getDetalleVen,
    getProdDeta,
};