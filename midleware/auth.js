const jwt = require('jsonwebtoken');

const SECRET = 'clave_secreta_ecommerce';

module.exports = (req, res, next) => {
        const token = req.header('Authorization');

        if (!token){
                return res.status(401).json({
                        mensaje: 'Acceso denegado. Token requerido'
                });
        }

        try {
                const verificado = jwt.verify(token,SECRET);
                req.usuario = verificado;
                next();
        }catch (error) {
                res.status(400).json({
                        mensaje: 'Token inválido'
                });
        }
};
