const Producto = require('../models/Producto')

//LISTAR
exports.listar = async (req, res) => {
	try {
		const productos = await Producto.find();
		res.json(productos);
	}catch (error) {
		res.status(500).json(error);
	}
};

//CREAR
exports.crear = async (req, res) => {
        try {
                const producto = new Producto(req.body);
		await producto.save();

                res.json({
			mensaje: 'Producto creado',
			producto
		});
        }catch (error) {
                res.status(500).json(error);
        }
};

//ACTUALIZAR
exports.actualizar = async (req, res) => {
        try {
                const producto = await Producto.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true}
		);

                res.json({
			mensaje : 'Producto actualizado',
			producto
		});

        }catch (error) {
                res.status(500).json(error);
        }
};

//ELIMINAR
exports.eliminar = async (req, res) => {
        try {
                await Producto.findByIdAndDelete(req.params.id);

                res.json({
			mensaje: 'Producto eliminado'
		});

        }catch (error) {
                res.status(500).json(error);
        }
};

