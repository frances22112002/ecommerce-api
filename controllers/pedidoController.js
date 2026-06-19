const Pedido = require('../models/Pedido');
const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');

exports.crearPedido = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({
            usuario: req.usuario.id
        }).populate('productos.producto');

        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({
                mensaje: 'No se puede crear pedido. El carrito está vacío'
            });
        }

        let total = 0;
        const productosPedido = [];

        for (const item of carrito.productos) {
            const producto = item.producto;

            if (producto.stock < item.cantidad) {
                return res.status(400).json({
                    mensaje: `Stock insuficiente para ${producto.nombre}`
                });
            }

            total += producto.precio * item.cantidad;

            productosPedido.push({
                producto: producto._id,
                cantidad: item.cantidad,
                precio: producto.precio
            });

            await Producto.findByIdAndUpdate(producto._id, {
                $inc: { stock: -item.cantidad }
            });
        }

        const pedido = new Pedido({
            usuario: req.usuario.id,
            productos: productosPedido,
            total,
            estado: 'Pendiente'
        });

        await pedido.save();

        await Carrito.findOneAndDelete({
            usuario: req.usuario.id
        });

        res.json({
            mensaje: 'Pedido creado correctamente',
            pedido
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear pedido',
            error: error.message
        });
    }
};

exports.verMisPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({
            usuario: req.usuario.id
        }).populate('productos.producto');

        res.json(pedidos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar pedidos',
            error: error.message
        });
    }
};

exports.verTodos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('usuario')
            .populate('productos.producto');

        res.json(pedidos);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.cambiarEstado = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { estado: req.body.estado },
            { new: true }
        );

        res.json({
            mensaje: 'Estado actualizado',
            pedido
        });

    } catch (error) {
        res.status(500).json(error);
    }
};
