const pool = require("./conexion");

const getVenta = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM venta ORDER BY venta_id`);
        res.send(response.rows);
    } catch (e){
        console.error(e);
    }
};

module.exports = {
    getVenta,
};