const pool = require("./conexion");

const getUsuarioId = async (req, res) => {
  try {
    const { id: usuario_id } = req.params;
    const response = await pool.query(
      `select * from usuario natural join persona where usuario_id = ${usuario_id}`
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
};

const putUsuarioId = async (req, res) => {
  try {
    const { id: usuario_id } = req.params;
    const { nombre_usr, contraseña } = req.body;
    const response = await pool.query(
      `UPDATE usuario SET nombre_usr = '${nombre_usr}', contraseña  = '${contraseña}'
     WHERE usuario_id = ${usuario_id}`
    );
    res.json("Se Actualizo el Usuario");
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getUsuarioId,
  putUsuarioId,
};
