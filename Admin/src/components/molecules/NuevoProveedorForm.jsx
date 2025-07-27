import BotonCancelar from "../atoms/BotonCancelar"
import BotonConfirmar from "../atoms/BotonConfirmar";

function NuevoProveedorForm() {
    return (
        <form className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

            {/* Nombre del proveedor */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    NOMBRE PROVEEDOR
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Dirección */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    DIRECCIÓN
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    TELÉFONO
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
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

export default NuevoProveedorForm
