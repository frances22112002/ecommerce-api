const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario'
	},
	productos : [ 
		{
			producto: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Producto'
			},
			cantidad: Number,
			precio: Number
			}
	],
	total: Number,
	estado: {
		type: String,
		default: 'Pendiente'
	},
	fecha: {
		type: Date,
		default: Date.now
		}
});

module.exports = mongoose.model('Pedido', PedidoSchema);
