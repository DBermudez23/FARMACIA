import { usuarios } from "../assets/assets";
import BarraBusqueda from "../components/atoms/BarraBusqueda";
import CartaUsuarios from "../components/molecules/CartaUsuarios";

function GestionUsuarios() {
  return (
    <div className='w-full flex flex-wrap justify-center'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          BUSCAR USUARIO
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        {usuarios.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {usuarios.map((usuario, i) => (
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
