const pool = require("./conexion");

const getClientes = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from "cliente-proveedor"  natural join  persona where tipo_clpr = 'cliente' order by persona_id`
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
    const estado = req.params.estado;
    const response = await pool.query(
      'INSERT INTO "cliente-proveedor" (persona_id, tipo_clpr, estado_clpr) VALUES ($1, $2, $3)',
      [id, tp, estado]
    );
    console.log(response);
    res.send("Cliente o Proveedor Creado");
  } catch (e) {
    console.log(e);
  }
};

const putCliente_Prov = async (req, res) => {
  try {
    let persona_id = req.params.persona_id;
    let tipo_clpr = req.params.tipo_clpr;
    let estado_clpr = req.params.estado_clpr;
    const response = await pool.query(
      `UPDATE "cliente-proveedor" SET tipo_clpr = '${tipo_clpr}', estado_clpr = '${estado_clpr}'
      WHERE persona_id = ${persona_id}`
    );
    res.send(response.rows);
} catch (e) {
  console.log(e);
}
};

const activaCliPro = async (req, res) => {
  try {
    let persona_id = req.params.persona_id;
    const {
      tipo_clpr,
    } = req.body;
    const response = await pool.query(
      `UPDATE "cliente-proveedor" SET estado_clpr = 'activado'
      WHERE persona_id = ${persona_id} AND tipo_clpr = '${tipo_clpr}'` 
    );
    res.send(response.rows);
  } catch (e) {
    console.log(e);
  }
}

const getClientePer = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from "cliente-proveedor" natural join persona where tipo_clpr = 'cliente' and estado_clpr = 'activado'
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
  putCliente_Prov,
  getClientes,
  getClientePer,
  activaCliPro,
};
