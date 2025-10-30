import ModeloProveedor from "../../models/ModeloProveedor.js";

//API para obtener proveedores
const obtenerProveedores = async (req, res) => {
    try {

        const proveedores = await ModeloProveedor.find({});
        res.status(200).json({ success: true, proveedores });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para añadir un nuevo proveedor
const nuevoProveedor = async (req, res) => {
    try {

        const { nombre, direccion, telefono, mail } = req.body;

        if (!nombre || !direccion || !telefono || !mail) {
            return res.status(400).json({ success: false, message: 'Todos los campos deben estar completos' });
        }

        const yaExiste = await ModeloProveedor.findOne({ nombre });
        if (yaExiste) {
            return res.status(409).json({ success: false, message: 'El proveedor ya existe' });
        }

        const proveedorDatos = {
            nombre,
            direccion,
            telefono,
            mail
        }

        const nuevoProveedor = new ModeloProveedor(proveedorDatos);
        await nuevoProveedor.save();

        res.status(201).json({ success: true, message: 'Nuevo proveedor añadido' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para eliminar un proveedor
const eliminarProveedor = async (req, res) => {
    try {

        //Para eliminar un proveedor es necesaria la contraseña del administrador
        const { contraseña } = req.body;
        const { id } = req.params;

        if (contraseña !== process.env.ADMIN_CONTRASENA) {
            return res.status(403).json({ success: false, message: 'Contraseña invalida' });
        }

        await ModeloProveedor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Proveedor eliminado con exito' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para editar un proveedor
const editarProveedor = async (req, res) => {
    try {

        const { nombre, direccion, telefono, mail } = req.body;
        const { id } = req.params;

        const proveedor = await ModeloProveedor.findById(id);
        if (!proveedor) {
            return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
        }

        // Actualizar los campos del proveedor
        proveedor.nombre = nombre || proveedor.nombre;
        proveedor.direccion = direccion || proveedor.direccion;
        proveedor.telefono = telefono || proveedor.telefono;
        proveedor.mail = mail || proveedor.mail;

        await proveedor.save();

        res.status(200).json({ success: true, message: 'Proveedor actualizado correctamente' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

export {
    obtenerProveedores,
    nuevoProveedor,
    eliminarProveedor,
    editarProveedor
}
