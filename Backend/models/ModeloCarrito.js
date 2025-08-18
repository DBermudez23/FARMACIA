import mongoose from "mongoose";

const CarritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "vendedor", required: true },
  items: [
    {
      lote: { type: mongoose.Schema.Types.ObjectId, ref: "lote", required: true },
      cantidad: { type: Number, required: true, min: 1 }
    }
  ]
}, { timestamps: true });

const ModeloCarrito = mongoose.models.carrito || mongoose.model("carrito", CarritoSchema);

export default ModeloCarrito;
