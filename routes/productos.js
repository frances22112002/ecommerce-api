const express = require('express');
const router = express.Router();

const productoController =
require ('../controllers/productoController');

const auth = require('../midleware/auth');

router.get('/', productoController.listar);

router.post('/', auth, productoController.crear);

router.put('/:id', auth, productoController.actualizar);

router.delete('/:id', auth, productoController.eliminar);

module.exports = router;
