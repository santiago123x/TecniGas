import axios from "axios";

const URL = "http://localhost:5000/";

const validarProducto = async (nombre_pro, codigo_pro) => {
  let producto = {};
  let producto2 = {};

  try {
    const response = await axios.get(`${URL}producto/nom/${nombre_pro}`);
    producto = response.data;
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await axios.get(`${URL}producto/cod/${codigo_pro}`);
    producto2 = response.data;
  } catch (error) {
    console.error(error);
  }

  if (
    (producto.length === 1 && producto[0].estado_pro == "activado") ||
    producto2.length === 1
  ) {
    return "encontrado";
  } else if (producto.length === 1 && producto[0].estado_pro == "desactivado") {
    return "desactivado";
  } else {
    return "noencontrado";
  }
};

const validarProd = async (nombre, codigo) => {
  let producto = null;
  let resultado = false;
  try {
    const response = await axios.get(`${URL}producto/nom/${nombre}`);
    producto = response.data[0];
    if (!producto) {
      resultado = false;
    } else if (
      producto.nombre_pro == nombre &&
      producto.codigo_pro !== codigo
    ) {
      resultado = true;
    }
  } catch (error) {
    console.error(error);
  }

  return resultado;
};

const post = async (body) => {
  try {
    const response = await axios.post(`${URL}producto`, body);
    return response.data.producto_id;
  } catch (error) {
    console.error(error);
  }
};

const putP = async (idProd, body) => {
  try {
    const response = await axios.put(`${URL}producto/${idProd}`, body);
    return true;
  } catch (err) {
    return false;
  }
};

const hideProducto = async (producto_id) => {
  try {
    const response = await axios.put(`${URL}product/${producto_id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const validaTodo = (data) => {
  let bool = false;
  Object.keys(data).forEach((dat) => {
    if (dat !== "codigoPro") {
      if (data[dat].length == 0) {
        bool = true;
      }
    }
  });
  return bool;
};

const validaMenor0 = (numero) => {
  let bool = false;
  if (numero !== "") {
    if (numero < 0) {
      bool = true;
    }
  }
  return bool;
};
export {
  validarProducto,
  post,
  hideProducto,
  putP,
  validarProd,
  validaTodo,
  validaMenor0,
};
