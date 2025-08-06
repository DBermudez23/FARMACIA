import { useContext, useState } from "react";
import BotonCancelar from "../atoms/BotonCancelar";
import BotonConfirmar from "../atoms/BotonConfirmar";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import subir from '../../assets/Upload.svg';

function NuevoVendedorForm({ setNuevoVendedor }) {

    const generos = ["Masculino", "Femenino", "Otro"];

    const [nombre, setNombre] = useState('');
    const [mail, setMail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [genero, setGenero] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [imagen, setImagen] = useState(null);

    const { backendURL, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!nombre || !mail || !telefono || !fechaNacimiento || !direccion || !genero || !contrasena) {
            return toast.error('Todos los campos son obligatorios');
        }

        if (contrasena.length < 8) {
            return toast.error('La contraseña debe tener al menos 8 caracteres');
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('mail', mail);
        formData.append('contrasena', contrasena);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        formData.append('genero', genero);
        formData.append('nacimiento', fechaNacimiento);
        imagen && formData.append('imagen', imagen);

        try {
            const { data } = await axios.post(
                backendURL + '/api/admin/nuevo-vendedor',
                formData,
                {
                    headers: {
                        aToken
                    }
                }
            )

            if (data.success) {
                toast.success('Vendedor registrado exitosamente');
                setImagen(null);
                setNombre('');
                setMail('');
                setDireccion('');
                setTelefono('');
                setGenero('');
                setFechaNacimiento('');
                setNuevoVendedor(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

            {/* Imagen */}
            <div className="flex flex-col items-center justify-center">
                <label className="block text-sm font-semibold text-gray-700 mb-2">IMAGEN DEL VENDEDOR</label>

                <label htmlFor="imagen-upload">
                    <div className="relative w-36 h-36 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-[#15D0EF] rounded-md cursor-pointer overflow-hidden group">
                        <img
                            className="w-full h-full object-contain"
                            src={
                                imagen
                                    ? URL.createObjectURL(imagen)
                                    : subir
                            }
                            alt="Vista previa"
                        />
                        {
                            !imagen && (
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <img
                                        src={subir}
                                        className="w-8 h-8"
                                        alt="Subir imagen"
                                    />
                                </div>
                            )
                        }
                    </div>
                    <input
                        id="imagen-upload"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                </label>
            </div>


            {/* Nombre del vendedor */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">NOMBRE VENDEDOR</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    required
                />
            </div>

            {/* mail */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">MAIL</label>
                <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    required
                />
            </div>

            {/* contraseña */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CONTRASEÑA</label>
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    required
                />
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">TELÉFONO</label>
                <input
                    type="tel"
                    pattern="[0-9]+"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    required
                />
            </div>

            {/* Direccion */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">DIRECCIÓN</label>
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    required
                />
            </div>

            {/* Género */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">GENERO</label>
                <select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                >
                    <option value="">Selecciona un género</option>
                    {generos.map((gen, ind) => (
                        <option key={ind} value={gen}>{gen}</option>
                    ))}
                </select>
            </div>

            {/* Fecha de nacimiento */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    FECHA DE NACIMIENTO</label>
                <input
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    type="date"
                    value={fechaNacimiento}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
                <span className="text-gray-400 font-semibold">FORMATO: 01-ENE-2000</span>
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-10 pt-4">
                <BotonCancelar onClick={() => {
                    setImagen(null);
                    setNuevoVendedor(false);
                }} />
                <BotonConfirmar type="submit" />
            </div>
        </form>
    )
}

export default NuevoVendedorForm
