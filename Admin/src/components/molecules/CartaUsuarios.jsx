import { useState } from "react";
import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";
import BotonConfirmarMini from "../atoms/BotonConfirmarMini";
import BotonCancelarMini from "../atoms/BotonCancelarMini";

function CartaUsuarios({ usuario }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEditados, setDatosEditados] = useState({ ...usuario });

  const handleChange = (e) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelar = () => {
    setModoEdicion(false);
    setDatosEditados({ ...usuario });
  };

  const handleConfirmar = () => {
    // Aquí podremos enviar los datosEditados a la API
    setModoEdicion(false);
  };

  return (
    <div className="bg-white w-full max-w-sm min-h-[340px] rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300 border border-gray-200">

      <img
        src={usuario.imagen}
        alt={usuario.nombre}
        className="w-24 h-24 rounded-full object-cover border-4 border-[#15D0EF]"
      />

      <div className="w-full text-center flex flex-col gap-2">
        {modoEdicion ? (
          <>
            <input
              type="text"
              name="nombre"
              value={datosEditados.nombre}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
            <input
              type="email"
              name="correo"
              value={datosEditados.mail}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
            <input
              type="tel"
              name="telefono"
              value={datosEditados.telefono}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
            <input
              type="text"
              name="direccion"
              value={datosEditados.direccion}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
          </>
        ) : (
          <div className="w-full text-left space-y-2 text-xs sm:text-sm py-3">
            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">NOMBRE: </span>
              <span>{usuario.nombre}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">CORREO: </span>
              <span>{usuario.mail}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">TELÉFONO: </span>
              <span>{usuario.telefono}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">DIRECCIÓN: </span>
              <span>{usuario.direccion}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">EDAD: </span>
              <span>{usuario.edad} años</span>
            </p>
          </div>


        )}
      </div>

      <div className="flex justify-center gap-4 mt-3 flex-wrap">
        {modoEdicion ? (
          <>
            <BotonCancelarMini onClick={handleCancelar} />
            <BotonConfirmarMini onClick={handleConfirmar} />
          </>
        ) : (
          <>
            <BotonEditar onClick={() => setModoEdicion(!modoEdicion)} />
            <BotonEliminar />
          </>
        )}
      </div>
    </div>
  );
}

export default CartaUsuarios;
