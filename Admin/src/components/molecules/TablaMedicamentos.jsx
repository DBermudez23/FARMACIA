import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";


const TablaMedicamentos = ({ medicamentos }) => {

    const {
        aToken,
        proveedores, obtenerProveedores,
        productos,
        laboratorios,
        presentaciones
    } = useContext(AdminContext);

    const nombreMedicamento = (medicamento) => {
        return productos.find(prod => prod._id === medicamento.producto)?.nombre;
    }

    const nombreProveedor = (medicamento) => {
        return proveedores.find(prov => prov._id === medicamento.proveedor)?.nombre;
    }

    const nombrePresentacion = (medicamento) => {
        return (
            presentaciones.find(
                pres => pres._id === productos.find(prod => prod._id === medicamento.producto)?.presentacion
            )?.nombre
        )
    }

    const laboratorioNombre = (medicamento) => {
        return (
            laboratorios.find(
                lab => lab._id === productos.find(prod => prod._id === medicamento.producto)?.laboratorio
            )?.nombre
        )
    }

    useEffect(() => {
        obtenerProveedores();
    }, [aToken])

    //console.log(medicamentos);

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
                        const vencimiento = new Date(med.fechaVencimiento);
                        const diasRestantes = (vencimiento - hoy) / (1000 * 60 * 60 * 24);

                        let filaClase = "";
                        if (diasRestantes <= 0) {
                            filaClase = "bg-[#F28B82]"; // rojo → vencido
                        } else if (diasRestantes <= 60) {
                            filaClase = "bg-[#FDE68A]"; // amarillo → por vencer
                        }
                        const isLast = idx === medicamentos.length - 1;

                        return (
                            <tr
                                key={idx}
                                className={`${filaClase} text-center text-sm`}
                            >
                                <td className={`border-r border-t px-2 py-1 ${isLast ? 'rounded-bl-xl' : ''}`}>
                                    {med._id.slice(0, 6)}
                                </td>
                                <td className="border-r border-t px-2 py-1">
                                    {nombreMedicamento(med)}
                                </td>
                                <td className="border-r border-t px-2 py-1">
                                    {med.cantidad}
                                </td>
                                <td className="border-r border-t px-2 py-1">
                                    {laboratorioNombre(med)}
                                </td>
                                <td className="border-r border-t px-2 py-1">
                                    {nombrePresentacion(med)}
                                </td>
                                <td className="border-r border-t px-2 py-1">
                                    {nombreProveedor(med)}
                                </td>
                                <td className={`border-t px-2 py-1 ${isLast ? 'rounded-br-xl' : ''}`}>
                                    {new Date(med.fechaVencimiento).toLocaleDateString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
};

export default TablaMedicamentos;
