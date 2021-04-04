const pool = require('./conexion');

const getPersona = async (req, res) => {
    try{
        const response = await pool.query('SELECT * FROM persona ORDER BY persona_id');
        res.send(response.rows);
        
    }catch(e){
        console.log(e);
    }
    
};

const getPersById = async (req, res) =>{
  try{
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM persona WHERE persona_id = $1', [id]);
    res.json(response.rows);
  }catch(e){
    console.log(e);
}
};

const postPersona = async (req, res) =>{

    try{
      const { 
        nombre_pe,
        apellido,
        identificacion,
        email,
        direccion,
        telefono
      } = req.body;
      const response = await pool.query
      ('INSERT INTO persona (nombre_pe, apellido, identificacion, email, direccion, telefono) VALUES ($1, $2, $3, $4, $5, $6)',
      [nombre_pe, apellido, identificacion, email, direccion, telefono]);
      console.log(response);
      res.send('persona creada');
    }catch(e){
      console.log(e);
  }
};

const upPersona = async (req, res) =>{
    try{
      const id = req.params.id;
      const { 
        nombre_pe,
        apellido,
        identificacion,
        email,
        direccion,
        telefono
      } = req.body;
      const response = await pool.query
      ('UPDATE persona SET nombre_pe = $1, apellido = $2, identificacion = $3, email = $4, direccion = $5, telefono = $6 WHERE persona_id = $7',
      [nombre_pe, apellido, identificacion, email, direccion, telefono, id]);
      console.log(response);
      res.send('persona actualizada');
    }catch(e){
      console.log(e);
  }
};

const delPersona = async (req, res) =>{
  try{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM persona WHERE persona_id = $1', [id]);
    console.log(response);
    res.json(`Persona ${id} eliminada satisfactoriamente`);
  }catch(e){
    console.log(e);
  }
};

module.exports = {
    getPersona,
    getPersById,
    postPersona,
    upPersona,
    delPersona,
    
};