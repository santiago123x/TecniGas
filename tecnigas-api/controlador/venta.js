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
    try {
        const id_venta = req.params.id_venta;
        const response = await pool.query(            
            `SELECT * FROM producto natural join public."detalle venta" WHERE id_venta = ${id_venta} order by id_detaven`
            );
        res.send(response.rows);
    } catch (e) {
        console.error(e);
    }
};

const getDetallebyVP = async (req, res) => {
    try {
        const id_venta = req.params.id_venta;
        const producto_id = req.params.producto_id;
        const response = await pool.query(
            `SELECT * FROM "detalle venta" WHERE id_venta = ${id_venta} AND producto_id = ${producto_id}`
        );
        res.send(response.rows[0]);
    } catch (e) {
        console.error(e);
    }
};


const putVenta = async (req, res) => {
    try {
        const id_venta = req.params.id_venta;
        const {
        sub_total,
        total_ve,
        observacion_vta
        } = req.body;
        const response = await pool.query(
            `UPDATE venta SET sub_total = ${sub_total}, total_ve = ${total_ve}, observacion_vta = '${observacion_vta}'
            WHERE id_venta = ${id_venta}`
        );
        res.send(response.rows);
    } catch (e) {
        console.error(e);
    }
};

const putDetaVent = async (req, res) => {
     try {
        const id_venta = req.params.id_venta;
        const producto_id = req.params.producto_id;
        const { 
            cantidad_ven,
            precio_ven,
            total_ven
         } = req.body;
        const response = await pool.query(
            `UPDATE "detalle venta" SET cantidad_ven = ${cantidad_ven}, precio_ven = ${precio_ven}, total_ven = ${total_ven}
            WHERE id_venta = ${id_venta} AND producto_id = ${producto_id}`
        );
        res.send(response.rows);
     } catch (e) {
        console.error(e);
     }
};

module.exports = {
    getVenta,
    getDetallebyId,
    putVenta,
    putDetaVent,
    getDetallebyVP
};