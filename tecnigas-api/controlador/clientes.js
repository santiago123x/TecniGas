const pool = require("./conexion");

const getClientes = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM persona ORDER BY idpersona"
    );
    res.send(response.rows);
  } catch (e) {
    console.log(e);
  }
};

// select * from cliente-proveedor join persona on cliente-proveedor.persona_id = persona.persona_id where tipo_clpr = 'proveedor'

module.exports = {
  getClientes,
};
