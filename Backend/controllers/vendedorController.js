import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import ModeloProducto from '../models/ModeloProducto.js';
import ModeloVendedor from '../models/ModeloVendedor.js';
import ModeloVenta from '../models/ModeloVenta.js';
import ModeloLote from '../models/ModeloLote.js';

const loginVendedor = async (req,res) => {
    try {

        const {mail, contrasena} = req.body;

        const vendedor = await ModeloVendedor.findOne({mail});

        if (!vendedor) {
            res.json({success:false,message:'El vendedor no existe'});
        }

        const contraseñaCoincide = await bcrypt.compare(contrasena, vendedor.contrasena);

        if (contraseñaCoincide) {
            const token = jwt.sign({id:vendedor._id}, process.env.JWT_SECRET);
            res.json({success:true,token});
        } else {
            res.json({success:false,message:'Credenciales incorrectas'});
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export {loginVendedor};

// -------------------------------------- PRODUCTOS---------------------------------------------
/*API para obtener productos disponibles
const obtenerProductos = async (req,res) => {
    try {

        const productos =
        
    } catch (error) {
        
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}*/