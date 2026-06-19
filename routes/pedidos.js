const express = require('express');
const router = express.Router();

const auth = require('../midleware/auth');
const pedidoController = require('../controllers/pedidoController');
const esAdmin = require('../midleware/esAdmin');

router.post('/crear', auth, pedidoController.crearPedido);
router.get('/mis-pedidos', auth, pedidoController.verMisPedidos);
router.get('/', auth, esAdmin, pedidoController.verTodos);
router.put('/:id', auth, esAdmin, pedidoController.cambiarEstado);

module.exports = router;
