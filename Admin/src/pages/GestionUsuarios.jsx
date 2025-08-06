import BarraBusqueda from "../components/atoms/BarraBusqueda";
import CartaUsuarios from "../components/molecules/CartaUsuarios";
import añadir from '../assets/añadir.svg';
import { useContext, useEffect, useState } from "react";
import NuevoVendedorForm from "../components/molecules/NuevoVendedorForm";
import { AdminContext } from "../context/AdminContext";


function GestionUsuarios() {

  const [nuevoVendedor, setNuevoVendedor] = useState(false);

  const {
    aToken,
    vendedores, obtenerVendedores
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      obtenerVendedores();
    }
  }, [aToken])

  useEffect(() => {
    obtenerVendedores();
  }, [vendedores])

  return (
    <div className='w-full flex flex-wrap justify-center'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          BUSCAR USUARIO
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevoVendedor(!nuevoVendedor)}>
          <img src={añadir} alt="Nuevo Lote" />
          <p className="text-[#15D0EF]">NUEVO VENDEDOR</p>
        </div>

        {nuevoVendedor && <NuevoVendedorForm setNuevoVendedor={setNuevoVendedor} />}

        {vendedores.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {vendedores.map((usuario, i) => (
              <CartaUsuarios key={i} usuario={usuario} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">No se encontraron usuarios.</p>
        )}

      </div>
    </div>
  )
}

export default GestionUsuarios
