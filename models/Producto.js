const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    categoria: String,
    imagen: String
});

module.exports = mongoose.model('Producto', ProductoSchema);
