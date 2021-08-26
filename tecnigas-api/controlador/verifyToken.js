const keys = require("../keys/keys.js");
const password = keys.cryptoKey;
const pool = require("./conexion");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers['token'];
  console.log(req.headers)
  if (!token) return res.status(401).send({ token: null, isAuth: false });

  try {
    const deco = jwt.verify(token, password);
    const usuario_id = deco.id;
    const response = await pool.query(
      `select * from usuario natural join persona where usuario_id = ${usuario_id}`
    );
    const user = response.rows[0]
    if (!user || user.nombre_pe !== deco.nombre_pe) return res.status(401).send({ token: null, isAuth: false });

    next();
  } catch (error) {
    return res.status(401).send({ token: null, isAuth: false });
  }
}

module.exports = verifyToken;
