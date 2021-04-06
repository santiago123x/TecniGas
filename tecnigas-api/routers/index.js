const Router = require("express-promise-router");
const router = new Router();

const {
  getPersona,
  getPersById,
  getPersonaCedula,
  postPersona,
  upPersona,
  delPersona,
} = require("../controlador/persona");

const {
  getCliente_Prov,
  getCliProIdP,
  postCliente_Prov,
  delCliente_Prov,
  getClientePer,
} = require("../controlador/clientes");

const { getProveedor } = require("../controlador/proveedores");

const {
  getProducto,
  getProductoId,
  getProductoNom,
  getProductoCod,
  getProductoCat,
  postProducto,
  putProducto,
  delProducto,
} = require("../controlador/producto.js");

// Rutas de Proveedor

router.get("/provpers", getProveedor);

// Rutas de personas

router.get("/persona", getPersona);
router.get("/persona/:id", getPersById);
router.get("/personac/:cedula", getPersonaCedula);
router.post("/persona", postPersona);
router.put("/persona/:id", upPersona);
router.delete("/persona/:id", delPersona);

// Rutas de clientes-proveedores

router.get("/clipers", getClientePer);
router.get("/listado/", getCliente_Prov);
router.post("/listado/:id/:tp", postCliente_Prov);
router.delete("/listado/:id", delCliente_Prov);
router.get("/cliproidp/:idper/:tipo", getCliProIdP);

// Rutas de productos

router.get("/producto", getProducto);
router.get("/producto/id/:producto_id", getProductoId);
router.get("/producto/nom/:nombre_pro", getProductoNom);
router.get("/producto/cod/:codigo_pro", getProductoCod);
router.get("/producto/cat/:nombre_catg", getProductoCat);
router.post("/producto", postProducto);
router.put("/producto/:producto_id", putProducto);
router.delete("/producto/:producto_id", delProducto);

module.exports = router;
