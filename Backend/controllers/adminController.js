import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
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
const loginAdmin = async (req,res) => {
    try {
        
        const {mail, contrasena} = req.body;

        if (mail === process.env.ADMIN_MAIL && contrasena === process.env.ADMIN_CONTRASENA) {
            const token = jwt.sign(mail+contrasena, process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:'Credenciales incorrectas'});
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });

    }
}

//API para obtener información de los vendedores GET
const obtenerVendedores = async (req,res) => {
    try {

        const vendedores = await ModeloVendedor.find({}).select('-contraseña');
        res.json({success:true,vendedores});
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message});

    }
}

//API para añadir un nuevo vendedor POST
const añadirVendedor = async (req,res) => {
    try {

        const {nombre, mail, contraseña, telefono, nacimiento, genero, direccion} = req.body;
        const imagen = req.file;

        //Validaciones de campos requeridos
        if (!nombre || !mail || !contraseña || !telefono || ! nacimiento || !genero || !direccion) {
            return res.json({success:false,message:'Campos incompletos'});
        }

        //Validamos el formato del correo
        if (!validator.isEmail){
            return res.json({success:false,message:'Formato de correo invalido'});
        }

        //Validamos que sea una contraseña segura
        if (contraseña.length < 8) {
            return res.json({success:false,message:'Contraseña insegura'});
        }

        //Encriptamos la contraseña
        const salt = await bcrypt.genSalt(12);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        //Subimos la imagen a cloudinary
        const subirImagen = await cloudinary.uploader.upload(imagen.path, {resource_type:'image'});
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

        res.json({success:true,message:'Nuevo vendedor añadido'});
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message});

    }
}


//API para obtener todos los productos GET
const obtenerProductos = async (req,res) => {
    try {

        const productos = await ModeloProducto.find({})
        return res.json({success:true,productos});
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message});

    }
}

//API para crear un nuevo producto POST
const nuevoProducto = async (req,res) => {
    try {

        const {nombre, presentacion, laboratorio, tipo, precio} = req.body;
        const imagen = req.file;

        //Validamos que los campos esten completos
        if (!nombre || !presentacion || !laboratorio || !tipo || !precio) {
            res.status(400).json({success:false,message:'Todos los campos deben estar completos'});
        }

        //Validamos los ID's de referencia enviados desde el frontend
        const ids = {presentacion, laboratorio, tipo};
        for (const id in ids) {
            if (!mongoose.Types.ObjectId.isValid(ids[id])) {
                return res.status(400).json({success:false,message:`ID de ${id} es inválido.`});
            }
        }

        //Validados los ID pasamos a validar la existencia de dichos documentos
        const [presentacionDoc, laboratorioDoc, tipoDoc] = await Promise.all([
            ModeloPresentacion.findById(presentacion),
            ModeloLaboratorio.findById(laboratorio),
            ModeloTipo.findById(tipo)
        ]);

        if (!presentacionDoc || !laboratorioDoc || !tipoDoc) {
            return res.status(400).json({success:false,message:'Presentación, laboratorio o tipo no encontrado'});
        }

        //Subimos la imagen a cloudinary
        const subirImagen = await cloudinary.uploader.upload(imagen.path, {resource_type:'image'});
        const URLimagen = subirImagen.secure_url;

        const productoDatos = {
            nombre,
            presentacion,
            laboratorio,
            tipo,
            precio,
            imagen: URLimagen
        }

        const nuevoProducto = new ModeloProducto(productoDatos);
        await nuevoProducto.save();

        res.json({success:true,message:'Nuevo producto creado'});
        
    } catch (error) {
           
        console.log(error);
        res.status(500).json({success:false,message:error.message});

    }
}


export {loginAdmin, añadirVendedor, obtenerVendedores, obtenerProductos, nuevoProducto};