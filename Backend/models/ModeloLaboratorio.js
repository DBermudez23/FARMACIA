import mongoose from "mongoose";

const LaboratorioSchema = new mongoose.Schema({
    nombre: {type: String, required:true, unique:true, trim:true},
    direccion: {type: String, required:true, trim:true},
    telefono: {type:String, required:true},
    mail: {type: String, required:true}
});

const ModeloLaboratorio = mongoose.models.laboratorio || mongoose.model('laboratorio', LaboratorioSchema);

export default ModeloLaboratorio;