import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";

function CartaUsuarios({ usuario }) {
  return (
    <div className="bg-white w-full max-w-sm min-h-[320px] rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      
      <img
        src={usuario.imagen}
        alt={usuario.nombre}
        className="w-24 h-24 rounded-full object-cover border-4 border-[#15D0EF]"
      />

      <div className="text-center flex flex-col gap-1 w-full">
        <h3 className="text-lg font-bold text-gray-800 truncate w-full">{usuario.nombre}</h3>
        <p className="text-sm text-gray-600 truncate w-full">{usuario.correo}</p>
        <p className="text-sm text-gray-600 truncate w-full">{usuario.telefono}</p>
        <p className="text-sm text-gray-600 truncate w-full">{usuario.direccion}</p>
        <p className="text-sm text-gray-600 truncate w-full">{usuario.edad} años</p>
      </div>

      <div className="flex justify-center gap-4 mt-3">
        <BotonEditar />
        <BotonEliminar />
      </div>
    </div>
  );
}

export default CartaUsuarios;
