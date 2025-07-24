import lupa from '../../assets/lupaBusqueda.svg';

function BarraBusqueda() {
  return (
    <div className="w-full max-w-6xl flex border border-[var(--color-primario)] rounded-xl overflow-hidden">
      <input
        type="text"
        placeholder="Escribe el nombre del medicamento, laboratorio, lote, ID ..."
        className="flex-1 px-4 py-2 outline-none text-sm placeholder-gray-400"
      />
      <div className="flex items-center justify-center px-4 border-l border-[var(--color-primario)] cursor-pointer hover:bg-gray-200">
        <img src={lupa} alt="Buscar" className="w-4 h-4" />
      </div>
    </div>
  );
}

export default BarraBusqueda;

