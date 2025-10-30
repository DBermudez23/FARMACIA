import ModeloVendedor from "../../models/ModeloVendedor";

//API para obtener la información del usuario 
const obtenerInfoUsuario = async (req,res) => {
    try {

        const usuario = req.params;
        const infoVendedor = await ModeloVendedor.findById(usuario);
        res.status(200).json({ success:true,infoVendedor});
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}


//API para editar la información del usuario
const editarUusario = async (req,res) => {
    try {

        const usuario = req.params;
        const { nombre, mail, telefono, direccion} = req.body;
        const imagen = req.file;

        const infoUsuario = await ModeloVendedor.findById(usuario);
        if (!usuario) {
            return res.json({ success: false, message : 'Info del vendedor no encontrada'});
        }

        let nuevaImagenURL = usuario.imagen;
        if (imagen) {
            const subirImagen = await cloudi
        }

        // Actualizamos cada campo
        usuario.nombre = nombre || usuario.nombre;
        usuario.mail = mail || usuario.mail;
        usuario.telefono = telefono || usuario.telefono;
        usuario.direccion = direccion || usuario.direccion;

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}