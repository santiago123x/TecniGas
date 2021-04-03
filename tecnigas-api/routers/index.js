const Router = require("express-promise-router");
const router = new Router();

const { getClientes } = require("../controlador/clientes");
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

//router.get("/", getClientes);

// routes Productos

router.get("/producto", getProducto);
router.get("/producto/id/:producto_id", getProductoId);
router.get("/producto/nom/:nombre_pro", getProductoNom);
router.get("/producto/cod/:codigo_pro", getProductoCod);
router.get("/producto/cat/:nombre_catg", getProductoCat);
router.post("/producto", postProducto);
router.put("/producto/:producto_id", putProducto);
router.delete("/producto/:producto_id", delProducto);

module.exports = router;
