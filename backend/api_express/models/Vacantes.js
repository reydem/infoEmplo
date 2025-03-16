// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Vacantes.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vacantesSchema = new Schema({
    titulo: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    salario_ofrecido: {
        type: Number
    },
    imagen_empresa: {
        type: String
    },
    reclutador: { // Asociamos la vacante con el usuario reclutador
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    postulantes: [{ // Lista de usuarios que se postulan
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }]
});

export default mongoose.model('Vacantes', vacantesSchema);
