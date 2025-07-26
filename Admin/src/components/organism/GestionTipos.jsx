import { useState } from "react";
import añadir from "../../assets/añadir.svg";

function GestionTipos({ tipos }) {

    const [nuevoTipo, setNuevoTipo] = useState(false);

    return (
        <div className="w-full px-4 sm:px-8 py-8">
            {/* Título principal */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#15D0EF] mb-2">
                TIPOS DE MEDICAMENTOS
            </h2>

            {/* Descripción */}
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Aquí se gestionan los tipos de medicamentos disponibles en el sistema.
            </p>

            {/* Botón para añadir nuevo tipo */}
            <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevoTipo(!nuevoTipo)}>
                <img src={añadir} alt="Nuevo Tipo" />
                <p className="text-[#15D0EF]">NUEVO TIPO</p>
            </div>

            {nuevoTipo && (
                <>
                    <h2 className="text-2xl font-bold text-[#15D0EF] mb-4">NUEVO TIPO</h2>
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

                        <button
                            type="submit"
                            className="bg-[#15D0EF] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0DA3B8] transition duration-200 cursor-pointer"
                        >
                            Añadir nuevo tipo
                        </button>
                    </form>
                </>
            )}


            {/* Selector de tipos */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-md my-10">

                <label htmlFor="tipos" className="block text-sm font-semibold text-gray-700 mb-2">
                    TIPOS:
                </label>
                <select
                    name="tipos"
                    id="tipos"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition duration-200"
                >
                    {tipos.map((tipo, index) => (
                        <option key={index} value={tipo.tipo}>
                            {tipo.tipo}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default GestionTipos
