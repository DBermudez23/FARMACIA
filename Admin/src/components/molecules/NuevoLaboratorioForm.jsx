import React from 'react'

function NuevoLaboratorioForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#15D0EF] mb-4">NUEVO LABORATORIO</h2>
      <form>
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
