import ModeloVendedor from "../../models/ModeloVendedor.js";
import validator from "validator";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

//API para obtener información de los vendedores GET
const obtenerVendedores = async (req, res) => {
    try {

        const vendedores = await ModeloVendedor.find({}).select('-contraseña');
        res.json({ success: true, vendedores });

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

//API para añadir un nuevo vendedor POST
const añadirVendedor = async (req, res) => {
    try {

        const { nombre, mail, contrasena, telefono, nacimiento, genero, direccion } = req.body;
        const imagen = req.file;

        console.log(req.body);

        //Validaciones de campos requeridos
        if (!nombre || !mail || !contrasena || !telefono || !nacimiento || !genero || !direccion) {
            return res.status(400).json({ success: false, message: 'Campos incompletos' });
        }

        //Validamos el formato del correo
        if (!validator.isEmail(mail)) {
            return res.json({ success: false, message: 'Formato de correo invalido' });
        }

        //Validamos si ya existe un vendedor con el mismo correo
        const existe = await ModeloVendedor.findOne({ mail });
        if (existe) {
            return res.json({ success: false, message: 'Este correo ya está registrado' });
        }


        //Validamos que sea una contraseña segura
        if (contrasena.length < 8) {
            return res.json({ success: false, message: 'Contraseña insegura' });
        }

        //Encriptamos la contraseña
        const salt = await bcrypt.genSalt(12);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        //Subimos la imagen a cloudinary si existe
        let URLimagen = null;
        if (imagen) {
            const subirImagen = await cloudinary.uploader.upload(imagen.path, { resource_type: 'image' });
            URLimagen = subirImagen.secure_url;
        }

        const vendedorDatos = {
            nombre,
            mail,
            imagen: URLimagen,
            contrasena: contrasenaEncriptada,
            telefono,
            nacimiento,
            genero,
            direccion,
            fecha: Date.now()
        }

        const nuevoVendedor = new ModeloVendedor(vendedorDatos);
        await nuevoVendedor.save();

        res.json({ success: true, message: 'Nuevo vendedor añadido' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para eliminar un vendedor
const eliminarVendedor = async (req, res) => {
    try {

        //La contraseña del administrador es necesaria para eliminar un vendedor
        const { contraseña } = req.body;
        const { id } = req.params;

        if (contraseña !== process.env.ADMIN_CONTRASENA) {
            return res.status(403).json({ success: false, message: 'Contraseña incorrecta' });
        }

        await ModeloVendedor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Vendedor eliminado exitosamente' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para editar la información de un vendedor
const editarVendedor = async (req, res) => {
    try {

        const { id } = req.params;
        const { nombre, telefono, direccion, genero } = req.body;
        const imagen = req.file;

        //Validación de que el vendedor existe en la base de datos
        const vendedor = await ModeloVendedor.findById(id);
        if (!vendedor) {
            return res.status(404).json({ success: false, message: 'Vendedor no encontrado' });
        }

        //Validamos si hay una nueva imagen, en caso de que la haya la subimos a cloudinary
        let nuevaImagenURL = vendedor.imagen;
        if (imagen) {
            const subirImagen = await cloudinary.uploader.upload(imagen.path);
            nuevaImagenURL = subirImagen.secure_url;
        }

        //Actualizamos los campos
        vendedor.nombre = nombre || vendedor.nombre;
        vendedor.telefono = telefono || vendedor.telefono;
        vendedor.direccion = direccion || vendedor.direccion;
        vendedor.genero = genero || vendedor.genero;
        vendedor.imagen = nuevaImagenURL;

        await vendedor.save();

        res.status(200).json({ success: true, message: 'Información del vendedor actualizada' });


    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

export {
    obtenerVendedores,
    añadirVendedor,
    eliminarVendedor,
    editarVendedor
}
