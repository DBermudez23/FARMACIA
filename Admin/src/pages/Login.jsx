import logoFarmacia from '../assets/LogoFarmaciaNav.svg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';


function Login() {

  const navigate = useNavigate();

  const { setAToken, backendURL } = useContext(AdminContext);

  const [mail, setMail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setCargando(true);
    try {
      const { data } = await axios.post(backendURL + '/api/admin/login', { mail, contrasena });
      console.log(data)
      if (data.success) {
        localStorage.setItem('aToken', data.token);
        setAToken(data.token);
        navigate('/admin-panel-principal');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl px-10 py-12 w-full max-w-sm">
        {/* Logo (opcional) */}
        <div className="flex justify-center mb-6">
          <img src={logoFarmacia} alt="Logo" className="w-20 h-20 object-contain" />
        </div>

        {/* Título */}
        <h2 className="text-center text-cyan-500 font-bold text-lg mb-1">LOGIN</h2>
        <p className="text-center text-sm text-gray-600 mb-6">ADMIN</p>

        {/* Formulario */}
        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label htmlFor="mail" className="block text-xs font-semibold text-gray-600 mb-1">MAIL</label>
            <input
              type="email"
              id='mail'
              className="w-full border border-cyan-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Correo electrónico"
              required
              onChange={(e) => setMail(e.target.value)}
              value={mail}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contrasena" className="block text-xs font-semibold text-gray-600 mb-1">CONTRASEÑA</label>
            <input
              type="password"
              id="contrasena"
              className="w-full border border-cyan-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="********"
              required
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className={`w-full ${cargando ? 'bg-cyan-300 cursor-not-allowed' : 'bg-cyan-400 hover:bg-cyan-500'} text-white font-bold py-2 rounded-md transition cursor-pointer`}
          >
            {cargando ? 'Cargando...' : 'INGRESAR'}
          </button>
        </form>
      </div>
    </div >
  );
}

export default Login;
