const pool = require("./conexion");

const getProveedor = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from  proveedores`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
    getProveedor,
    
  };