const pool = require("./conexion");

const getCategoria = async (req, res) => {
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
  try {
    const response = await pool.query(
      `select * from categoria where id_categoria = ${id_categoria}`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};
const getCategorias = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from categoria WHERE estado_catg = 'activado' order by id_categoria`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};


const hideCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;

    const response = await pool.query(
      `UPDATE categoria SET estado_catg = 'desactivado'
        WHERE id_categoria = ${id_categoria}`
    );
    res.send("Categoria Escondido");
  } catch (e) {
    console.error(e);
  }
}

const categoriaUp = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;
    const nombre_catg = req.body.nombre_catg;

    const response = await pool.query(
      `UPDATE categoria SET nombre_catg = '${nombre_catg}'
        WHERE id_categoria = ${id_categoria}`
    );
    res.send("Categoria Escondido");
  } catch (e) {
    console.error(e);
  }
}

const activarCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;

    const response = await pool.query(
      `UPDATE categoria SET estado_catg = 'activado'
        WHERE id_categoria = ${id_categoria}`
    );
    res.send("Categoria Activado");
  } catch (e) {
    console.error(e);
  }
}


const postCategoria = async (req, res) => {
  try {
    const {
      nombre_catg,
    } = req.body;

    const response = await pool.query(
      `INSERT INTO categoria(nombre_catg, estado_catg )
         VALUES('${nombre_catg}','activado')
         returning id_categoria`
    );
    res.send(response.rows);
    //res.json("Se Agrego el Producto");
  } catch (e) {
    console.error(e);
  }
};


module.exports = {
  getCategoria,
  hideCategoria,
  getCategorias,
  getCategoriabyID,
  categoriaUp,
  postCategoria,
  activarCategoria,
};