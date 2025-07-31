import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true, trim: true },
  presentacion: { type: mongoose.Schema.Types.ObjectId, ref: 'presentacion', required: true },
  laboratorio: { type: mongoose.Schema.Types.ObjectId, ref: 'laboratorio', required: true },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'tipo', required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  infoAdicional: {type:String} // URL de Cloudinary
});

const ModeloProducto = mongoose.models.producto || mongoose.model('producto', productoSchema);

export default ModeloProducto;
