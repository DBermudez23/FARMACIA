import { NavLink, useLocation } from 'react-router-dom';
import { sideBarBotones } from '../assets/assets.js';

function ScrollToTop () {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function Sidebar() {
  return (
    <div className='min-h-screen border-r-2 border-[#15D0EF]'>
      <ul className="text-[#15D0EF] text-xs font-semibold">
        {sideBarBotones.map((boton, i) => (
          <NavLink
            onClick={() => ScrollToTop()}
            key={i}
            to={boton.to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 md:px-9 md:min-w-72 cursor-pointer border-b-2 border-[#15D0EF]
          ${isActive ? 'bg-[#E1FAFD] border-r-4 border-[#15D0EF]' : ''}`
            }
          >
            <img src={boton.icono} alt="" />
            <p className="hidden md:block">{boton.texto}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar