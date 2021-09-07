const pool = require("./conexion");

const getPersona = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM persona ORDER BY persona_id"
    );
    res.send(response.rows);
  } catch (e) {
    console.log(e);
  }
};

const getPersonaCedula = async (req, res) => {
  try {
    const identificacion = req.params.cedula;
    const response = await pool.query(
      `SELECT * FROM persona where identificacion = '${identificacion}' `
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.log(e);
  }
};

const getPersById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      "SELECT * FROM persona WHERE persona_id = $1",
      [id]
    );
    res.json(response.rows);
  } catch (e) {
    console.log(e);
  }
};


const postPersona = async (req, res) => {
  try {
    const { nombre_pe, identificacion, email, direccion, telefono } = req.body;
    const response = await pool.query(
      "INSERT INTO persona (nombre_pe, identificacion, email, direccion, telefono) VALUES ($1, $2, $3, $4, $5) returning persona_id",
      [nombre_pe, identificacion, email, direccion, telefono]
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.log(e);
  }
};

const putPersona = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre_pe, identificacion, email, direccion, telefono } = req.body;
    const response = await pool.query(
      `UPDATE persona SET nombre_pe = '${nombre_pe}', identificacion  = '${identificacion}',
      email  = '${email}', direccion  = '${direccion}', telefono  = '${telefono}'
    WHERE identificacion = '${id}'`
    );
    console.log(response);
    res.send("persona actualizada");
  } catch (e) {
    console.log(e, "Soy actualizar persona");
  }
};

const putPersonaId = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre_pe, identificacion, email, direccion, telefono } = req.body;
    const response = await pool.query(
      `UPDATE persona SET nombre_pe = '${nombre_pe}', identificacion  = '${identificacion}',
      email  = '${email}', direccion  = '${direccion}', telefono  = '${telefono}'
    WHERE persona_id = ${id}`
    );
    console.log(response);
    res.send("persona actualizada");
  } catch (e) {
    console.log(e, "Soy actualizar persona");
  }
};

const delPersona = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      `DELETE FROM persona WHERE persona_id = '${id}'`
    );
    console.log(response);
    res.json(`Persona ${id} eliminada satisfactoriamente`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getPersona,
  getPersById,
  getPersonaCedula,
  postPersona,
  putPersona,
  delPersona,
  putPersonaId,
};
