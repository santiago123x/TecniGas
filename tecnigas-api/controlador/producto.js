const pool = require("./conexion");

const getProducto = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM Producto ORDER BY producto_id"
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const postProducto = async (req, res) => {
  try {
    const {
      id_categoria,
      nombre,
      precio_uni,
      precio_may,
      cantidad,
      stock_min,
      codigo_pro,
    } = req.body;
    const response = await pool.query(
      `INSERT INTO producto(id_categoria, nombre,precio_uni,precio_may,cantidad,stock_min, codigo_pro)
       VALUES(${id_categoria},'${nombre}',${precio_uni},${precio_may},${cantidad},${stock_min},${codigo_pro})`
    );
    res.json("Se Agrego el Producto");
  } catch (e) {
    console.error(e);
  }
};

const putProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const {
      id_categoria,
      nombre,
      precio_uni,
      precio_may,
      cantidad,
      stock_min,
      codigo_pro,
    } = req.body;
    const response = await pool.query(
      `UPDATE producto SET id_categoria = ${id_categoria}, nombre  = '${nombre}',
      precio_uni  = ${precio_uni}, precio_may  = ${precio_may}, cantidad  = ${cantidad}, 
      stock_min  = ${stock_min}, codigo_pro  = ${codigo_pro}
    WHERE producto_id = ${producto_id}`
    );
    res.json("Se Actualizo el Producto");
  } catch (e) {
    console.error(e);
  }
};

const delProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const response = await pool.query(
      `DELETE FROM producto WHERE producto_id = ${producto_id}`
    );
    res.json("Se elimino el Producto");
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getProducto,
  putProducto,
  postProducto,
  delProducto,
};
