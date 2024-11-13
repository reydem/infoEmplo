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
// Configuración de Multer para subir un solo archivo con el nombre de campo 'imagen'
const upload = multer(configuracionMulter).single('imagen_empresa');

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
  console.log('Archivo subido:', req.file); // Depurar archivo subido
  const vacante = new Vacantes(req.body);
  try {
    console.log('Archivo subido:', req.file); // Depuración
    if (req.file && req.file.filename) {
      vacante.imagen_empresa = req.file.filename;
    }
    await vacante.save();
    res.json({ mensaje: 'Se agregó un nuevo vacante' });
  } catch (error) {
    console.log(error);
    next();
  }
};