import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function NuevaPresentacionForm() {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const {backendURL, aToken} = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!nombre || !descripcion) {
      return toast.error('Todos los campos son obligatorios');
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);

    try {
      const {data} = await axios.post(backendURL + '/api/admin/nueva-presentacion', formData, {headers: {'Content-Type' : 'application/json' ,aToken}});

      if (data.success) {
        toast.success(data.message);
        setNombre('');
        setDescripcion('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#15D0EF] mb-4">NUEVA PRESENTACIÓN</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de la Presentación:
          </label>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            id="nombre"
            value={nombre}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción:
          </label>
          <input
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            id="descripcion"
            value={descripcion}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition duration-200"
          />
        </div>
        <button
          type="submit"
          className="bg-[#15D0EF] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0DA3B8] transition duration-200 cursor-pointer"
        >
          Añadir Presentación
        </button>
      </form>
    </div>
  )
}

export default NuevaPresentacionForm
