const express = require('express');
const router = express.Router();
const { getProductos, addProducto, getVentas, addVenta } = require('../controllers/productosController');

router.get('/productos', getProductos);
router.post('/productos', addProducto);
router.get('/ventas', getVentas);
router.post('/ventas', addVenta);

module.exports = router;