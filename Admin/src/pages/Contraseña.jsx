import { useState } from 'react';
import {toast} from 'react-toastify';

function Contraseña() {
  const [enviada, setEnviada] = useState(false);

  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handlePaso1 = (e) => {
    e.preventDefault();
    setEnviada(true); // Simula validación correcta de contraseña actual
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    if (contrasenaNueva !== confirmarContrasena) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Aquí podrías enviar los datos al backend
    console.log("Contraseña actual:", contrasenaActual);
    console.log("Nueva contraseña:", contrasenaNueva);
    toast.success("Contraseña cambiada correctamente");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-xl w-full px-4 sm:px-8 py-10">

        <h2 className="text-sm sm:text-md text-start mb-4 text-gray-700">
          CAMBIO DE CONTRASEÑA
        </h2>

        {!enviada ? (
          <form
            onSubmit={handlePaso1}
            className="bg-gray-100 rounded-xl w-full px-6 py-10 shadow-md border-2 border-[#15D0EF]"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="password"
                placeholder="Contraseña actual"
                value={contrasenaActual}
                onChange={(e) => setContrasenaActual(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#15D0EF] bg-white text-gray-700 w-full"
                required
              />
              <button
                type="submit"
                className="bg-[#15D0EF] hover:bg-[#13b8d2] text-white font-semibold px-6 py-2 rounded-md transition"
              >
                Continuar
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitFinal}
            className="bg-gray-100 rounded-xl px-6 py-10 shadow-md border-2 border-[#15D0EF] flex flex-col gap-2 items-center"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={contrasenaNueva}
                onChange={(e) => setContrasenaNueva(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#15D0EF] bg-white text-gray-700 w-full"
                required
              />
              <input
                type="password"
                placeholder="Repetir nueva contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#15D0EF] bg-white text-gray-700 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#15D0EF] hover:bg-[#13b8d2] text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Cambiar contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contraseña;
