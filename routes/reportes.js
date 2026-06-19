const express = require('express');
const router = express.Router();

const auth = require('../midleware/auth');
const reporteController = require('../controllers/reporteController');
const estadisticaController = require('../controllers/estadisticaController');

router.get(
  '/ventas',
  auth,
  reporteController.totalVentas
);

router.get(
  '/mas-vendidos',
  auth,
  estadisticaController.productosMasVendidos
);

module.exports = router;
