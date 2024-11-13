// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/vacantesController.js
const Vacantes = require('../models/Vacantes');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../../uploads/');
      fs.mkdirSync(dir, { recursive: true });
      console.log('Guardar en directorio:', dir); // Verifica la ruta aquí
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      const filename = `${shortid.generate()}.${extension}`;
      console.log('Guardar archivo como:', filename); // Verifica el nombre de archivo aquí
      cb(null, filename);
    }
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato No válido'));
    }
  }
};
// Configuración de Multer para subir archivos con cualquier nombre de campo
const upload = multer(configuracionMulter).any();

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      console.log('Error de subida:', error);
      res.status(400).json({ mensaje: error.message });
      return;
    }
    // Pasa al siguiente middleware sin enviar respuesta aún
    if (req.files) {
      console.log('Archivos subidos:', req.files); // Verifica si hay archivos
    }
    next();
  });
};

exports.nuevoVacante = async (req, res, next) => {
  console.log('Datos del cuerpo:', req.body); // Depurar datos enviados
  console.log('Archivos subidos:', req.files); // Depurar archivos subidos

  const vacante = new Vacantes(req.body);

  try {
    // Verifica si hay un archivo subido y guarda su nombre
    if (req.files && req.files.length > 0) {
      vacante.imagen_empresa = req.files[0].filename;
    }

    await vacante.save();
    res.json({ mensaje: 'Se agregó un nuevo vacante' });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra todas las vacantes
exports.mostrarVacantes = async (req, res, next) => {
  try {
    // Obtener todos los productos
    const vacantes = await Vacantes.find({});

    // Enviar la respuesta en formato JSON
    res.json(vacantes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Muestra vacante por (ID)
exports.mostrarVacante = async (req, res, next) => {
  try {
    const vacante = await Vacantes.findById(req.params.idVacante);

    if (!vacante) {
      res.json({ mensaje: 'Ese vacante no existe' });
      return next();
    }
    res.json(vacante);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Actualiza un vacante via (ID)
exports.actualizarVacante = async (req, res, next) => {
  try {
      // construir un nuevo vacante
      let nuevoVacante = req.body;
      // verificar si hay imagen nueva
      if (req.files && req.files[0] && req.files[0].filename) {
        nuevoVacante.imagen = req.files[0].filename;
      } else {
          let vacanteAnterior = await Vacantes.findById(req.params.idVacante);
          nuevoVacante.imagen = vacanteAnterior.imagen;
      }
      let vacante = await Vacantes.findOneAndUpdate(
          { _id: req.params.idVacante },
          nuevoVacante,
          { new: true }
      );
      res.json(vacante);
  } catch (error) {
      console.log(error);
      next();
  }
};
// Elimina un producto via (ID)
exports.eliminarVacante = async (req, res, next) => {
  try {
      await Vacantes.findByIdAndDelete({ _id : req.params.idVacante });
      res.json({mensaje : 'La vacante se ha eliminado'});
  } catch (error) {
      console.log(error);
      next();
  }
}