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
  personaVentaInfo,
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
  getUsuarioTodo,
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
  getDetaPro,
  putProDev
} = require("../controlador/producto.js");

const {
  getCompra,
  postCompra,
  postCompraDet,
} = require("../controlador/compra.js");


const { postMovimiento } = require("../controlador/movimiento");


const { 
  getCategoria,
  getCategoriabyID,
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
router.get("/usuario/:id", getUsuarioId);
router.get("/usuarionick/:nick", getUsuarioNick)
router.put("/usuario/:id", putUsuarioId);
router.put("/usurol/:id", putRol);
router.put("/delusuario/:id", hideUsuario);
router.post("/verifiusu/", verifiUsuario);
router.post("/usuario", addUsuario);
router.get("/usuarioTodo/:nick", getUsuarioTodo);

const {
  getDevolucion,
  getDev,
  getDetaDev,
  postDevolucion,
  postDetaDev,
  putDevolucion,
  putDetaDev,
  getDevoJDetalle,
  eliminaDetaDev,
  getDetaDevById,
  deleteDev
} = require("../controlador/devolucion.js");



const { 
  getVenta,
  getDetallebyId,
  getDetallebyVP,
  putVenta,
  putDetaVent,
  getLastVenta,
  postVenta,
  postDetalleVenta,
  getDetalleVenta,
} = require("../controlador/venta.js");

// Rutas de devolución

router.get("/devolucion", getDevolucion);
router.get("/devolucion/:id_venta", getDev);
router.get("/detadevo/:devolucion_id/:producto_id", getDetaDev);
router.get("/listaDev", getDevoJDetalle);
router.get("/detadevo/:devolucion_id", getDetaDevById);
router.post("/devolucion", postDevolucion);
router.post("/detadevo", postDetaDev);
router.put("/devolucion/:devolucion_id", putDevolucion);
router.put("/detadevo/:devolucion_id/:producto_id", putDetaDev);
router.delete("/devolucion/:devolucion_id", deleteDev);
router.delete("/detadevo/:devolucion_id/:producto_id", eliminaDetaDev);

// Rutas de venta

router.get("/venta", getVenta);
router.get("/ventadetalle/:id_venta", getDetallebyId);
router.get("/ventadetalle/:id_venta/:producto_id", getDetallebyVP);
router.get("/detalleventa", getDetalleVenta);
router.put("/venta/:id_venta", putVenta);
router.put("/ventadetalle/:id_venta/:producto_id", putDetaVent);
router.get("/detavenp/:id_venta/:id_producto", getDetaPro);
router.get("/lastventa",getLastVenta);
router.post("/postventa", postVenta);
router.post("/postdetalleventa", postDetalleVenta);

//Ruta de Iva


router.get("/iva", getIva);



// Rutas de Categoria

router.get("/categorias", getCategoria);
router.get("/categoriaID/:id_categoria", getCategoriabyID);
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
router.get("/listaVpersona", personaVentaInfo);
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
router.get("/detapro/:id_venta/:id_producto", getDetaPro);
router.put("/productodev/:producto_id/:cantidad_pro", putProDev);

// routes Compra

//router.get("/compra", getCompra);
router.post("/compra", postCompra);
router.post("/compraDet", postCompraDet);

// routes Movimiento

router.post("/movimiento", postMovimiento)

module.exports = router;
