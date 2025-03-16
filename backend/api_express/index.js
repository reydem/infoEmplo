// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/index.js
// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/index.js
import getPort from "get-port";
import express from "express";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Agregar esta importación

// Conectar con MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/infoempleo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Crear el servidor
const app = express();

// Middleware de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
app.use(cors());

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Servir archivos estáticos desde la carpeta correcta
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas de la API
app.use("/", routes());

// Puerto predeterminado y búsqueda dinámica
const defaultPort = 5000;
getPort({ port: [...Array(101).keys()].map(i => defaultPort + i) })
  .then(port => {
    app.listen(port, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${port}`);
      console.log(`📂 Archivos subidos disponibles en: http://localhost:${port}/uploads/`);
    });
  })
  .catch(err => {
    console.error("❌ Error al iniciar el servidor:", err);
  });


// mongoose.connect('mongodb://127.0.0.1:27017/restapis')
//     .then(() => {
//         console.log('Conexión a la base de datos restapis correcta !!!');
//     })
//     .catch(err => {
//         console.error('Error conectando a la base de datos', err);