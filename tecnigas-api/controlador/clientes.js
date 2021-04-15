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

const getCliente_Prov = async (req, res) => {
  try {
    const response = await pool.query(
      'SELECT * FROM "cliente-proveedor" ORDER BY id_clipro'
    );
    res.send(response.rows);
  } catch (e) {
    console.log(e);
  }
};

const getCliProIdP = async (req, res) => {
  try {
    const persona_id = req.params.idper;
    const tipo = req.params.tipo;
    const response = await pool.query(
      `SELECT * FROM "cliente-proveedor" where persona_id = ${persona_id} and tipo_clpr = '${tipo}'`
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.log(e);
  }
};

const postCliente_Prov = async (req, res) => {
  try {
    const id = req.params.id;
    const tp = req.params.tp;
    const response = await pool.query(
      'INSERT INTO "cliente-proveedor" (persona_id, tipo_clpr) VALUES ($1, $2)',
      [id, tp]
    );
    console.log(response);
    res.send("Cliente o Proveedor Creado");
  } catch (e) {
    console.log(e);
  }
};

const delCliente_Prov = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      'DELETE FROM "cliente-proveedor" WHERE id_clipro = $1',
      [id]
    );
    console.log(response);
    res.send("Cliente O Proveedor Eliminado");
  } catch (e) {
    console.log(e);
  }
};

const getClientePer = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from "cliente-proveedor" natural join persona where tipo_clpr = 'cliente'
      order by nombre_pe`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};


module.exports = {
  getCliente_Prov,
  getCliProIdP,
  postCliente_Prov,
  delCliente_Prov,
  getClientes,
  getClientePer,
};
