import ModeloProducto from "../../models/ModeloProducto.js";
import ModeloPresentacion from "../../models/ModeloPresentacion.js";
import mongoose from "mongoose";

//API para obtener todos los productos GET
const obtenerProductos = async (req, res) => {
    try {

        const productos = await ModeloProducto.find({})
        return res.status(200).json({ success: true, productos });

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

//API para crear un nuevo producto POST
const nuevoProducto = async (req, res) => {
    try {

        const { nombre, presentacion, laboratorio, tipo, precio, infoAdicional } = req.body;
        const imagen = req.file;

        //Validamos que los campos esten completos
        if (!nombre || !presentacion || !laboratorio || !tipo || !precio) {
            res.status(400).json({ success: false, message: 'Todos los campos deben estar completos' });
        }

        //Validamos los ID's de referencia enviados desde el frontend
        const ids = { presentacion, laboratorio, tipo };
        for (const id in ids) {
            if (!mongoose.Types.ObjectId.isValid(ids[id])) {
                return res.status(400).json({ success: false, message: `ID de ${id} es inválido.` });
            }
        }

        //Validados los ID pasamos a validar la existencia de dichos documentos
        const [presentacionDoc, laboratorioDoc, tipoDoc] = await Promise.all([
            ModeloPresentacion.findById(presentacion),
            ModeloLaboratorio.findById(laboratorio),
            ModeloTipo.findById(tipo)
        ]);

        if (!presentacionDoc || !laboratorioDoc || !tipoDoc) {
            return res.status(400).json({ success: false, message: 'Presentación, laboratorio o tipo no encontrado' });
        }

        //Subimos la imagen a cloudinary
        const subirImagen = await cloudinary.uploader.upload(imagen.path, { resource_type: 'image' });
        const URLimagen = subirImagen.secure_url;

        const productoDatos = {
            nombre,
            presentacion,
            laboratorio,
            tipo,
            precio,
            infoAdicional,
            imagen: URLimagen
        }

        const nuevoProducto = new ModeloProducto(productoDatos);
        await nuevoProducto.save();

        res.json({ success: true, message: 'Nuevo producto creado' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para eliminar un producto
const eliminarProducto = async (req, res) => {
    try {

        //Para eliminar un producto es necesaria la contraseña de el administrador
        const { contraseña } = req.body;
        const { id } = req.params;

        if (contraseña !== process.env.ADMIN_CONTRASENA) {
            return res.status(403).json({ success: false, message: 'Contraseña incorrecta' });
        }

        await ModeloProducto.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'El producto fue eliminado exitosamente' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para editar la información de un producto
const editarProducto = async (req, res) => {
    try {

        const { id } = req.params;
        const { nombre, presentacion, laboratorio, tipo, precio, infoAdicional } = req.body;
        const imagen = req.file;

        //Validación de que el producto existe en la base de datos
        const producto = await ModeloProducto.findById(id);
        if (!producto) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        //Validamos si hay una nueva imagen, en caso de que la haya la subimos a cloudinary
        let nuevaImagenURL = producto.imagen;
        if (imagen) {
            const subirImagen = await cloudinary.uploader.upload(imagen.path);
            nuevaImagenURL = subirImagen.secure_url;
        }

        // Actualizar los campos del producto
        producto.nombre = nombre || producto.nombre;
        producto.presentacion = presentacion || producto.presentacion;
        producto.laboratorio = laboratorio || producto.laboratorio;
        producto.tipo = tipo || producto.tipo;
        producto.precio = precio || producto.precio;
        producto.infoAdicional = infoAdicional || producto.infoAdicional;
        producto.imagen = nuevaImagenURL;

        await producto.save();

        res.status(200).json({ success: true, message: 'Información del producto actualizada' });


    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

export { 
    obtenerProductos, 
    nuevoProducto, 
    eliminarProducto, 
    editarProducto }; 

