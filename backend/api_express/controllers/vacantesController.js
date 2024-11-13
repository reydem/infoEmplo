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
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
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
      res.status(400).json({ mensaje: error.message });
      return;
    }
    // Pasa al siguiente middleware sin enviar respuesta aún
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