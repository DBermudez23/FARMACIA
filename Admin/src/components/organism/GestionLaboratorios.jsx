import { useState } from 'react'
import TablaLaboratorios from '../molecules/TablaLaboratorios'
import añadir from '../../assets/añadir.svg';
import NuevoLaboratorioForm from '../molecules/NuevoLaboratorioForm';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

function GestionLaboratorios() {

    const [nuevoLaboratorio, setNuevoLaboratorio] = useState(false);

    const {laboratorios, obtenerLaboratorios, aToken} = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            obtenerLaboratorios();
        }
    })

    return (
        <div className="w-full px-4 sm:px-8 py-8">
            {/* Título */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#15D0EF] mb-2">
                LABORATORIOS
            </h2>

            {/* Descripción */}
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Aquí se gestionan los laboratorios de medicamentos registrados en el sistema.
            </p>

            {/* Botón para añadir nuevos laboratorios */}
            <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevoLaboratorio(!nuevoLaboratorio)}>
                <img src={añadir} alt="Nuevo Laboratorio" />
                <p className="text-[#15D0EF]">NUEVO LABORATORIO</p>
            </div>

            {nuevoLaboratorio && (
                <NuevoLaboratorioForm />
            )}

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 my-10">
                <TablaLaboratorios laboratorios={laboratorios} />
            </div>
        </div>
    )
}

export default GestionLaboratorios
