import axios from "axios";

const URL = "https://tecnigas-api.herokuapp.com/";

const getDetalleVen = async (cod_venta) => {
    let detalle = {};
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
    let dato = {};
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
    let info = {};
    try {
        const response = await axios.get(`${URL}detavenp/${idVent}/${idPro}`);
        info = response.data;
    } catch (error) {
        console.error(error);
    }

    if (info !== "") {
        return info;
    } else {
        return false;
    }
};

export {
    validaPro,
    getDetalleVen,
    getProdDeta,
};