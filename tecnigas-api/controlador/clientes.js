const pool = require('./conexion');


const getCliente_Prov = async (req, res) =>{
  try{
    const response = await pool.query('SELECT * FROM "cliente-proveedor" ORDER BY id_clipro');
        res.send(response.rows);
  }catch(e){
      console.log(e);
    }
};

const postCliente_Prov = async (req, res) =>{
    try{
      const id = req.params.id;
      const tp = req.params.tp;
      const response = await pool.query('INSERT INTO "cliente-proveedor" (persona_id, tipo_clpr) VALUES ($1, $2)',
       [id, tp]);
       console.log(response);
      res.send('Cliente o Proveedor Creado');
    }catch(e){
      console.log(e);
    }
};

const delCliente_Prov = async (req, res) =>{
    try{
      const id = req.params.id;
      const response = await pool.query('DELETE FROM "cliente-proveedor" WHERE id_clipro = $1', [id]);
      console.log(response);
      res.send('Cliente O Proveedor Eliminado');
    }catch(e){
      console.log(e);
    }
};

module.exports = {
    getCliente_Prov,
    postCliente_Prov,
    delCliente_Prov,
    
};