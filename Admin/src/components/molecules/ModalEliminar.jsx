import { useState } from 'react';

function ModalEliminar({ visible, onClose, onConfirm, nombreElemento }) {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    if (!password) return;
    onConfirm(password);
    setPassword('');
  };

  const handleCancel = () => {
    setPassword('');
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-red-600 text-center">¿Eliminar {nombreElemento}?</h2>

        <p className="text-gray-700 text-sm text-center">
          Para confirmar esta acción necesitas ingresar la contraseña del administrador.
        </p>

        <input
          type="password"
          placeholder="Contraseña del administrador"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <div className="flex justify-between gap-4 pt-4">
          <button
            onClick={handleCancel}
            className="w-1/2 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="w-1/2 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEliminar;
