/**
 * Middleware de Multer para gestionar la subida de archivos.
 * 
 * - Utiliza diskStorage para guardar archivos en el sistema local.
 * - Mantiene el nombre original del archivo (`file.originalname`).
 * 
 * Este middleware puede usarse con `upload.single('nombreCampo')` en rutas Express
 * para procesar archivos provenientes de formularios HTML tipo multipart/form-data.
 */

import multer from 'multer';

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({
    storage
});

export default upload;