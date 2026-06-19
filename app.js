const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// CONEXION MONGODB
mongoose.connect('mongodb://192.168.100.20:27017/ecommerce')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error(err));


const productoRoutes = require('./routes/productos');
const usuarioRoutes = require('./routes/usuarios');
const carritoRoutes = require('./routes/carrito');
const pedidoRoutes = require('./routes/pedidos');
const reporteRoutes = require('./routes/reportes');

app.use('/productos', productoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/carrito', carritoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/reportes', reporteRoutes);

// RUTA PRINCIAPL
app.get('/',(req, res) => {
	res.send('API Ecommerce funcionando');
});

//SERVIDOR
app.listen(3000, ()=> {
	console.log('Servidor corriendo en puerto 3000');
});


