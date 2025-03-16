// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/vacantesController.js
import Vacantes from '../models/Vacantes.js';
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../../uploads/');
      fs.mkdirSync(dir, { recursive: true });
      console.log('Guardar en directorio:', dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      const filename = `${shortid.generate()}.${extension}`;
      console.log('Guardar archivo como:', filename);
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

export const subirArchivo = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      console.log('Error de subida:', error);
      res.status(400).json({ mensaje: error.message });
      return;
    }
    if (req.files) {
      console.log('Archivos subidos:', req.files);
    }
    next();
  });
};

export const nuevoVacante = async (req, res, next) => {
  try {
      // Verificar si el usuario autenticado es reclutador
      if (!req.usuario || !req.usuario.esReclutador) {
          return res.status(403).json({ mensaje: '❌ No tienes permiso para crear vacantes' });
      }

      const vacante = new Vacantes({
          titulo: req.body.titulo,
          descripcion: req.body.descripcion,
          salario_ofrecido: req.body.salario_ofrecido,
          reclutador: req.usuario.id // Asigna la vacante al usuario reclutador
      });

      if (req.files && req.files.length > 0) {
          vacante.imagen_empresa = req.files[0].filename;
      }

      await vacante.save();
      res.json({ mensaje: '✅ Vacante creada correctamente' });
  } catch (error) {
      console.log(error);
      next();
  }
};

// Muestra todas las vacantes
export const mostrarVacantes = async (req, res, next) => {
  try {
    const vacantes = await Vacantes.find({});
    res.json(vacantes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Muestra vacante por ID
export const mostrarVacante = async (req, res, next) => {
  try {
    const vacante = await Vacantes.findById(req.params.idVacante);

    if (!vacante) {
      return res.status(404).json({ mensaje: 'Esa vacante no existe' });
    }

    res.status(200).json(vacante);
  } catch (error) {
    console.error('Error al buscar la vacante:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const actualizarVacante = async (req, res, next) => {
  try {
    const nuevoVacante = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion, // Nueva propiedad agregada
      salario_ofrecido: req.body.salario_ofrecido
    };

    const vacanteAnterior = await Vacantes.findById(req.params.idVacante);
    if (!vacanteAnterior) {
      return res.status(404).json({ mensaje: 'Vacante no encontrada' });
    }

    console.log('Vacante anterior:', vacanteAnterior);
    console.log('Datos a actualizar:', nuevoVacante);

    if (req.files && req.files[0]) {
      nuevoVacante.imagen_empresa = req.files[0].filename;
    } else {
      nuevoVacante.imagen_empresa = vacanteAnterior.imagen_empresa;
    }

    const vacanteActualizado = await Vacantes.findByIdAndUpdate(
      req.params.idVacante,
      nuevoVacante,
      { new: true }
    );

    res.json(vacanteActualizado);
  } catch (error) {
    console.error('Error al actualizar la vacante:', error);
    next(error);
  }
};

// Elimina una vacante por ID
export const eliminarVacante = async (req, res, next) => {
  try {
    await Vacantes.findByIdAndDelete({ _id: req.params.idVacante });
    res.json({ mensaje: 'La vacante se ha eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const postularVacante = async (req, res, next) => {
  try {
      // Verificar si el usuario está autenticado
      if (!req.usuario) {
          return res.status(401).json({ mensaje: '❌ Debes iniciar sesión para postularte' });
      }

      const vacante = await Vacantes.findById(req.params.idVacante);

      if (!vacante) {
          return res.status(404).json({ mensaje: '❌ La vacante no existe' });
      }

      // Verificar si el usuario ya está postulado
      if (vacante.postulantes.includes(req.usuario.id)) {
          return res.status(400).json({ mensaje: '⚠️ Ya te has postulado a esta vacante' });
      }

      // Agregar el usuario a la lista de postulantes
      vacante.postulantes.push(req.usuario.id);
      await vacante.save();

      res.json({ mensaje: '✅ Te has postulado exitosamente a la vacante' });
  } catch (error) {
      console.error('Error al postularse a la vacante:', error);
      res.status(500).json({ mensaje: '❌ Hubo un error al postularse' });
  }
};