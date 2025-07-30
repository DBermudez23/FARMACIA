import editar from '../assets/editarAzul.svg';
import BotonCancelar from '../components/atoms/BotonCancelar';
import BotonConfirmar from '../components/atoms/BotonConfirmar';
import { useState } from 'react';
import perfil from '../assets/perfilIMG.svg';
import subir from '../assets/Upload.svg';

const usuarioBase = {
  nombre: 'Daniel Bermudez',
  email: 'daniel@example.com',
  direccion: 'Calle Falsa 123',
  telefono: '1234567890',
  sexo: 'Masculino',
  edad: 30
};

function MiPerfil() {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [usuario, setUsuario] = useState(usuarioBase);
  const [imagenActual, setImagenActual] = useState(perfil);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmar = () => {
    // Aquí puedes guardar los datos modificados si se conecta a backend
    setEditarPerfil(false);
  };

  return (
    <div className='w-full flex justify-center'>
      <div className="max-w-3xl w-full px-4 sm:px-8 py-10 bg-white shadow-lg rounded-xl">

        {/* Botón editar */}
        <div
          className="flex items-center gap-3 mb-8 cursor-pointer hover:opacity-80"
          onClick={() => setEditarPerfil(!editarPerfil)}
        >
          <img src={editar} alt="Editar Perfil" className="w-6 h-6" />
          <p className="text-[#15D0EF] font-semibold">EDITAR</p>
        </div>

        {/* Imagen y formulario */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          {/* Imagen */}
          {editarPerfil ? (
            <label htmlFor="imagen" className="cursor-pointer group relative">
              <div className="inline-block relative">
                <img
                  className="w-28 h-28 object-cover rounded-md opacity-75 group-hover:opacity-60 transition"
                  src={imagenActual instanceof File ? URL.createObjectURL(imagenActual) : imagenActual}
                  alt="Vista previa"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition rounded-md">
                  <img src={subir} className="w-8 h-8" alt="Cambiar imagen" />
                </div>
              </div>
              <input
                type="file"
                id="imagen"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImagenActual(e.target.files[0]);
                  }
                }}
              />
            </label>
          ) : (
            <img
              src={imagenActual instanceof File ? URL.createObjectURL(imagenActual) : imagenActual}
              alt="Perfil"
              className="w-28 h-28 object-cover rounded-full border-4 border-[#15D0EF]"
            />
          )}

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            {/* Campo: NOMBRE */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">NOMBRE:</h3>
              {editarPerfil ? (
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              ) : (
                <p className="text-gray-600">{usuario.nombre}</p>
              )}
            </div>

            {/* Campo: EMAIL */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">EMAIL:</h3>
              {editarPerfil ? (
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              ) : (
                <p className="text-gray-600">{usuario.email}</p>
              )}
            </div>

            {/* Campo: DIRECCIÓN */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">DIRECCIÓN:</h3>
              {editarPerfil ? (
                <input
                  type="text"
                  name="direccion"
                  value={usuario.direccion}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              ) : (
                <p className="text-gray-600">{usuario.direccion}</p>
              )}
            </div>

            {/* Campo: TELÉFONO */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">TELÉFONO:</h3>
              {editarPerfil ? (
                <input
                  type="tel"
                  name="telefono"
                  value={usuario.telefono}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              ) : (
                <p className="text-gray-600">{usuario.telefono}</p>
              )}
            </div>

            {/* Campo: SEXO */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">SEXO:</h3>
              {editarPerfil ? (
                <select
                  name="sexo"
                  value={usuario.sexo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                >
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
              ) : (
                <p className="text-gray-600 capitalize">{usuario.sexo}</p>
              )}
            </div>

            {/* Campo: EDAD */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">EDAD:</h3>
              <p className="text-gray-600">{usuario.edad} años</p>
            </div>
          </div>
        </div>

        {/* Botones */}
        {editarPerfil && (
          <div className="flex justify-end gap-4 mt-6">
            <BotonCancelar onClick={() => setEditarPerfil(false)} />
            <BotonConfirmar onClick={handleConfirmar} />
          </div>
        )}
      </div>
    </div >
  );
}
export default MiPerfil;
