// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/models/Empleado.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const empleadosSchema = new Schema(
    {
      nombre: {
        type: String,
        trim: true,
      },
      apellido: {
        type: String,
        trim: true,
      },
      empresa: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
      telefono: {
        type: String,
        trim: true,
      },
      buttonText: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true, // Agrega automáticamente createdAt y updatedAt
    }
  );
  
  export default mongoose.model('Empleado', empleadosSchema);
  