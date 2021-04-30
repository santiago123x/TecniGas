const pool = require("./conexion");

const getCategoria= async (req, res) => {
    try {
      const response = await pool.query(
        `select * from categoria order by id_categoria`
      );
      res.send(response.rows);
    } catch (e) {
      console.error(e);
    }
  };

  module.exports = {
    getCategoria,
  };