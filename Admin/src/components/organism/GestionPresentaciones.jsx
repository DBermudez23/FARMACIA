import { useState } from 'react'
import TablaPresentaciones from '../molecules/TablaPresentaciones'
import añadir from '../../assets/añadir.svg';
import NuevaPresentacionForm from '../molecules/NuevaPresentacionForm';

function GestionPresentaciones({ presentaciones }) {

    const [nuevoTipo, setNuevoTipo] = useState(false);

    return (
        <div className="w-full px-4 sm:px-8 py-8">
            {/* Título */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FEBA5A] mb-2">
                PRESENTACIONES
            </h2>

            {/* Descripción */}
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Aquí se gestionan las presentaciones de medicamentos disponibles en el sistema.
            </p>

            {/* Botón para añadir nueva presentación */}
            <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevoTipo(!nuevoTipo)}>
                <img src={añadir} alt="Nueva Presentación" />
                <p className="text-[#15D0EF]">NUEVA PRESENTACIÓN</p>
            </div>

            {nuevoTipo && (
                <NuevaPresentacionForm />
            )}

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 my-10">
                <TablaPresentaciones presentaciones={presentaciones} />
            </div>
        </div>
    )
}

export default GestionPresentaciones
