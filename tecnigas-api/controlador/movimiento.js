const pool = require("./conexion");

const postMovimiento = async (req, res) => {
  try {
    const {
      producto_id,
      cantidad,
      observacion,
      fecha,
      tipo,
    } = req.body;
    console.log(req.body)
    const response = await pool.query(
      `INSERT INTO movimiento (producto_id, cantidad_mv, fecha_movimiento, tipo_mv, observacion_mv)
       VALUES($1, $2, $3, $4, $5)`,[producto_id, cantidad, fecha, tipo, observacion]
    );
    console.log("movimiento agregado con exito");
    res.json("Movimiento realizado con exito");
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  postMovimiento,
};