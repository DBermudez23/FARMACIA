import { useContext, useEffect } from "react"
import TablaCarrito from "../components/molecules/TablaProductosCarrito"
import { AppContext } from "../context/AppContext"
import { AdminContext } from "../context/AdminContext";

function Facturacion() {

  const { carritoCompras, setCarritoCompras } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      console.log(carritoCompras)
    }
  }, [aToken])


  return (
    <div className="w-full flex flex-wrap justify-center">
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-xl sm:text-md text-start mb-4 font-bold text-[#15D0EF]">
          FACTURACIÓN
        </h2>

        <p className="text-sm sm:text-md text-start mb-4">
          EN EL CARRITO:
        </p>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 my-10">
          <TablaCarrito carrito={carritoCompras} />
        </div>

      </div>
    </div>
  )
}

export default Facturacion
