const Pedido = require('../models/Pedido');

exports.totalVentas = async (req, res) => {
	try {
		const pedidos = await Pedido.find();
		let total = 0;

		pedidos.forEach(pedido => {
			total += pedido.total;
		});

		res.json({
			cantidadPedidos: pedidos.length,
			ingresosTotales: total
		});

	} catch (error) {
		res.status(500).json({
			mensaje: 'Error al generar reporte',
			error: error.message
		});
	}
};
