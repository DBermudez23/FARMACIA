import mongoose, { Model } from "mongoose";

const TipoSchema = new mongoose.Schema({
    nombre: {type:String, required:true, unique:true, trim:true}
});

const ModeloTipo = mongoose.models.tipo || mongoose.model('tipo', TipoSchema);

export default ModeloTipo;