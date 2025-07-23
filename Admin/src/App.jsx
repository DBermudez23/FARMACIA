import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PanelPrincipal from './pages/PanelPrincipal';
import GestionLotes from './pages/GestionLotes';
import GestionProducto from './pages/GestionProducto';
import GestionAtributos from './pages/GestionAtributos';
import GestionProveedores from './pages/GestionProveedores';
import MiPerfil from './pages/MiPerfil';
import Contraseña from './pages/Contraseña';
import GestionUsuarios from './pages/GestionUsuarios';
import PanelVentas from './pages/PanelVentas';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-center'>
        <Sidebar/>
        <Routes>
          <Route path='/admin-panel-principal' element={<PanelPrincipal/>} />
          <Route path='/admin-gestion-lotes' element={<GestionLotes/>} />
          <Route path='/admin-gestion-producto' element={<GestionProducto/>} />
          <Route path='/admin-gestion-atributos' element={<GestionAtributos/>} />
          <Route path='/admin-gestion-proveedores' element={<GestionProveedores/>} />
          <Route path='/admin-editar-perfil' element={<MiPerfil/>} />
          <Route path='/admin-editar-contrasena' element={<Contraseña/>} />
          <Route path='/admin-gestion-usuarios' element={<GestionUsuarios/>} />
          <Route path='/admin-panel-ventas' element={<PanelVentas/>} />
          <Route path='/admin-login' element={<Login/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
