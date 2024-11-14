// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/ofertasController.js
const Ofertas = require('../models/Ofertas');

exports.nuevaOferta = async (req, res, next) => {
    const oferta = new Ofertas(req.body);
    try {
        await oferta.save();
        res.json({ mensaje: 'Se agregó una nueva oferta' });
    } catch (error) {
        console.log(error);
        next();
    }
}
// Muestra todos los ofertas
exports.mostrarOfertas = async (req, res, next) => {
    try {
        const oferta = await Ofertas.find({}).populate('empleado').populate({
            path: 'oferta.vacante',
            model: 'Vacantes'
        });
        res.json(oferta);
    } catch (error) {
        console.log(error);
        next();
    }
}
// Muestra oferta por (ID)
exports.mostrarOferta = async (req, res, next) => {
    try {
        const oferta = await Ofertas.findById(req.params.idOferta).populate('empleado').populate({
            path: 'oferta.vacante',
            model: 'Vacantes'
        });
        if (!oferta) {
            res.json({ mensaje: 'Esta oferta no existe' });
            return next();
        }
        res.json(oferta);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualizar el oferta via (ID)
exports.actualizarOferta = async (req, res, next) => {
    try {
        let oferta = await Ofertas.findOneAndUpdate({_id : req.params.idOferta}, req.body, {
            new: true
        } )
        .populate('empleado')
        .populate({
            path: 'oferta.vacante',
            model: 'Vacantes'
        });
        res.json(oferta)
    } catch (error) {
        console.log(error);
        next();
    }
}

// elimina una oferta por su (ID)
exports.eliminarOferta = async (req, res, next) => {
    try {
        await Ofertas.findOneAndDelete({ _id : req.params.idOferta});
        res.json({ mensaje : 'La oferta se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}