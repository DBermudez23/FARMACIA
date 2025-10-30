import ModeloLote from "../../models/ModeloLote.js";

//API para obtener todos los lotes de la base de datos
const obtenerLotes = async (req, res) => {
    try {

        const lotes = await ModeloLote.find({});
        res.status(200).json({ success: true, lotes });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
};

// API para obtener lotes vencidos
const obtenerLotesVencidos = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // considerar todo el día

        // Buscar lotes con fecha de vencimiento menor o igual a hoy
        const lotesVencidos = await ModeloLote.find({
            fechaVencimiento: { $lte: today }
        });

        res.status(200).json({ success: true, lotes: lotesVencidos });
    } catch (error) {
        console.error("Error al obtener lotes vencidos:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API para obtener lotes a vencer en menos de 60 días
const obtenerLotesPorVencer = async (req, res) => {
    try {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaLimite = new Date(hoy);
        fechaLimite.setDate(fechaLimite.getDate() + 60);

        const lotesPorVencer = await ModeloLote.find({
            fechaVencimiento: { $gte: hoy, $lte: fechaLimite }
        });

        res.status(200).json({ success: true, lotes: lotesPorVencer });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//API para añadir un nuevo lote
const nuevoLote = async (req, res) => {
    try {

        const { producto, proveedor, precio, cantidad, fechaLlegada, fechaVencimiento } = req.body;

        if (!producto || !proveedor || !precio || !cantidad || !fechaLlegada || !fechaVencimiento) {
            return res.status(400).json({ success: false, message: 'Todos los campos deben estar completos' });
        }

        //Validamos los ID's de referencia
        const ids = { producto, proveedor };
        for (const id in ids) {
            if (!mongoose.Types.ObjectId.isValid(ids[id])) {
                return res.status(400).json({ success: false, message: `El ID de ${id} es invalido` });
            }
        }

        //Con los id correctos pasamos a validar la existencia de dichos documentos
        const [productoDoc, proveedorDoc] = await Promise.all([
            ModeloProducto.findById(producto),
            ModeloProveedor.findById(proveedor)
        ]);

        if (!productoDoc || !proveedorDoc) {
            return res.status(400).json({ success: false, message: 'El producto o proveedor asociado no existe' });
        }

        if (isNaN(precio) || isNaN(cantidad)) {
            return res.status(400).json({ success: false, message: 'Precio y cantidad deben ser números válidos' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const llegada = new Date(fechaLlegada);
        const vencimiento = new Date(fechaVencimiento);
        const activo = vencimiento >= today;

        if (llegada > vencimiento) {
            return res.status(400).json({ success: false, message: 'La fecha de llegada no puede ser posterior a la fecha de vencimiento' });
        }
        if (vencimiento < today) {
            return res.status(400).json({ success: false, message: 'La fecha de vencimiento no puede ser anterior a hoy' });
        }

        const loteDatos = {
            producto,
            proveedor,
            precio,
            cantidad,
            fechaLlegada: new Date(fechaLlegada),
            fechaVencimiento: new Date(fechaVencimiento),
            activo
        }

        const nuevoLote = new ModeloLote(loteDatos);
        await nuevoLote.save();

        res.status(201).json({ success: true, message: 'Nuevo lote creado' });


    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para eliminar lote
const eliminarLote = async (req, res) => {
    try {

        //Para eliminar un lote es necesaria la contraseña del administrador
        const { contraseña } = req.body;
        const { id } = req.params;

        if (contraseña !== process.env.ADMIN_CONTRASENA) {
            return res.status(403).json({ success: false, message: 'Contraseña incorrecta' });
        }

        await ModeloLote.findByIdAndDelete(id);
        res.status(204).json({ success: true, message: 'Lote eliminado exitosamente' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

// API para editar lote
const editarLote = async (req, res) => {
    try {
        const { id } = req.params;
        // Campos permitidos
        const { proveedor, cantidad, fechaLlegada, fechaVencimiento, precio } = req.body;

        // Buscar lote
        const lote = await ModeloLote.findById(id);
        if (!lote) {
            return res.status(404).json({ success: false, message: 'Lote no encontrado' });
        }

        // Actualizar solo si el valor fue enviado
        if (proveedor !== undefined) lote.proveedor = proveedor;
        if (cantidad !== undefined) lote.cantidad = cantidad;
        if (fechaLlegada !== undefined) lote.fechaLlegada = fechaLlegada;
        if (fechaVencimiento !== undefined) lote.fechaVencimiento = fechaVencimiento;
        if (precio !== undefined) lote.precio = precio;

        await lote.save();

        res.status(200).json({ success: true, message: 'Lote actualizado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    obtenerLotes,
    obtenerLotesVencidos,
    obtenerLotesPorVencer,
    nuevoLote,
    eliminarLote,
    editarLote
}