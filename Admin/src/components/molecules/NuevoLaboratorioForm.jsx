import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


function NuevoLaboratorioForm() {

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mail, setMail] = useState('');

  const {backendURL, aToken} = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!nombre || !direccion || !telefono || !mail) {
      return toast.error('Todos los campos son obligatorios')
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('telefono', telefono);
    formData.append('mail', mail);

    try {
      const {data} = await axios.post(
        backendURL + `/api/admin/nuevo-laboratorio`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            aToken
          }
        }
      )

      if (data.success) {
        toast.success(data.message);
        setNombre('');
        setDireccion('');
        setTelefono('');
        setTelefono('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#15D0EF] mb-4">NUEVO LABORATORIO</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="direccion" className="block text-sm font-semibold text-gray-700 mb-2">
            Dirección:
          </label>
          <input
            type="text"
            id="direccion"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition duration-200"
          />
        </div>
        <button
          type="submit"
          className="bg-[#15D0EF] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0DA3B8] transition duration-200 cursor-pointer"
        >
          Añadir Laboratorio
        </button>
      </form>
    </div>
  )
}

export default NuevoLaboratorioForm
