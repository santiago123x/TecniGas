const pool = require("./conexion");

const getProveedor = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from  proveedores natural join personas `
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
    getProveedor,
    
  };