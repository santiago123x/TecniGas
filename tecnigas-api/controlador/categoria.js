const pool = require("./conexion");

const getCategoria= async (req, res) => {
    try {
      const response = await pool.query(
        `select * from categoria order by id_categoria`
      );
      res.send(response.rows);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategoriabyID = async (req, res) => {
    const id_categoria = req.params.id_categoria;
    try{
      const response = await pool.query(
        `select * from categoria where id_categoria = ${id_categoria}`
      );
      res.send(response.rows);
    } catch (e){
      console.error(e);
    }
  };

  module.exports = {
    getCategoria,
    getCategoriabyID
  };