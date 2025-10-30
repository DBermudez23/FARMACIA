import jwt from 'jsonwebtoken';

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

export {loginAdmin};