import mongoose from "mongoose";

const LoteSchema = new mongoose.Schema({
    producto: {type:mongoose.Schema.Types.ObjectId, ref:'producto', required:true},
    proveedor: {type:mongoose.Schema.Types.ObjectId, ref:'proveedor', required:true},
    precio: {type:Number, required:true, min: 0},
    cantidad: {type:Number, required:true, min:0},
    fechaLlegada: {type:Date, required:true},
    fechaVencimiento: {type:Date, required:true},
    infoAdicional: {type:String}
}, {timestamps:true})

const ModeloLote = mongoose.models.lote || mongoose.model('lote', LoteSchema);

export default ModeloLote;