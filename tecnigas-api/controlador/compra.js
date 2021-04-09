const pool = require("./conexion");

const getCompra = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from "compra producto"`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const postCompra = async (req, res) => {
  try {
    const {
      id_usuario,
      fecha_ent,
      coment_cpra,
      total_gral,
      proveedor_id
    } = req.body;
    const response = await pool.query(
      `INSERT INTO "compra producto"(id_usuario, fecha_ent, coment_cpra, total_gral, proveedor_id)
       VALUES(${id_usuario}, '${fecha_ent}', '${coment_cpra}', ${total_gral}, ${proveedor_id}) 
       Returning compra_id`
    );
    console.log(response.rows);
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const postCompraDet = async (req, res) => {
  try {
    const {
      producto_id,
      cantidad_pd,
      precio_cpra,
      total_pd,
      compra_id,
    } = req.body;
    const response = await pool.query(
      `INSERT INTO pedido (producto_id, cantidad_pd, precio_cpra, total_pd, compra_id)
       VALUES(${producto_id}, ${cantidad_pd}, ${precio_cpra}, ${total_pd}, ${compra_id})`
    );
    console.log("Detalle agregado con exito");
    res.json("Detalle agregado con exito");
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getCompra,
  postCompra,
  postCompraDet,
};