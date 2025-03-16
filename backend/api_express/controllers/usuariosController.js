// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/usuariosController.js
import path from 'path';
import Usuarios from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// 📌 Obtener todos los usuarios (excluyendo contraseñas)
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.find({}, '-password'); // Excluir el campo password por seguridad
        res.json(usuarios);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: '❌ Error al obtener usuarios' });
    }
};

// 📌 Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        // 📌 Extraer datos del formulario
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

        // 📌 Verificar archivos subidos y extraer el nombre del archivo sin la ruta completa
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
            fotoPerfil, // Solo guarda el nombre del archivo
            hojaVida, // Solo guarda el nombre del archivo
            esReclutador: esReclutador === 'true' // Convertir string a booleano
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

        res.json({ token });
    } catch (error) {
        console.error("❌ Error al autenticar usuario:", error);
        res.status(500).json({ mensaje: '❌ Error al autenticar usuario' });
    }
};
