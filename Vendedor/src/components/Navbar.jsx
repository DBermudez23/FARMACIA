import { assetsNav } from '../assets/assets';

function Navbar() {

  /*const navigate = useNavigate();

  const {
    carritoCompras
  } = useContext(AppContext);
  const {aToken, setAToken} = useContext(AdminContext);

  const logOut = () => {
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  }*/

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b-2 border-[#15D0EF] bg-white">

      {/* Logo */}
      <div>
        <img src={assetsNav.logoFarmacia} alt="Logo Farmacia" />
      </div>

      {/* Carrito y Cerrar Sesión */}
      <div className="flex items-center gap-8">
        {/* Contenedor carrito con burbuja */}
        <div  className="relative">
          <div
            onClick={() =>  navigate('/admin-facturacion')}
            className="w-12 h-9 rounded-xl bg-[#15D0EF] flex items-center justify-center cursor-pointer hover:bg-cyan-300">
            <img className="w-6" src={assetsNav.carrito} alt="Carrito" />
          </div>
          {/* Burbuja de notificación */}
          <span className="absolute -top-2 -right-2 bg-[#FDB750] text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {carritoCompras.length}
          </span>
        </div>

        {/* Botón Cerrar Sesión */}
        <button 
          onClick={logOut}
          className="text-[#15D0EF] border border-[#15D0EF] px-6 py-2 rounded-xl font-semibold text-xs hover:bg-[#15D0EF] hover:text-white transition-all cursor-pointer"
          >
          CERRAR SESIÓN
        </button>
      </div>

    </div>

  )
}

export default Navbar
