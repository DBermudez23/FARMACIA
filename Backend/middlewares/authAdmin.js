import jwt from 'jsonwebtoken';

//Middleware para proteger rutas de administrador
const authAdmin = async (req,res) => {
    try {

        const aToken = req.headers.atoken;

        if (!aToken) {
            return res.json({success:false,message:'No se ha realizado el login'})
        }

        const token_decode = jwt.verify(aToken, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_MAIL + process.env.ADMIN_CONTRASENA) {
            return res.json({success:false,message:'Ruta no autorizada, realizar login'});
        }
        
        next();
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message});

    }
}

export default authAdmin;