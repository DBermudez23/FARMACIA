

const TablaMedicamentos = ({ medicamentos }) => {
    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-white text-black text-sm text-center">
                        <th className="border-r px-4 py-2 rounded-tl-xl">CÓDIGO</th>
                        <th className="border-r px-4 py-2">CANTIDAD</th>
                        <th className="border-r px-4 py-2">LABORATORIO</th>
                        <th className="border-r px-4 py-2">PRESENTACIÓN</th>
                        <th className="border-r px-4 py-2">PRODUCTO</th>
                        <th className="border-r px-4 py-2">PROVEEDOR</th>
                        <th className="px-4 py-2 rounded-tr-xl">VENCIMIENTO</th>
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.map((med, idx) => {
                        const hoy = new Date();
                        const vencimiento = new Date(med.vencimiento);
                        const diasRestantes = (vencimiento - hoy) / (1000 * 60 * 60 * 24);

                        const filaClase = diasRestantes < 60 ? "bg-[#F28B82]" : "bg-[#FDE68A]";
                        const isLast = idx === medicamentos.length - 1;

                        return (
                            <tr
                                key={idx}
                                className={`${filaClase} text-center text-sm`}
                            >
                                <td className={`border-r border-t px-2 py-1 ${isLast ? 'rounded-bl-xl' : ''}`}>{med.codigo}</td>
                                <td className="border-r border-t px-2 py-1">{med.producto}</td>
                                <td className="border-r border-t px-2 py-1">{med.cantidad}</td>
                                <td className="border-r border-t px-2 py-1">{med.laboratorio}</td>
                                <td className="border-r border-t px-2 py-1">{med.presentacion}</td>
                                <td className="border-r border-t px-2 py-1">{med.proveedor}</td>
                                <td className={`border-t px-2 py-1 ${isLast ? 'rounded-br-xl' : ''}`}>{med.vencimiento}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
};

export default TablaMedicamentos;
