import { useContext } from 'react';
import { assetsNav } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const {productosCarrito} = useContext(AppContext);

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b-2 border-[#15D0EF] bg-white">

      {/* Logo */}
      <div>
        <img src={assetsNav.logoFarmacia} alt="Logo Farmacia" />
      </div>

      {/* Carrito y Cerrar Sesión */}
      <div onClick={() =>  navigate('/admin-facturacion')} className="flex items-center gap-8">
        {/* Contenedor carrito con burbuja */}
        <div  className="relative">
          <div className="w-12 h-9 rounded-xl bg-[#15D0EF] flex items-center justify-center cursor-pointer hover:bg-cyan-300">
            <img className="w-6" src={assetsNav.carrito} alt="Carrito" />
          </div>
          {/* Burbuja de notificación */}
          <span className="absolute -top-2 -right-2 bg-[#FDB750] text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {productosCarrito}
          </span>
        </div>

        {/* Botón Cerrar Sesión */}
        <button className="text-[#15D0EF] border border-[#15D0EF] px-6 py-2 rounded-xl font-semibold text-xs hover:bg-[#15D0EF] hover:text-white transition-all cursor-pointer">
          CERRAR SESIÓN
        </button>
      </div>

    </div>

  )
}

export default Navbar
