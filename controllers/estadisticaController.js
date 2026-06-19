const Pedido = require('../models/Pedido');

exports.productosMasVendidos = async (req, res) => {
  try {
    const resultado = await Pedido.aggregate([
      { $unwind: '$productos' },

      {
        $group: {
          _id: '$productos.producto',
          totalVendido: {
            $sum: '$productos.cantidad'
          }
        }
      },

      {
        $sort: {
          totalVendido: -1
        }
      },

      {
        $limit: 5
      }
    ]);

    res.json(resultado);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};
