import BotonCancelar from "../atoms/BotonCancelar";
import BotonConfirmar from "../atoms/BotonConfirmar";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function NuevoLoteForm() {
    const { moneda } = useContext(AppContext);

    return (
        <form className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 mb-12">

            <div className="text-center mb-4 text-lg font-semibold text-gray-800">
                <p>CADA NUEVO LOTE DEBE ESTAR ASOCIADO A UN PRODUCTO EXISTENTE</p>
            </div>

            {/* Producto (Previamente creado*/}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">PRODUCTO</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                >
                    <option value="">AMOXICILINA 500mg</option>
                    <option value="">GENOPRAZOL</option>
                </select>
            </div>

            {/* Proveedor */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">PROVEEDOR</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                >
                    <option value="">SALUD Y VIDA</option>
                    <option value="">BAYER</option>
                </select>
            </div>

            {/* Cantidad */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CANTIDAD</label>
                <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Fecha de recibido */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    FECHA DE INGRESO</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
                <span className="text-gray-400 font-semibold">FORMATO: 01-ENE-2000</span>
            </div>

            {/* Fecha de vencimiento */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    FECHA DE VENCIMIENTO</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
                <span className="text-gray-400 font-semibold">FORMATO: 01-ENE-2000</span>
            </div>

            {/* Costo Lote */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">COSTO LOTE</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    />
                    <span className="text-gray-700 font-semibold">{moneda}</span>
                </div>
            </div>

            {/* Información adicional */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">INFORMACIÓN ADICIONAL</label>
                <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-10 pt-4">
                <BotonCancelar />
                <BotonConfirmar />
            </div>

        </form>
    )
}

export default NuevoLoteForm
