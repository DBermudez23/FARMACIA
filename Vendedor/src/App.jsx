import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PanelPrincipal from './pages/PanelPrincipal';
import MiPerfil from './pages/MiPerfil';
import Contraseña from './pages/Contraseña';
import PanelVentas from './pages/PanelVentas';
import Login from './pages/Login';
import Facturacion from './pages/Facturacion';
import { useContext } from 'react';
import { VendedorContext } from './context/VendedorContext';

function App() {
  const { token } = useContext(VendedorContext);

  return token ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* Contenedor para scroll */}
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
          <Routes>
            <Route path='/vendedor-panel-principal' element={<PanelPrincipal />} />
            <Route path='/vendedor-editar-perfil' element={<MiPerfil />} />
            <Route path='/vendedor-editar-contraseña' element={<Contraseña />} />
            <Route path='/vendedor-panel-ventas' element={<PanelVentas />} />
            <Route path='/vendedor-facturacion' element={<Facturacion />} />
          </Routes>
        </div>
      </div>
    </div>
  )
    : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App;