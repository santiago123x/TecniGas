const pool = require("./conexion");

const getDevolucion= async (req, res) => {
    try {
      const response = await pool.query(
        `SELECT * FROM devolucion ORDER BY devolucion_id`
      );
      res.send(response.rows);
    } catch (e) {
      console.error(e);
    }
  };

const getDev = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const response = await pool.query(
      `SELECT * FROM devolucion WHERE id_venta = ${id_venta}`
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.error(error);
  }
};

const getDetaDev = async (req, res) => {
  try {
    const devolucion_id = req.params.devolucion_id;
    const producto_id = req.params.producto_id;
    const response = await pool.query(
      `SELECT * FROM "detalle devolucion" WHERE devolucion_id = ${devolucion_id} AND producto_id = ${producto_id}`
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
}; 

const postDevolucion = async (req, res) => {
    try {
        const {
          id_venta,
          comentario_dev,
          fecha_dev,
          total_gral_d  
        } = req.body;
        const response = await pool.query(
            `INSERT INTO devolucion(id_venta,comentario_dev,fecha_dev,total_gral_d)
            VALUES(${id_venta},'${comentario_dev}', CAST ('${fecha_dev}' AS DATE) , ${total_gral_d}) RETURNING devolucion_id`
        );
        res.send(response.rows);
    } catch (error) {
      console.error(error);
    }
  };

const postDetaDev = async (req, res) => {
  try {
    const {
      devolucion_id,
      producto_id,
      cantidad_det,
      precio_uni,
      precio_tot
    } = req.body;
    const response = await pool.query(
      `INSERT INTO "detalle devolucion"(devolucion_id, producto_id , cantidad_det , precio_uni , precio_tot)
      VALUES(${devolucion_id}, ${producto_id}, ${cantidad_det}, ${precio_uni}, ${precio_tot})`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const putDevolucion = async (req, res) => {
  try {
    const devolucion_id = req.params.devolucion_id;
    const {
    id_venta,
    comentario_dev,
    fecha_dev,
    total_gral_d
  } = req.body;
    const response = await pool.query(
      `UPDATE devolucion SET id_venta = ${id_venta}, comentario_dev = '${comentario_dev}', fecha_dev = CAST ('${fecha_dev}' AS DATE), 
      total_gral_d = ${total_gral_d} WHERE devolucion_id = ${devolucion_id} RETURNING devolucion_id`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(error);
  }
};

const putDetaDev = async (req, res) => {
  try {
    const id_detalle = req.params.id_detalle;
    const {
    cantidad_det,
    precio_uni,
    precio_tot
  } = req.body;
    const response = await pool.query(
      `UPDATE "detalle devolucion" SET cantidad_det = ${cantidad_det}, precio_uni = ${precio_uni}, precio_tot = ${precio_tot}
       WHERE id_detalle = ${id_detalle}`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

  module.exports = {
    getDevolucion,
    postDevolucion,
    postDetaDev,
    putDevolucion,
    putDetaDev,
    getDev,
    getDetaDev
  };