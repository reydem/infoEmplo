// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Vacantes.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const vacantesSchema = new Schema({
    titulo: { // Cambiado de "nombre" a "titulo" para mayor claridad
        type: String,
        trim: true
    },
    salario_ofrecido: { // Más descriptivo que "salario"
        type: Number
    },
    imagen_empresa: { // Cambiado de "imagen" a "imagen_empresa" para reflejar su propósito
        type: String
    }
});
export default mongoose.model('Vacantes', vacantesSchema);