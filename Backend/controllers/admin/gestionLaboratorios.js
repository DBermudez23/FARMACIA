import ModeloLaboratorio from "../../models/ModeloLaboratorio.js";

//API para obtener todos los laboratorios 
const obtenerLaboratorios = async (req, res) => {
    try {

        const laboratorios = await ModeloLaboratorio.find({});
        res.status(200).json({ success: true, laboratorios });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para añadir un nuevo laboratorio
const nuevoLaboratorio = async (req, res) => {
    try {

        const { nombre, direccion, telefono, mail } = req.body;

        if (!nombre || !direccion || !telefono || !mail) {
            return res.status(400).json({ success: false, message: 'Todos los campos deben estar completos' });
        }

        //Validamos si existen más laboratorios con el mismo nombre o mail
        const yaExiste = await ModeloLaboratorio.findOne({ nombre });
        if (yaExiste) {
            return res.status(409).json({ success: false, message: 'Este laboratorio ya existe' });
        }

        const laboratorioDatos = {
            nombre,
            direccion,
            telefono,
            mail
        };

        const nuevoLaboratorio = new ModeloLaboratorio(laboratorioDatos);
        await nuevoLaboratorio.save();

        res.status(201).json({ success: true, message: 'Nuevo laboratorio añadido' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para eliminar laboratorio
const eliminarLaboratorio = async (req, res) => {
    try {

        //Para eliminar un laboratorio es necesaria la contraseña del administrador
        const contraseña = req.body.contraseña;
        console.log(contraseña)
        const { id } = req.params;

        if (contraseña !== process.env.ADMIN_CONTRASENA) {
            return res.status(403).json({ success: false, message: 'Contraseña incorrecta' });
        }

        await ModeloLaboratorio.findByIdAndDelete(id);
        res.status(204).json({ success: true, message: 'Laboratorio eliminado correctamente' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para editar laboratorio
const editarLaboratorio = async (req, res) => {
    try {

        const { nombre, direccion, telefono, mail } = req.body;
        const { id } = req.params;

        const laboratorio = await ModeloLaboratorio.findById(id);
        if (!laboratorio) {
            return res.status(404).json({ success: false, message: 'Laboratorio no encontrado' });
        }

        // Actualizar los campos del laboratorio
        laboratorio.nombre = nombre || laboratorio.nombre;
        laboratorio.direccion = direccion || laboratorio.direccion;
        laboratorio.telefono = telefono || laboratorio.telefono;
        laboratorio.mail = mail || laboratorio.mail;

        await laboratorio.save();

        res.status(200).json({ success: true, message: 'Laboratorio actualizado correctamente' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

export {
    obtenerLaboratorios,
    nuevoLaboratorio,
    eliminarLaboratorio,
    editarLaboratorio
}