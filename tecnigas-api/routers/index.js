const Router = require("express-promise-router");
const router = new Router();

const {
  getPersona,
  getPersById,
  postPersona,
  upPersona,
  delPersona,
} = require("../controlador/persona");

const { 
  getCliente_Prov,
  postCliente_Prov,
  delCliente_Prov,
} = require("../controlador/clientes");

const {
  getProducto,
  postProducto,
  putProducto,
  delProducto,
} = require("../controlador/producto.js");

// Rutas de personas

router.get("/persona", getPersona);
router.get("/persona/:id", getPersById);
router.post("/persona", postPersona);
router.put("/persona/:id", upPersona);
router.delete("/persona/:id", delPersona);

// Rutas de clientes-proveedores

router.get("/listado/", getCliente_Prov);
router.post("/listado/:id/:tp", postCliente_Prov);
router.delete("/listado/:id", delCliente_Prov);


// Rutas de productos

router.get("/producto", getProducto);
router.post("/producto", postProducto);
router.put("/producto/:producto_id", putProducto);
router.delete("/producto/:producto_id", delProducto);

module.exports = router;
