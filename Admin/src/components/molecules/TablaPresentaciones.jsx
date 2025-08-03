import { useState } from "react";
import BotonEditarMini from "../atoms/BotonEditarMini";
import BotonEliminarMini from "../atoms/BotonEliminarMini";
import BotonConfirmarTablas from "../atoms/BotonConfirmarTablas";
import BotonCancelarTablas from "../atoms/BotonCancelarTablas";

function TablaPresentaciones({ presentaciones }) {
  const [editarIndex, setEditarIndex] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});

  const handleEditar = (idx, pres) => {
    setEditarIndex(idx);
    setValoresEditados({ ...pres });
  };

  const handleCancelar = () => {
    setEditarIndex(null);
    setValoresEditados({});
  };

  const handleInputChange = (e) => {
    setValoresEditados({
      ...valoresEditados,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-white text-black text-sm text-center">
            <th className="border-r px-4 py-2 rounded-tl-xl">CÓDIGO</th>
            <th className="border-r px-4 py-2">PRESENTACIÓN</th>
            <th className="border-r px-4 py-2">DESCRIPCIÓN</th>
            <th className="px-4 py-2 rounded-tr-xl">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {presentaciones.map((pres, idx) => {
            const isEditing = editarIndex === idx;
            const isLast = idx === presentaciones.length - 1;

            return (
              <tr key={idx} className="bg-gray-300 text-center text-sm">
                <td className={`border-r border-t px-2 py-1 ${isLast ? "rounded-bl-xl" : ""}`}>
                  {pres._id.slice(0, 6)}
                </td>

                <td className="border-r border-t px-2 py-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="nombre"
                      value={valoresEditados.nombre}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border bg-white border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
                    />
                  ) : (
                    pres.nombre
                  )}
                </td>

                <td className="border-r border-t px-2 py-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="descripcion"
                      value={valoresEditados.descripcion}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border bg-white border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
                    />
                  ) : (
                    pres.descripcion
                  )}
                </td>

                <td className="border-t px-2 py-2">
                  {isEditing ? (
                    <div className="flex justify-center items-center gap-2">
                      <BotonConfirmarTablas onClick={() => setEditarIndex(null)} />
                      <BotonCancelarTablas onClick={handleCancelar} />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <BotonEditarMini onClick={() => handleEditar(idx, pres)} />
                      <BotonEliminarMini />
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPresentaciones;
