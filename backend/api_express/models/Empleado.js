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
        sparse: true,
        lowercase: true,
        trim: true
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
      timestamps: true, 
    }
  );
  
  export default mongoose.model('Empleado', empleadosSchema);
  



  