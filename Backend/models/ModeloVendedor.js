import mongoose from "mongoose";

const VendedorSchema = new mongoose.Schema({
    nombre: {type:String, required:true, trim:true},
    telefono: {type:String, required:true, trim:true},
    mail: {type:String, required:true, trim:true},
    nacimiento : {type:Date, required:true},
    genero: {type:String, required:true, enum: ["Masculino", "Femenino", "Otro"]},
    direccion: {type:String, required:true, trim:true}
}, {timestamps:true}) // Para registro de cuando se creo el modelo o se modifico

const ModeloVendedor = mongoose.models.vendedor || mongoose.model('vendedor', VendedorSchema);

export default ModeloVendedor;