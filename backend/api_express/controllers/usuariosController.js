// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/usuariosController.js
import path from 'path';
import Usuarios from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ mensaje: '❌ Acceso denegado, se requiere un token' });
    }

    try {
        const usuarioVerificado = jwt.verify(token, 'LLAVESECRETA');
        req.usuario = usuarioVerificado; // Agregamos el usuario al request
        next();
    } catch (error) {
        res.status(401).json({ mensaje: '❌ Token no válido' });
    }
};

// 📌 Obtener todos los usuarios (excluyendo contraseñas)
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.find({}, '-password'); // Excluir el campo password
        res.json(usuarios);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: '❌ Error al obtener usuarios' });
    }
};

// 📌 Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        const { 
            nombre, 
            primerApellido, 
            segundoApellido, 
            correo, 
            telefono, 
            password,
            esReclutador
        } = req.body;

        // 📌 Verificar si el correo ya está registrado
        const usuarioExistente = await Usuarios.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: '❌ El correo ya está registrado' });
        }

        // 📌 Manejo de archivos (fotoPerfil y hojaVida)
        const fotoPerfil = req.files?.find(file => file.fieldname === 'fotoPerfil') 
            ? path.basename(req.files.find(file => file.fieldname === 'fotoPerfil').path)
            : null;

        const hojaVida = req.files?.find(file => file.fieldname === 'hojaVida') 
            ? path.basename(req.files.find(file => file.fieldname === 'hojaVida').path)
            : null;

        // 📌 Crear nuevo usuario
        const usuario = new Usuarios({
            nombre,
            primerApellido,
            segundoApellido,
            correo,
            telefono,
            password: await bcrypt.hash(password, 12), // Hashear contraseña
            fotoPerfil,
            hojaVida,
            esReclutador: esReclutador === 'true'
        });

        await usuario.save();
        res.json({ mensaje: '✅ Usuario creado correctamente' });
    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);
        res.status(500).json({ mensaje: '❌ Hubo un error al registrar el usuario' });
    }
};

// 📌 Autenticación de usuario (login)
export const autenticarUsuario = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuarios.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ mensaje: '❌ Credenciales incorrectas' });
        }

        // 📌 Comparar contraseñas
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(401).json({ mensaje: '❌ Credenciales incorrectas' });
        }

        // 📌 Generar token con información relevante
        const token = jwt.sign(
            { 
                id: usuario._id, 
                correo: usuario.correo, 
                nombre: usuario.nombre,
                esReclutador: usuario.esReclutador 
            },
            'LLAVESECRETA',
            { expiresIn: '1h' }
        );

        res.json({
            token,
            esReclutador: usuario.esReclutador,
            correo: usuario.correo
        });

    } catch (error) {
        console.error("❌ Error al autenticar usuario:", error);
        res.status(500).json({ mensaje: '❌ Error al autenticar usuario' });
    }
};

// 📌 Obtener el usuario autenticado
export const obtenerUsuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuarios.findById(req.usuario.id)
            .select('-password')          // Excluye la contraseña
            .populate('postulaciones');   // Populate de las vacantes referenciadas

        if (!usuario) {
            return res.status(404).json({ mensaje: '❌ Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error("❌ Error al obtener usuario autenticado:", error);
        res.status(500).json({ mensaje: '❌ Error interno del servidor' });
    }
};
