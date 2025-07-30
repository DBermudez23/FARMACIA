import { useState } from 'react';
import BarraBusqueda from '../atoms/BarraBusqueda';

function VentasDia({ ventas }) {
    return (
        <div className="w-full px-4 sm:px-8 py-8">
            {/* Título */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#15D0EF] mb-2">
                VENTAS DIARIAS
            </h2>

            <h2 className="text-sm sm:text-md text-start mb-4">
                BUSCAR VENTA
            </h2>

            <div className="flex justify-center mb-8">
                <BarraBusqueda />
            </div>

            {/* Contenido de Ventas del Día */}
            <div>

                <button>
                    {ventas.fecha}
                </button>

                <p><span>TOTAL VENTAS: </span>{ventas.lenght}</p>
                <p><span>TOTAL EFECTIVO: </span>{}</p>
                <p><span>TOTRAL TRANSFERENCIA: </span></p>
            </div>


        </div>
    )
}

export default VentasDia
