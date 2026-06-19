const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'clave_secreta_ecommerce';

exports.registro = async (req, res) => {
	try {
		const {nombre, email, password, rol } = req.body;

		const existe = await Usuario.findOne({ email });

		if (existe) {
			return res.status(400).json({
				mensaje: 'El usuario ya existe'
			});
		}

		const passwordEncriptado = await bcrypt.hash(password, 10);

		const usuario = new Usuario({
			nombre,
			email,
			password: passwordEncriptado,
			rol
		});
	
		await usuario.save();

		res.json({
			mensaje: 'Usuario registrado correctamente',
			usuario
		});
	}catch (error) {
		res.status(500).son(error);
	}
};

exports.login = async(req, res) => {
	try {
		const {email, password } = req.body;

		const usuario = await Usuario.findOne ({ email });

		if (!usuario) {
			return res.status(404).json({
				mensaje: 'Usuario no encontrado'
			});
		}
	
		const passwordValido = await bcrypt.compare(password, usuario.password);

		if (!passwordValido) {
			return res.status(401).json({
				mensaje: 'Contraseña incorrecta'
			});
		}

		const token = jwt.sign(
		{
			id: usuario._id,
			email: usuario.email,
			rol: usuario.rol
		},

		SECRET,
		{ expiresIn: '2h' }
		);

		res.json({
			mensaje: 'Login correcto',
			token
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
exports.listarUsuarios = async (req, res) => {
	const usuarios = await Usuario.find();
	res.json(usuarios);
};
