const Router = require("express-promise-router");
const router = new Router();

const {
  getPersona,
  getPersById,
  getPersonaCedula,
  postPersona,
  putPersona,
  delPersona,
  putPersonaId,
} = require("../controlador/persona");

const {
  getCliente_Prov,
  getCliProIdP,
  postCliente_Prov,
  putCliente_Prov,
  getClientePer,
  activaCliPro,
} = require("../controlador/clientes");

const { getIva } = require("../controlador/iva");

const {
  getUsuarioId,
  putUsuarioId,
  getUsuario,
  hideUsuario,
  putRol,
  verifiUsuario,
  addUsuario,
  getUsuarioNick,
  getUsuarioDifId,
} = require("../controlador/usuario.js");

const { getProveedor } = require("../controlador/proveedores");

const {
  getProducto,
  getProductoId,
  getProductoNom,
  getProductoCod,
  getProductoCat,
  postProducto,
  putProducto,
  putCantidadProducto,
  delProducto,
  hideProducto,
  getProductoAll,
} = require("../controlador/producto.js");

const {
  getCompra,
  postCompra,
  postCompraDet,
} = require("../controlador/compra.js");


const { postMovimiento } = require("../controlador/movimiento");


const { 
  getCategoria,
  hideCategoria,
  getCategorias,
  categoriaUp,
  postCategoria,
  activarCategoria,
 } = require("../controlador/categoria.js");

const verifyToken = require("../controlador/verifyToken")

//Ruta de Usuario

router.get("/usuario", getUsuario);
router.get("/usuarios/:usuario_id", getUsuarioDifId);
router.get("/usuario/:id", verifyToken, getUsuarioId);
router.get("/usuarionick/:nick", getUsuarioNick)
router.put("/usuario/:id", putUsuarioId);
router.put("/usurol/:id", putRol);
router.put("/delusuario/:id", hideUsuario);
router.post("/verifiusu/", verifiUsuario);
router.post("/usuario", addUsuario);
const {
  getDevolucion,
  postDevolucion,
} = require("../controlador/devolucion.js");


const { 
  getVenta,
  getDetallebyId,
  getDetaPro,
  getLastVenta,
  postVenta,
  postDetalleVenta,
} = require("../controlador/venta.js");

// Rutas de devolución

router.get("/devolucion", getDevolucion);
router.post("/devolucion", postDevolucion);

// Rutas de venta

router.get("/venta", getVenta);
router.get("/ventadetalle/:id_venta", getDetallebyId);
router.get("/detavenp/:id_venta/:id_producto", getDetaPro);
router.get("/lastventa",getLastVenta);
router.post("/postventa", postVenta);
router.post("/postdetalleventa", postDetalleVenta);

//Ruta de Iva


router.get("/iva", getIva);



// Rutas de Categoria

router.get("/categorias", getCategoria);
router.post("/categoria", postCategoria);
router.get("/categoriasH", getCategorias);
router.put("/categorias/:id_categoria",hideCategoria);
router.put("/categoriaUp/:id_categoria",categoriaUp);
router.put("/actCategoria/:id_categoria",activarCategoria);


//Rutas de iva

router.get("/iva", getIva);

// Rutas de Proveedor

router.get("/provpers", getProveedor);

// Rutas de Clientes

router.get("/clipers", getClientePer);

// Rutas de personas

router.get("/persona", getPersona);
router.get("/persona/:id", getPersById);
router.get("/personac/:cedula", getPersonaCedula);
router.post("/persona", postPersona);
router.put("/persona/:id", putPersona);
router.put("/personaid/:id", putPersonaId);
router.delete("/persona/:id", delPersona);

// Rutas de clientes-proveedores

router.get("/listado/", getCliente_Prov);
router.post("/listado/:id/:tp/:estado", postCliente_Prov);
router.put("/listado/:persona_id/:tipo_clpr/:estado_clpr", putCliente_Prov);
router.get("/cliproidp/:idper/:tipo", getCliProIdP);
router.put("/cedulalistclipro/:persona_id", activaCliPro);


//router.get("/clientes", getClientes);


// Rutas de productos

router.get("/producto", getProducto);
router.get("/productoall", getProductoAll);
router.get("/producto/id/:producto_id", getProductoId);
router.get("/producto/nom/:nombre_pro", getProductoNom);
router.get("/producto/cod/:codigo_pro", getProductoCod);
router.get("/producto/cat/:nombre_catg", getProductoCat);
router.post("/producto", postProducto);
router.put("/producto/:producto_id", putProducto);
router.put("/productocantidad/:producto_id", putCantidadProducto);
router.delete("/producto/:producto_id", delProducto);
router.put("/product/:producto_id", hideProducto);

// routes Compra

//router.get("/compra", getCompra);
router.post("/compra", postCompra);
router.post("/compraDet", postCompraDet);

// routes Movimiento

router.post("/movimiento", postMovimiento)

module.exports = router;
