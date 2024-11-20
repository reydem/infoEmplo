// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Ofertas.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ofertasSchema = new Schema({
    empleado: {
        type: Schema.ObjectId, 
        ref: 'Empleado'
    }, 
    oferta: [{
        vacante: {
            type: Schema.ObjectId,
            ref: 'Vacantes'
        }, 
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

export default mongoose.model('Ofertas', ofertasSchema);