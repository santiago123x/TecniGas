const pool = require("./conexion");

const getIva = async (req, res) => {
  try {
    const response = await pool.query(`select * from iva`);
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getIva,
};
