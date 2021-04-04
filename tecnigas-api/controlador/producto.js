const pool = require("./conexion");

const getProducto = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from producto join  categoria 
      on categoria.id_categoria = producto.id_categoria order by codigo_pro`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getProductoId = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const response = await pool.query(
      `select * from producto join  categoria 
      on categoria.id_categoria = producto.id_categoria 
      where producto_id = ${producto_id}  order by codigo_pro`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getProductoNom = async (req, res) => {
  try {
    const { nombre_pro } = req.params;
    const response = await pool.query(
      `select * from producto join  categoria 
      on categoria.id_categoria = producto.id_categoria 
      where nombre_pro = '${nombre_pro}'  order by codigo_pro`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getProductoCod = async (req, res) => {
  try {
    const { codigo_pro } = req.params;
    const response = await pool.query(
      `select * from producto join  categoria 
      on categoria.id_categoria = producto.id_categoria 
      where codigo_pro = ${codigo_pro}  order by codigo_pro`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getProductoCat = async (req, res) => {
  try {
    const { nombre_catg } = req.params;
    const response = await pool.query(
      `select * from producto join  categoria 
      on categoria.id_categoria = producto.id_categoria 
      where nombre_catg = '${nombre_catg}'  order by codigo_pro`
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
      nombre_pro,
      precio_uni,
      precio_may,
      cantidad_pro,
      stock_min,
      codigo_pro,
    } = req.body;
    const response = await pool.query(
      `INSERT INTO producto(id_categoria, nombre_pro,precio_uni,precio_may,cantidad_pro,stock_min, codigo_pro)
       VALUES(${id_categoria},'${nombre_pro}',${precio_uni},${precio_may},${cantidad_pro},${stock_min},${codigo_pro})
       returning producto_id`
    );
    res.send(response.rows);
    //res.json("Se Agrego el Producto");
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
  getProductoCod,
  getProductoId,
  getProductoNom,
  getProductoCat,
  putProducto,
  postProducto,
  delProducto,
};
