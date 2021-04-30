
const validarStock = async (id, cantidad) => {

  const producto = await (await fetch(`http://localhost:5000/producto/id/${id}`)).json();
  const stock = producto[0].cantidad_pro;
  
  return (stock >= cantidad);
   

}

export default validarStock;