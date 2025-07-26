import React from 'react'

function TablaLaboratorios({laboratorios}) {
    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-white text-black text-sm text-center">
                        <th className="border-r px-4 py-2 rounded-tl-xl">CÓDIGO</th>
                        <th className="border-r px-4 py-2">NOMBRE</th>
                        <th className="border-r px-4 py-2">DIRECCIÓN</th>
                        <th className="border-r px-4 py-2">TELÉFONO</th>
                        <th className="border-r px-4 py-2">MAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {laboratorios.map((lab, idx) => {
                        const isLast = idx === laboratorios.length - 1;

                        return (
                            <tr
                                key={idx}
                                className={`bg-gray-300 text-center text-sm`}
                            >
                                <td className={`border-r border-t px-2 py-1 ${isLast ? 'rounded-bl-xl' : ''}`}>{lab.codigo}</td>
                                <td className="border-r border-t px-2 py-1">{lab.nombre}</td>
                                <td className="border-r border-t px-2 py-1">{lab.direccion}</td>
                                <td className="border-r border-t px-2 py-1">{lab.telefono}</td>
                                <td className="border-r border-t px-2 py-1">{lab.mail}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TablaLaboratorios
