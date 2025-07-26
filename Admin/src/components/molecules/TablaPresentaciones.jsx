import React from 'react'

function TablaPresentaciones({ presentaciones }) {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-white text-black text-sm text-center">
                        <th className="border-r px-4 py-2 rounded-tl-xl">CÓDIGO</th>
                        <th className="border-r px-4 py-2 rounded-tl-xl">PRESENTACIÓN</th>
                        <th className="border-r px-4 py-2 rounded-tl-xl">DESCRIPCIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    {presentaciones.map((pres, idx) => {
                        const isLast = idx === presentaciones.length - 1;

                        return (
                            <tr
                                key={idx}
                                className={`bg-gray-300 text-center text-sm`}
                            >
                                <td className={`border-r border-t px-2 py-1 ${isLast ? 'rounded-bl-xl' : ''}`}>{pres.codigo}</td>
                                <td className="border-r border-t px-2 py-1">{pres.nombre}</td>
                                <td className="border-r border-t px-2 py-1">{pres.descripcion}</td>
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TablaPresentaciones
