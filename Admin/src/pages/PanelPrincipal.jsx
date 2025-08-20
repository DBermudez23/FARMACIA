import BarraBusqueda from "../components/atoms/BarraBusqueda";
import CartaProducto from "../components/molecules/CartaProducto";
import TablaMedicamentos from "../components/molecules/TablaMedicamentos";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";


function PanelPrincipal() {

  const {
    aToken,
    lotes, obtenerLotes,
    lotesVencidos, obtenerLotesVencidos,
    lotesPorVencer, obtenerLotesPorVencer
  } = useContext(AdminContext);

  // Lista combinada de riesgo
  const lotesRiesgoTotal = [...lotesVencidos, ...lotesPorVencer];

  useEffect(() => {
    if (aToken) {
      obtenerLotes();
      obtenerLotesPorVencer();
      obtenerLotesVencidos();
    }
  }, [aToken])

  return (
    <div className="w-full flex flex-wrap justify-center">
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          CATÁLOGO
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <h2 className="text-sm sm:text-md text-start mb-4">
          LOTES EN RIESGO POR VENCIMIENTO:
        </h2>

        <div className="overflow-x-auto">
          <TablaMedicamentos medicamentos={lotesRiesgoTotal} />
        </div>

        {/* PRODUCTOS */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {lotes.map((lote, i) => (
            <CartaProducto key={i} infoProducto={lote} />
          ))}
        </div>


      </div>


    </div>
  )
}

export default PanelPrincipal
