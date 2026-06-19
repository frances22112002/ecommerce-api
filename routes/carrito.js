const express = require('express');
const router = express.Router();

const auth = require('../midleware/auth');
const carritoController = require('../controllers/carritoController');

router.get('/', auth, carritoController.verCarrito);
router.post('/agregar', auth, carritoController.agregarProducto);
router.delete('/vaciar', auth, carritoController.vaciarCarrito);
router.delete('/quitar/:productoId', auth, carritoController.quitarProducto);

module.exports = router;

