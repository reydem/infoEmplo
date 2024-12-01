// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/ofertasController.js
import Ofertas from '../models/Ofertas.js';

export const nuevaOferta = async (req, res, next) => {
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
export const mostrarOfertas = async (req, res, next) => {
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
export const mostrarOferta = async (req, res, next) => {
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
export const actualizarOferta = async (req, res, next) => {
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
export const eliminarOferta = async (req, res, next) => {
    try {
        await Ofertas.findOneAndDelete({ _id : req.params.idOferta});
        res.json({ mensaje : 'La oferta se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}

export const buscarOferta  = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}