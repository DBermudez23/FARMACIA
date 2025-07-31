import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import validator from 'validator';
import ModeloVendedor from '../models/ModeloVendedor.js';
import ModeloLaboratorio from '../models/ModeloLaboratorio.js';
import ModeloLote from '../models/ModeloLote.js';
import ModeloPresentacion from '../models/ModeloPresentacion.js';
import ModeloProducto from '../models/ModeloProducto.js';
import ModeloProveedor from '../models/ModeloProveedor.js';
import ModeloTipo from '../models/ModeloTipo.js';
import ModeloVenta from '../models/ModeloVenta.js';
import mongoose from 'mongoose';


//API para el login del administrador POST
const loginAdmin = async (req, res) => {
    try {

        const { mail, contrasena } = req.body;

        if (mail === process.env.ADMIN_MAIL && contrasena === process.env.ADMIN_CONTRASENA) {
            const token = jwt.sign(mail + contrasena, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Credenciales incorrectas' });
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });

    }
}

// -------------------------------------- VENDEDORES---------------------------------------------

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

        const { nombre, mail, contraseña, telefono, nacimiento, genero, direccion } = req.body;
        const imagen = req.file;

        //Validaciones de campos requeridos
        if (!nombre || !mail || !contraseña || !telefono || !nacimiento || !genero || !direccion) {
            return res.json({ success: false, message: 'Campos incompletos' });
        }

        //Validamos el formato del correo
        if (!validator.isEmail) {
            return res.json({ success: false, message: 'Formato de correo invalido' });
        }

        //Validamos que sea una contraseña segura
        if (contraseña.length < 8) {
            return res.json({ success: false, message: 'Contraseña insegura' });
        }

        //Encriptamos la contraseña
        const salt = await bcrypt.genSalt(12);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        //Subimos la imagen a cloudinary
        const subirImagen = await cloudinary.uploader.upload(imagen.path, { resource_type: 'image' });
        const URLimagen = subirImagen.secure_url;

        const vendedorDatos = {
            nombre,
            mail,
            imagen: URLimagen,
            contraseña: contraseñaEncriptada,
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
        const { id } = req.parms;

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


// -------------------------------------- PRODUCTOS---------------------------------------------
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
        let nuevaImagenURL = vendedor.imagen;
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


// --------------------------------------LABORATORIOS---------------------------------------------
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
        const { contraseña } = req.body;
        const { id } = req.params;

        if (contraseña !== process.env.ADMIN_CONTRASENA) {
            return res.status(403).json({ success: false, message: 'Contraseña incorrecta' });
        }

        await ModeloLaboratorio.findByIdAndDelete(id);
        res.json({ success: true, message: 'Laboratorio eliminado correctamente' });

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


// --------------------------------------PROVEEDORES---------------------------------------------
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


// --------------------------------------LOTES---------------------------------------------




// --------------------------------------TIPOS DE MEDICAMENTO---------------------------------------------

//API para obtener los diferentes tipos de medicamento
const obtenerTipos = async (req, res) => {
    try {

        const tipos = await ModeloTipo.find({});
        res.status(200).json({ success: true, tipos });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

// -------------------------------------- PRESENTACIONES---------------------------------------------

//API para obtener las distintas presentaciones
const obtenerPresentaciones = async (req, res) => {
    try {

        const presentaciones = await ModeloPresentacion.find({});
        res.status(200).json({ success: true, presentaciones });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para crear una nueva presentación de producto
const nuevaPresentacion = async (req, res) => {
    try {

        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ success: false, message: 'Todos los campos deben estar completos' });
        }

        const presentacionDatos = {
            nombre,
            descripcion
        }

        const presentacion = new ModeloPresentacion(presentacionDatos);
        await presentacion.save();

        res.status(201).json({ success: true, message: 'Nueva presentación añadida' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API para editar presentación existente
const editarPresentacion = async (req, res) => {
    try {

        const {nombre, descripcion} = req.body;
        const {id} = req.parms;

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

// -------------------------------------- VENTAS---------------------------------------------

export {
    loginAdmin,
    añadirVendedor, obtenerVendedores, eliminarVendedor, editarVendedor,
    obtenerProductos, nuevoProducto, eliminarProducto, editarProducto,
    obtenerLaboratorios, nuevoLaboratorio, eliminarLaboratorio, editarLaboratorio,
    obtenerTipos,
    obtenerPresentaciones, nuevaPresentacion,
    obtenerProveedores, nuevoProveedor, eliminarProveedor, editarProveedor
};