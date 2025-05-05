import getPort from "get-port";
import express from "express";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Importar dependencias de Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
// Importar la configuración de Swagger
import swaggerOptions from "./swaggerConfig.js";

// Conectar con MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/infoempleo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Crear el servidor Express
const app = express();

// Middleware de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta "uploads"
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const defaultPort = 5000;
getPort({ port: [...Array(101).keys()].map(i => defaultPort + i) })
  .then((port) => {
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    // Rutas de la API
    app.use("/", routes());

    app.listen(port, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${port}`);
      console.log(`📂 Archivos subidos disponibles en: http://localhost:${port}/uploads/`);
      console.log(`📄 Documentación API disponible en: http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al iniciar el servidor:", err);
  });


