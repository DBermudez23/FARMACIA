import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BotonCancelar from "../atoms/BotonCancelar";
import BotonConfirmar from "../atoms/BotonConfirmar";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

function NuevoProductoForm() {
  const { moneda } = useContext(AppContext);
  const {
    backendURL, aToken,
    laboratorios,

  } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {



    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <form className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

      {/* Nombre del producto */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          NOMBRE PRODUCTO
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
        />
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">TIPO</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
        >
          <option value="">COMERCIAL</option>
          <option value="">GENÉRICO</option>
        </select>
      </div>

      {/* Laboratorio */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">LABORATORIO</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
        >
          {laboratorios.map((lab) => (
            <option key={lab.id} value={lab.nombre}>
              {lab.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Presentación */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">PRESENTACIÓN</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
        >
          <option value="">Tabletas</option>
          <option value="">Jarabes</option>
          <option value="">Inyectables</option>
        </select>
      </div>

      {/* Costo Unitario */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">COSTO UNITARIO</label>
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
  );
}

export default NuevoProductoForm;
