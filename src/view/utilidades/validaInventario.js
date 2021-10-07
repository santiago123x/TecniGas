import axios from "axios";

/**
*Valida si existe Stock suficiente en la bases de datos
*asincrona se puede usar con await para esperar la respuesta
*retorna un boolean
*
*@param id  Id del producto a buscar
*@param cantidad  cantidad del producto a verificar 
*/
const validarStock = async (id, cantidad) => {
  const producto = await (await axios.get(`/producto/id/${id}`)).data
  const stock = producto[0].cantidad_pro;
  const result = stock >= cantidad;
  return result;
}

export default validarStock;