import express from 'express';
import { 
    loginAdmin, 
    obtenerVendedores, añadirVendedor, eliminarVendedor, editarVendedor,
    obtenerProductos, nuevoProducto,eliminarProducto, editarProducto,
    obtenerProveedores, nuevoProveedor, eliminarProveedor, editarProveedor,
    obtenerLaboratorios,nuevoLaboratorio, eliminarLaboratorio,editarLaboratorio,
    obtenerTipos,
    obtenerPresentaciones
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
adminRouter.put('/editar-vendedor/:id', authAdmin, upload.single('imagen'), editarVendedor)
//Productos
adminRouter.get('/obtener-productos', authAdmin, obtenerProductos);
adminRouter.post('/nuevo-producto', authAdmin, upload.single('imagen'), nuevoProducto);
adminRouter.delete('/eliminar-producto/:id', authAdmin, eliminarProducto);
adminRouter.put('/editar-producto/:id', authAdmin, upload.single('imagen'), editarProducto);
//laboratorios
adminRouter.get('/obtener-laboratorios', authAdmin, obtenerLaboratorios);
adminRouter.post('/nuevo-laboratorio', authAdmin, nuevoLaboratorio);
adminRouter.delete('/eliminar-laboratorio/:id', authAdmin, eliminarLaboratorio);
adminRouter.put('/editar-laboratorio/:id', authAdmin, editarLaboratorio);
//Tipos de medicamento
adminRouter.get('/obtener-tipos', authAdmin, obtenerTipos);
//Presentaciones
adminRouter.get('/obtener-presentaciones', authAdmin, obtenerPresentaciones);
//Proveedores
adminRouter.get('/obtener-proveedores', authAdmin, obtenerProveedores);
adminRouter.post('/nuevo-proveedor', authAdmin, nuevoProveedor);
adminRouter.delete('/eliminar-proveedor/:id', authAdmin, eliminarProveedor);
adminRouter.put('/editar-proveedor/:id', authAdmin, editarProveedor);

export default adminRouter;