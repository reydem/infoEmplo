// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Usuarios.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: 'El nombre es obligatorio'
    },
    primerApellido: {
        type: String,
        required: 'El primer apellido es obligatorio'
    },
    segundoApellido: {
        type: String,
        required: 'El segundo apellido es obligatorio'
    },
    correo: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'El correo es obligatorio'
    },
    telefono: {
        type: String,
        required: 'El teléfono es obligatorio'
    },
    password: {
        type: String,
        required: 'La contraseña es obligatoria'
    },
    fotoPerfil: {
        type: String, // Ruta o URL al archivo de la foto de perfil
        default: null
    },
    hojaVida: {
        type: String, // Ruta o URL al archivo de la hoja de vida
        default: null
    },
    esReclutador: {
        type: Boolean,
        default: false // Si no se marca, el usuario es "no empleado"
    }
}, { timestamps: true });

export default mongoose.model('Usuarios', usuariosSchema);

