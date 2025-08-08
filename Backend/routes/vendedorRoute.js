import express from 'express';
import {
    loginVendedor
} from '../controllers/vendedorController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const vendedorRouter = express.Router();

//Endpoints
vendedorRouter.post('/login', loginVendedor);

export default vendedorRouter;