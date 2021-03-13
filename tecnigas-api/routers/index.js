const Router = require('express-promise-router');
const router = new Router();


const { getClientes } = require('../controlador/clientes');

router.get('/', getClientes);









module.exports = router;