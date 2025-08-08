import cron from 'node-cron';
import ModeloLote from '../models/ModeloLote.js';

export function startLoteScheduler() {
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('Ejecutando tarea programada para actualizar lotes...');
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const result = await ModeloLote.updateMany(
        { fechaVencimiento: { $lte: today }, activo: true },
        { $set: { activo: false } }
      );

      console.log(`Lotes actualizados: ${result.modifiedCount}`);
    } catch (error) {
      console.error('Error en la tarea de actualización de lotes:', error);
    }
  });
}
