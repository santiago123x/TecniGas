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
            VALUES(${id_venta},'${comentario_dev}', ${fecha_dev}, ${total_gral_d})`
        );
        res.send(response.rows);
    } catch (error) {
        console.error(e);
    }
}

  module.exports = {
    getDevolucion,
    postDevolucion,
  };