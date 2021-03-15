const Router = require("express-promise-router");
const router = new Router();

const { getClientes } = require("../controlador/clientes");
const {
  getProducto,
  postProducto,
  putProducto,
  delProducto,
} = require("../controlador/producto.js");

//router.get("/", getClientes);

// routes Productos

router.get("/producto", getProducto);
router.post("/producto", postProducto);
router.put("/producto/:producto_id", putProducto);
router.delete("/producto/:producto_id", delProducto);

module.exports = router;
