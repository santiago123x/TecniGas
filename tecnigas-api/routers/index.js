const Router = require("express-promise-router");
const router = new Router();

const {
  getPersona,
  getPersById,
  getPersonaCedula,
  postPersona,
  putPersona,
  delPersona,
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

const {
  getDevolucion,
  getDev,
  getDetaDev,
  postDevolucion,
  postDetaDev,
  putDevolucion,
  putDetaDev,
  getDevoJDetalle
} = require("../controlador/devolucion.js");

const { 
  getCategoria,
  getCategoriabyID } = require("../controlador/categoria.js");

const { 
  getVenta,
  getDetallebyId,
  getDetallebyVP,
  putVenta,
  putDetaVent
} = require("../controlador/venta.js");

// Rutas de devolución

router.get("/devolucion", getDevolucion);
router.get("/devolucion/:id_venta", getDev);
router.get("/detadevo/:devolucion_id/:producto_id", getDetaDev);
router.get("/listaDev", getDevoJDetalle);
router.post("/devolucion", postDevolucion);
router.post("/detadevo", postDetaDev);
router.put("/devolucion/:devolucion_id", putDevolucion);
router.put("/detadevo/:id_detalle", putDetaDev);

// Rutas de venta

router.get("/venta", getVenta);
router.get("/ventadetalle/:id_venta", getDetallebyId);
router.get("/ventadetalle/:id_venta/:producto_id", getDetallebyVP);
router.put("/venta/:id_venta", putVenta);
router.put("/ventadetalle/:id_venta/:producto_id", putDetaVent);

//Ruta de Iva

router.get("/iva", getIva);

// Rutas de Categoria

router.get("/categorias", getCategoria);
router.get("/categoriaID/:id_categoria", getCategoriabyID);

// Rutas de Proveedores

router.get("/provpers", getProveedor);

// Rutas de Clientes

router.get("/clipers", getClientePer);

// Rutas de personas

router.get("/persona", getPersona);
router.get("/persona/:id", getPersById);
router.get("/personac/:cedula", getPersonaCedula);
router.post("/persona", postPersona);
router.put("/persona/:id", putPersona);
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
router.delete("/producto/:producto_id", delProducto);
router.put("/product/:producto_id", hideProducto);
router.get("/detapro/:id_venta/:id_producto", getDetaPro);
router.put("/productodev/:producto_id/:cantidad_pro", putProDev);

// routes Compra

//router.get("/compra", getCompra);
router.post("/compra", postCompra);
router.post("/compraDet", postCompraDet);

module.exports = router;
