// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/usuariosController.js
import Usuarios from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
    try {
        // Leer datos del cuerpo de la solicitud
        const { email, nombre, password, telefono, direccion, fechaNacimiento } = req.body;

        // Verificar si el usuario ya existe
        const existeUsuario = await Usuarios.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
        }

        // Crear el nuevo usuario
        const usuario = new Usuarios({
            email,
            nombre,
            password: await bcrypt.hash(password, 12),
            telefono,
            direccion,
            fechaNacimiento,
        });

        // Guardar en la base de datos
        await usuario.save();

        res.status(201).json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error al registrar el usuario' });
    }
};
export const autenticarUsuario = async (req, res, next) => {
    // buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });
    if(!usuario) {
        // Si el usuario no existe
        await res.status(401).json({mensaje : 'Ese usuario no existe'});
        next();
    } else {
        if(!usuario) {
            // Si el usuario no existe
            await res.status(401).json({mensaje : 'Ese usuario no existe'});
            next();
        } else {
            // El usuario existe, verificar si el password es correcto o incorrecto
            if(!bcrypt.compareSync(password, usuario.password )) {
                // si el password es incorrecto
                await res.status(401).json({ mensaje : 'Password Incorrecto'});
                next();
            } else {
                // password correcto, firmar el token
                const token = jwt.sign({
                    email : usuario.email, 
                    nombre: usuario.nombre, 
                    id : usuario._id
                }, 
                'LLAVESECRETA', 
                {
                    expiresIn : '1h'
                });     
                // retornar el TOKEN
                res.json({ token });
            }   
        }
    }
};