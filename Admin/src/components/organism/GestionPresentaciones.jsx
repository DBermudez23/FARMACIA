import { useState } from 'react'
import TablaPresentaciones from '../molecules/TablaPresentaciones'
import añadir from '../../assets/añadir.svg';
import NuevaPresentacionForm from '../molecules/NuevaPresentacionForm';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';

function GestionPresentaciones() {

    const [nuevaPresentacion, setNuevaPresentacion] = useState(false);

    const {presentaciones, obtenerPresentaciones, aToken} = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            obtenerPresentaciones();
        }
    })

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
            <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevaPresentacion(!nuevaPresentacion)}>
                <img src={añadir} alt="Nueva Presentación" />
                <p className="text-[#15D0EF]">NUEVA PRESENTACIÓN</p>
            </div>

            {nuevaPresentacion && (
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
