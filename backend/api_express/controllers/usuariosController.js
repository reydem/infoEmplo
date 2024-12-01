// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/usuariosController.js
import Usuarios from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
    try {
        // Procesar archivo de foto de perfil y hoja de vida si están presentes
        const { 
            nombre, 
            primerApellido, 
            segundoApellido, 
            correo, 
            telefono, 
            password 
        } = req.body;

        const usuario = new Usuarios({
            nombre,
            primerApellido,
            segundoApellido,
            correo,
            telefono,
            password: await bcrypt.hash(password, 12), // Hashear contraseña
            fotoPerfil: req.files?.fotoPerfil?.path || null, // Ruta del archivo cargado
            hojaVida: req.files?.hojaVida?.path || null // Ruta del archivo cargado
        });

        await usuario.save();
        res.json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error al registrar el usuario' });
    }
};

export const autenticarUsuario = async (req, res, next) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuarios.findOne({ correo });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'El usuario no existe' });
        }

        // Comparar contraseñas
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign(
            { id: usuario._id, correo: usuario.correo, nombre: usuario.nombre },
            'LLAVESECRETA',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
};
