// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Usuarios.js
import mongoose from 'mongoose';
const { Schema } = mongoose;
const usuariosSchema = new Schema({
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: 'Agrega tu Nombre'
    },
    password: {
        type: String,
        required: true
    }
});
export default mongoose.model('Usuarios', usuariosSchema);