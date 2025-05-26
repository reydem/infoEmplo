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
    // 1) Capturamos también el texto de 'hojaVida' si viene como campo Text
    const {
      nombre,
      primerApellido,
      segundoApellido,
      correo,
      telefono,
      password,
      esReclutador,
      hojaVida: hojaVidaText
    } = req.body;

    // 2) Verificar si el correo ya está registrado
    const usuarioExistente = await Usuarios.findOne({ correo });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: '❌ El correo ya está registrado' });
    }

    // 3) Manejo de archivos: fotoPerfil y hojaVida
    const fotoPerfilFile = req.files?.find(
      (f) => f.fieldname === 'fotoPerfil'
    );
    const hojaVidaFile = req.files?.find(
      (f) => f.fieldname === 'hojaVida'
    );

    const fotoPerfil = fotoPerfilFile
      ? path.basename(fotoPerfilFile.path)
      : null;

    // Si viene como File, lo usamos; si viene como Text, usamos el texto; si no, null
    const hojaVida = hojaVidaFile
      ? path.basename(hojaVidaFile.path)
      : hojaVidaText || null;

    // 4) Crear y guardar el usuario
    const usuario = new Usuarios({
      nombre,
      primerApellido,
      segundoApellido,
      correo,
      telefono,
      password: await bcrypt.hash(password, 12),
      fotoPerfil,
      hojaVida,
      esReclutador: esReclutador === 'true',
    });

    await usuario.save();

    // 5) Respuesta al cliente
    res.json({
      mensaje: '✅ Usuario creado correctamente',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        esReclutador: usuario.esReclutador,
      },
    });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res
      .status(500)
      .json({ mensaje: '❌ Hubo un error al registrar el usuario' });
  }
};


// 📌 Autenticación de usuario (login)
export const autenticarUsuario = async (req, res) => {
    console.log('▶️ autenticarUsuario.body:', req.body);
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
            .select('-password') // Excluir la contraseña
            .populate({
                path: 'postulaciones.vacante',  // Populamos el campo anidado
                select: 'titulo salario_ofrecido imagen_empresa createdAt' // Selecciona los campos que necesites
            });

        if (!usuario) {
            return res.status(404).json({ mensaje: '❌ Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error("❌ Error al obtener usuario autenticado:", error);
        res.status(500).json({ mensaje: '❌ Error interno del servidor' });
    }
};


export const actualizarPerfil = async (req, res) => {
    try {
        const { telefono, hojaVida } = req.body;
        let fotoPerfil = null;

        // Manejo de archivo de fotoPerfil si se envía
        if (req.files?.find(file => file.fieldname === 'fotoPerfil')) {
            fotoPerfil = path.basename(req.files.find(file => file.fieldname === 'fotoPerfil').path);
        }

        const updateData = { telefono, hojaVida };
        if (fotoPerfil) updateData.fotoPerfil = fotoPerfil;

        // Se utiliza el id del usuario autenticado, que el middleware ya coloca en req.usuario
        const usuarioActualizado = await Usuarios.findByIdAndUpdate(
            req.usuario.id,
            updateData,
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: '❌ Usuario no encontrado' });
        }

        res.json({ mensaje: '✅ Perfil actualizado', usuario: usuarioActualizado });
    } catch (error) {
        console.error("❌ Error actualizando perfil:", error);
        res.status(500).json({ mensaje: '❌ Error al actualizar perfil' });
    }
};
