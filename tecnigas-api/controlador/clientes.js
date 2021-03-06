
const pool = require('./conexion');



const getClientes = async (req, res) => {
    try{
        const response = await pool.query('SELECT * FROM persona ORDER BY idpersona');
        res.send(response.rows);
        
    }catch(e){
        console.log(e);
    }
    
};




module.exports = {
    getClientes,
};