// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Empleado.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const empleadosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    buttonText: {
        type: String, // Puedes ajustar el tipo según el uso previsto
        trim: true // Esto eliminará espacios en blanco iniciales y finales
    },
    description: {
        type: String, // Puedes usar `String` para texto, o ajustar según tu requerimiento
        trim: true // Ayuda a mantener los datos limpios
    }
});

export default mongoose.model('Empleado', empleadosSchema);