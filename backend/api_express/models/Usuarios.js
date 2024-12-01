// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Usuarios.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'El correo electrónico es obligatorio'
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre',
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    fechaNacimiento: {
        type: Date,
        required: false
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export default mongoose.model('Usuarios', usuariosSchema);
