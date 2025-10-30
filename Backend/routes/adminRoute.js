import express from 'express';
import {  
    obtenerTipos, nuevoTipo,
    obtenerPresentaciones,nuevaPresentacion, eliminarPresentacion, editarPresentacion,
    nuevaVenta
} from '../controllers/adminController.js';
import { loginAdmin } from '../controllers/admin/login.js';
import { obtenerVendedores, añadirVendedor, eliminarVendedor, editarVendedor } from '../controllers/admin/gestionVendedores.js';
import { obtenerProductos, nuevoProducto, eliminarProducto, editarProducto } from '../controllers/admin/gestionProductos.js';
import { obtenerLaboratorios,nuevoLaboratorio, eliminarLaboratorio,editarLaboratorio } from '../controllers/admin/gestionLaboratorios.js';
import { obtenerProveedores, nuevoProveedor, eliminarProveedor, editarProveedor } from '../controllers/admin/gestionProveedores.js';
import { obtenerLotes, obtenerLotesPorVencer, obtenerLotesVencidos, nuevoLote, eliminarLote, editarLote } from '../controllers/admin/gestionLotes.js';
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
adminRouter.post('/nuevo-tipo', authAdmin, nuevoTipo);
//Presentaciones
adminRouter.get('/obtener-presentaciones', authAdmin, obtenerPresentaciones);
adminRouter.post('/nueva-presentacion', authAdmin, nuevaPresentacion);
adminRouter.delete('/eliminar-presentacion/:id', authAdmin, eliminarPresentacion);
adminRouter.put('/editar-presentacion/:id', authAdmin, eliminarPresentacion);
//Proveedores
adminRouter.get('/obtener-proveedores', authAdmin, obtenerProveedores);
adminRouter.post('/nuevo-proveedor', authAdmin, nuevoProveedor);
adminRouter.delete('/eliminar-proveedor/:id', authAdmin, eliminarProveedor);
adminRouter.put('/editar-proveedor/:id', authAdmin, editarProveedor);
//Lotes
adminRouter.get('/obtener-lotes', authAdmin, obtenerLotes);
adminRouter.get('/obtener-lotes-vencidos', authAdmin, obtenerLotesVencidos);
adminRouter.get('/obtener-lotes-por-vencer', authAdmin, obtenerLotesPorVencer);
adminRouter.post('/nuevo-lote', authAdmin, nuevoLote);
adminRouter.delete('/eliminar-lote/:id', authAdmin, eliminarLote);
adminRouter.put('/editar-lote/:id', authAdmin, editarLote);

export default adminRouter;