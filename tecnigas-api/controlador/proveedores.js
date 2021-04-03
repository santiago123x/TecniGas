const pool = require("./conexion");

const getProveedor = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from "cliente-proveedor" natural join persona where tipo_clpr = 'proveedor'
      order by nombre_pe`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
    getProveedor,    
  };