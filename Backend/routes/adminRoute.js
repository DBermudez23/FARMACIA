import express from 'express';
import { 
    loginAdmin, 
    obtenerVendedores, añadirVendedor, eliminarVendedor, editarVendedor,
    obtenerProductos, nuevoProducto,eliminarProducto,
    obtenerProveedores, nuevoProveedor, eliminarProveedor,
    obtenerLaboratorios,nuevoLaboratorio, eliminarLaboratorio,
} from '../controllers/AdminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

//Endpoints
adminRouter.post('/login', loginAdmin);
//Vendedores
adminRouter.get('/obtener-vendedores', authAdmin, obtenerVendedores);
adminRouter.post('/nuevo-vendedor', authAdmin, upload.single('imagen'), añadirVendedor);
adminRouter.delete('/eliminar-vendedor/:id', authAdmin, eliminarVendedor);
adminRouter.post('/editar-vendedor/:id', authAdmin, editarVendedor)
//Productos
adminRouter.get('/obtener-productos', authAdmin, obtenerProductos);
adminRouter.post('/nuevo-producto', authAdmin, upload.single('imagen'), nuevoProducto);
adminRouter.delete('/eliminar-producto/:id', authAdmin, eliminarProducto);
//laboratorios
adminRouter.get('/obtener-laboratorios', authAdmin, obtenerLaboratorios);
adminRouter.post('/nuevo-laboratorio', authAdmin, nuevoLaboratorio);
adminRouter.delete('/eliminar-laboratorio/:id', authAdmin, eliminarLaboratorio);
//Proveedores
adminRouter.get('/obtener-proveedores', authAdmin, obtenerProveedores);
adminRouter.post('/nuevo-proveedor', authAdmin, nuevoProveedor);
adminRouter.delete('/eliminar-proveedor/:id', authAdmin, eliminarProveedor);

export default adminRouter;