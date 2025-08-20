import BarraBusqueda from "../components/atoms/BarraBusqueda";
import CartaLote from "../components/molecules/CartaLote";
import { useState, useContext, useEffect } from "react";
import NuevoLoteForm from "../components/molecules/NuevoLoteForm";
import añadir from "../assets/añadir.svg";
import { AdminContext } from "../context/AdminContext";

function GestionLotes() {
  const {
    lotes,
    obtenerLotes,
    lotesVencidos,
    obtenerLotesVencidos,
    lotesPorVencer,
    obtenerLotesPorVencer,
    aToken
  } = useContext(AdminContext);

  const [lotesRiesgo, setLotesRiesgo] = useState(false);
  const [verTodo, setVerTodo] = useState(false);
  const [nuevoLote, setNuevoLote] = useState(false);

  useEffect(() => {
    if (aToken) {
      obtenerLotes();
      obtenerLotesVencidos();
      obtenerLotesPorVencer();
    }
  }, [aToken]);

  // Lista combinada de riesgo
  const lotesRiesgoTotal = [...lotesVencidos, ...lotesPorVencer];
  const lotesMostrados = verTodo
    ? lotesRiesgoTotal
    : lotesRiesgoTotal.slice(0, 2);


  return (
    <div className="w-full flex flex-wrap justify-center">
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">
        <h2 className="text-sm sm:text-md text-start mb-4">BUSCAR LOTE</h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <button
          onClick={() => setLotesRiesgo((prev) => !prev)}
          className="px-6 py-2 bg-[#FFB800] text-white rounded-full font-semibold shadow hover:bg-[#FF9900] transition duration-300 mb-6 cursor-pointer"
        >
          LOTES EN RIESGO
        </button>

        {lotesRiesgo && (
          <>
            <h2 id="riesgo" className="text-sm sm:text-md text-start mb-4">
              LOTES EN RIESGO POR VENCIMIENTO:
            </h2>

            <div className="w-full flex flex-col items-center gap-6 mt-6">
              {/* Cartas de lotes en riesgo */}
              <div className="w-full flex flex-col items-center gap-6">
                {lotesMostrados.map((lote, i) => (
                  <CartaLote key={i} infoLote={lote} />
                ))}
              </div>

              {/* Botón ver más/menos */}
              {lotesRiesgoTotal.length > 2 && (
                <button
                  onClick={() => setVerTodo((prev) => !prev)}
                  className="px-6 py-2 border border-[#15D0EF] text-[#15D0EF] rounded-full text-sm hover:bg-[#15D0EF] hover:text-white transition duration-300 cursor-pointer"
                >
                  {verTodo ? "VER MENOS" : "VER MÁS"}
                </button>
              )}
            </div>
          </>
        )}

        <div
          className="flex items-center gap-4 mt-6 mb-10 cursor-pointer"
          onClick={() => setNuevoLote(!nuevoLote)}
        >
          <img src={añadir} alt="Nuevo Lote" />
          <p className="text-[#15D0EF]">NUEVO LOTE</p>
        </div>

        {nuevoLote && <NuevoLoteForm setNuevoLote={setNuevoLote} />}

        {/* Cartas de lotes activos */}
        <div className="w-full flex flex-col items-center gap-6 my-5">
          {lotes.map((lote, i) => (
            <CartaLote key={i} infoLote={lote} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GestionLotes;
