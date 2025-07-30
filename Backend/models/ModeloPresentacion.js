import mongoose from "mongoose";

const PresentacionSchema = new mongoose.Schema({
    nombre: {type:String, required:true, unique:true, trim:true}
})

const ModeloPresentacion = mongoose.models.presentacion || mongoose.model('presentacion', PresentacionSchema);

export default ModeloPresentacion;