import axios from "axios";

const URL = "http://localhost:5000/";

const validarProducto = async (nombre_pro, codigo_pro) => {
  let producto = {};
  let producto2 = {};
  const result = false;
  
  try {
    const response = await axios.get(`${URL}producto/nom/${nombre_pro}`);
    producto = response.data;
    console.log(producto)
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await axios.get(`${URL}producto/cod/${codigo_pro}`);
    producto2 = response.data;
    console.log(producto2)
  } catch (error) {
    console.error(error);
  }
  
  if (producto.length === 1 || producto2.length === 1) {    
      return true;
  } else {
    return false;
  }

};

const post = async (body) => {
  try {
    const response = await axios.post(`${URL}producto`, body);
    return response.data.persona_id;
  } catch (error) {
    console.error(error);
  }
};


export { validarProducto, post };