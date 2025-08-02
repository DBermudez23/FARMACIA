import mongoose from "mongoose";

const VentaSchema = new mongoose.Schema({
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'producto', required: true },
      cantidad: { type: Number, required: true, min: 1 },
      precioUnitario: { type: Number, required: true, min: 0 }, // Precio de venta
      lote: { type: mongoose.Schema.Types.ObjectId, ref: 'lote', required: true }
    }
  ],
  nombreCliente: { type: String, required: true, trim: true },
  DNICliente: { type: String, required: true, trim: true },
  idVendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendedor', required: true },
  metodoPago: { type: String, enum: ["Efectivo", "Transferencia"], required: true },
  precioTotal: { type: Number, required: true, min: 0 },
  completada: { type: Boolean, default: false }
}, { timestamps: true });

const ModeloVenta = mongoose.models.venta || mongoose.model('venta', VentaSchema);

export default ModeloVenta;
