import { useState } from "react";
import BotonCancelar from "../atoms/BotonCancelar"
import BotonConfirmar from "../atoms/BotonConfirmar";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function NuevoProveedorForm({ setNuevoProveedor }) {

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');

    const {backendURL, aToken} = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!nombre || !direccion || !telefono || !mail) {
            return toast.error('Todos los campos son obligatorios');
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('direccion', direccion);
        formData.append('telefono', telefono);
        formData.append('mail', mail);

        try {
            const {data} = await axios.post(backendURL + '/api/admin/nuevo-proveedor', formData, {headers: {'Content-Type': 'application/json', aToken}});

            if (data.success) {
                toast.success(data.message);
                setNombre('');
                setDireccion('');
                setTelefono('');
                setMail('');
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setNuevoProveedor(false);
        }
    }

    return (
        <form 
            onSubmit={onSubmitHandler}
            className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

            {/* Nombre del proveedor */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    NOMBRE PROVEEDOR
                </label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Dirección */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    DIRECCIÓN
                </label>
                <input
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    TELÉFONO
                </label>
                <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Mail */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    MAIL
                </label>
                <input
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-10 pt-4">
                <BotonCancelar onClick={() => setNuevoProveedor(false)}/>
                <BotonConfirmar type="submit"/>
            </div>

        </form>
    )
}

export default NuevoProveedorForm
