import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema({
    nombre: {type:String, required:true, unique:true, trim:true},
    direccion: {type:String, required:true, trim:true},
    telefono: {type:String, required:true},
    mail: {type:String, required:true}
})

const ModeloProveedor = mongoose.models.proveedor || mongoose.model('proveedor', ProveedorSchema);

export default ModeloProveedor;