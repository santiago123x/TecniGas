const pool = require("./conexion");
const keys = require("../keys/keys.js");
const algoritmo = "aes-192-cbc";
const password = keys.cryptoKey;
const Crypto = require("crypto");
const jwt = require("jsonwebtoken");

const crearToken = (usuario) => {
  return jwt.sign(usuario, password, {expiresIn: '6h' })
}

const Cipher = {
  encriptar: function (contra) {
    try {
      const iv = Crypto.randomBytes(8).toString("hex");
      const cipher = Crypto.createCipheriv(algoritmo, password, iv);
      cipher.update(contra, "utf8", "hex");
      const contraCipher = cipher.final("hex");
      return iv + contraCipher;
    } catch (err) {
      console.error(err);
    }
  },
  desencriptar: function (hex) {
    try {
      const iv = hex.slice(0, 16);
      const contraCipher = hex.slice(16);
      let decipher = Crypto.createDecipheriv(algoritmo, password, iv);
      decipher.update(contraCipher, "hex", "utf8");
      return decipher.final("utf8");
    } catch (err) {
      console.error(err);
    }
  },
};

const getUsuarioId = async (req, res) => {
  try {
    
    const { id: usuario_id } = req.params;
    const response = await pool.query(
      `select * from usuario natural join persona where usuario_id = ${usuario_id}`
    );
    if (response.rows[0])
    response.rows[0].contraseña = Cipher.desencriptar(response.rows[0].contraseña);
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
};

const getUsuarioNick = async (req, res) => {
  try {
    const { nick: nombre_usr } = req.params;
    const response = await pool.query(
      `select * from usuario natural join persona where nombre_usr = '${nombre_usr}' and estado_usr = 'activado'`
    );    
    if (response.rows[0])
    response.rows[0].contraseña = Cipher.desencriptar(response.rows[0].contraseña);
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
};

const getUsuario = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from usuario natural join persona where estado_usr = 'activado' order by nombre_pe`
    );
    response.rows.forEach(elemento => elemento.contraseña = Cipher.desencriptar(elemento.contraseña) );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const putUsuarioId = async (req, res) => {
  try {
    const { id: usuario_id } = req.params;
    const { nombre_usr, contraseña } = req.body;
    const contraCipher = Cipher.encriptar(contraseña);
    const response = await pool.query(
      `UPDATE usuario SET nombre_usr = '${nombre_usr}', contraseña  = '${contraCipher}'
     WHERE usuario_id = ${usuario_id}`
    );
    res.json("Se Actualizo el Usuario");
  } catch (e) {
    console.error(e);
  }
};

const putRol = async (req, res) => {
  try {
    const { id: usuario_id } = req.params;
    const { rol } = req.body;
    const response = await pool.query(
      `UPDATE usuario SET rol  = '${rol}'
   WHERE usuario_id = ${usuario_id}`
    );
    res.json("Se Actualizo el Usuario");
  } catch (e) {
    console.error(e);
  }
};

const hideUsuario = async (req, res) => {
  try {
    const usuario_id = req.params.id;

    const response = await pool.query(
      `UPDATE usuario SET estado_usr = 'desactivado'
      WHERE usuario_id = ${usuario_id}`
    );
    res.send("Producto Escondido");
  } catch (e) {
    console.error(e);
  }
};

const verifiUsuario = async (req, res) => {
  try {
    const { nombre_usr, contraseña } = req.body;
    const response = await pool.query(
      "select * from usuario natural join persona where nombre_usr = $1",
      [nombre_usr]
    );
    if (response.rowCount > 0) {
      const usuario = response.rows[0];
      const decipher = Cipher.desencriptar(usuario.contraseña);
      if (decipher === contraseña && usuario.estado_usr === "activado"){
        const user = {
          usuario_id: usuario.usuario_id,
          nombre_pe: usuario.nombre_pe,
          rol: usuario.rol}
        return res.send({token: crearToken(user),
        isAuth: true,
        user});
      }
    } 
    return res.send({isAuth: false});
  } catch (error) {
    console.error(error);
  }
};

const addUsuario = async (req, res) => {
  try {
    const { persona_id, contraseña, nombre_usr, rol } = req.body;
    const contraCipher = Cipher.encriptar(contraseña);
    const response = await pool.query(
      `INSERT INTO usuario (persona_id, nombre_usr, contraseña, rol, estado_usr)
        VALUES (${persona_id}, '${nombre_usr}', '${contraCipher}', '${rol}', 'activado')
        returning usuario_id`
    );
    res.status(201).send(response.rows);
  } catch (error) {
    console.error(error);
    res.status(501).send(error);
  }
};

module.exports = {
  getUsuarioId,
  putUsuarioId,
  getUsuario,
  hideUsuario,
  putRol,
  verifiUsuario,
  addUsuario,
  getUsuarioNick,
};
