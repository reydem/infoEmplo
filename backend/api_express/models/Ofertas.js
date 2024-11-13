// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Ofertas.js
const mongoose = require('mongoose');
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

module.exports = mongoose.model('Ofertas', ofertasSchema);