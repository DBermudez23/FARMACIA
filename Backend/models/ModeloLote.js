import mongoose from "mongoose";

const LoteSchema = new mongoose.Schema({
    producto: {type:mongoose.Schema.Types.ObjectId, ref:'producto', required:true},
    proveedor: {type:mongoose.Schema.Types.ObjectId, ref:'proveedor', required:true},
    precio: {type:Number, required:true, min: 0},
    cantidad: {type:Number, required:true, min:0},
    cantidadVendida: {type:Number, default:0, min:0},
    fechaLlegada: {type:Date, required:true},
    fechaVencimiento: {type:Date, required:true},
    activo: {type:Boolean, default:true}
}, {timestamps:true})

//Calculo de la cantidad de productos disponibles
LoteSchema.virtual('stockDisponible').get(function(){
    return this.cantidad - this.cantidadVendida;
})

const ModeloLote = mongoose.models.lote || mongoose.model('lote', LoteSchema);

export default ModeloLote;