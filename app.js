require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Atlas conectado'))
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

app.get('/', (req, res) => {
  res.send('API Ecommerce funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
