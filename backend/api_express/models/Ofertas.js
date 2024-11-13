// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Ofertas.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ofertasSchema = new Schema({
    empleado: { 
        type: Schema.ObjectId, // Relación con el modelo Empleado
        ref: 'Empleado',
    },
    vacante: [{ 
        vacante: { 
            type: Schema.ObjectId, // Relación con el modelo Vacantes
            ref: 'Vacantes',
        },
        cantidad: Number // Cantidad de vacantes ofrecidas
    }],
    total: { 
        type: Number // Total relacionado con la oferta (puede ser salario acumulado, etc.)
    }
});

module.exports = mongoose.model('Ofertas', ofertasSchema);
