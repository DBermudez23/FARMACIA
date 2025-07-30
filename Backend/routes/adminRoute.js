import express from 'express';
import { 
    loginAdmin, 
    obtenerVendedores, 
    añadirVendedor, 
    obtenerProductos, 
    nuevoProducto } from '../controllers/AdminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

//Endpoints
adminRouter.post('/login', loginAdmin);
//Vendedores
adminRouter.get('/obtener-vendedores', authAdmin, obtenerVendedores);
adminRouter.post('/nuevo-vendedor', authAdmin, upload.single('imagen'), añadirVendedor);
//Productos
adminRouter.get('/obtener-productos', authAdmin, obtenerProductos);
adminRouter.post('/nuevo-producto', authAdmin, upload.single('imagen'), nuevoProducto);


export default adminRouter;