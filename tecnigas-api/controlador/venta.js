const pool = require("./conexion");

const getVenta = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM venta ORDER BY id_venta`);
        res.send(response.rows);
    } catch (e){
        console.error(e);
    }
};

const getDetallebyId = async (req, res) => {
    const id_venta = req.params.id_venta;
    try {
        const response = await pool.query(
            `SELECT * FROM "detalle venta" WHERE id_venta = ${id_venta} order by id_detaven`
            );
        res.send(response.rows);
    } catch (e) {
        console.error(e);
    }
};

const getDetaPro = async (req, res) => {
    const id_venta = req.params.id_venta;
    const id_producto = req.params.id_producto;
    try {
        const response = await pool.query(
            `SELECT * FROM "detalle venta" WHERE id_venta = ${id_venta} AND producto_id = ${id_producto}`
            );
        res.send(response.rows);
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    getVenta,
    getDetallebyId,
    getDetaPro
};