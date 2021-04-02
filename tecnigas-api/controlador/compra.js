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
       VALUES(${id_usuario}, ${fecha_ent}, '${coment_cpra}', ${total_gral}, ${proveedor_id})`
    );
    res.json("Se Agrego el Producto");
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getCompra,
  postCompra,
};