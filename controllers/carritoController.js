const Carrito = require('../models/Carrito');

exports.verCarrito = async (req, res) => {
	try {
		const carrito = await Carrito.findOne({
			usuario: req.usuario.id
		}).populate('productos.producto');

		res.json(carrito || {mensaje: 'Carrito vacío'});

	} catch (error) {
		res.status(500).json(error);
	}
};

exports.agregarProducto = async (req, res) => {
	try {
		const { productoId, cantidad } = req.body;

		let carrito = await Carrito.findOne({
			usuario: req.usuario.id
		});

		if (!carrito) {
			carrito = new Carrito ({
				usuario: req.usuario.id,
				productos: []
			});
		}


		carrito.productos.push({
			producto: productoId,
			cantidad: cantidad
		});

		await carrito.save();

		res.json({
			mensaje: 'Producto agregado al carrito',
			carrito
		});
	} catch (error) {
		res.status(500).json({
		mensaje: 'Error al agregar producto',
		error: error.message
		});
	}
};

exports.vaciarCarrito = async (req, res) => {
	try {
		await Carrito.finOneAndDelete({
			usuario: req.usuario.id
		});

		res.json({
			mensaje: 'Carrito vaciado'
		});

	} catch (error) {
		res.status(500).json(error);
	}
};

exports.quitarProducto = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({
            usuario: req.usuario.id
        });

        if (!carrito) {
            return res.status(404).json({
                mensaje: 'Carrito no encontrado'
            });
        }

        carrito.productos = carrito.productos.filter(
            item => item.producto.toString() !== req.params.productoId
        );

        await carrito.save();

        res.json({
            mensaje: 'Producto eliminado del carrito',
            carrito
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al quitar producto',
            error: error.message
        });
    }
};
