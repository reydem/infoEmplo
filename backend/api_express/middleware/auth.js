// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ mensaje: '❌ No autenticado, no hay JWT en la cabecera' });
    }

    // Validar formato "Bearer TOKEN"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ mensaje: '❌ Formato de token inválido. Se espera "Bearer TOKEN"' });
    }

    const token = tokenParts[1]; // Extraer solo el token

    try {
        const usuarioVerificado = jwt.verify(token, 'LLAVESECRETA'); // Validar token
        req.usuario = usuarioVerificado; // Agregar usuario al request
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: '❌ Token inválido o expirado' });
    }
};

export default auth;
