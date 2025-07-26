import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function CartaLote({ infoLote }) {
  const {
    producto,
    proveedor,
    presentacion,
    laboratorio,
    precioLote,
    precioUnidad,
    ingreso,
    vencimiento,
    stock,
    idlote,
    imagen
  } = infoLote;

  const [isEdit, setIsEdit] = useState(false);  

  const fechaHoy = new Date();
  const fechaVencimiento = new Date(vencimiento);
  const diasRestantes = (fechaVencimiento - fechaHoy) / (1000 * 60 * 60 * 24);

  let estado = "";
  let colorBadge = "";
  let bordeColor = "";

  if (diasRestantes < 0) {
    estado = "VENCIDO";
    colorBadge = "bg-red-600 text-white";
    bordeColor = "border-l-8 border-red-600";
  } else if (diasRestantes <= 60) {
    estado = "EN RIESGO";
    colorBadge = "bg-yellow-400 text-yellow-900";
    bordeColor = "border-l-8 border-yellow-400";
  } else {
    estado = "VIGENTE";
    colorBadge = "bg-[#15D0EF] text-white";
    bordeColor = "border-l-8 border-[#15D0EF]";
  }

  const bgCard = "bg-white";
  const textoColor = "text-gray-800";
  const labelColor = "text-gray-600";

  return (
    <div className={`relative w-full max-w-3xl h-[200px] ${bgCard} rounded-xl shadow-md p-5 flex gap-6 items-center ${bordeColor}`}>

      {/* Badge de estado */}
      <div className={`absolute top-0 left-0 rounded-br-xl px-3 py-1 text-xs font-bold ${colorBadge}`}>
        {estado}
      </div>

      {/* Imagen */}
      <img
        src={imagen}
        alt={producto}
        className="w-28 h-28 object-contain rounded-md"
      />

      {/* Info */}
      <div className="flex flex-col justify-between text-sm w-full">
        <h3 className={`text-lg font-bold uppercase ${textoColor}`}>{producto}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-2">
          <p className="max-w-[200px] truncate">
            {/*Esto se debe editar en cada componente al hacer uso del backend*/}
            <span className={`font-semibold ${labelColor}`}>Proveedor:</span> {isEdit ? <input type="text" value={proveedor} className="border border-gray-300 rounded px-2 py-1" /> : proveedor}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Presentación:</span> {presentacion}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Laboratorio:</span> {laboratorio}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Precio lote:</span> ${precioLote}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Precio c/u:</span> ${precioUnidad}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>ID lote:</span> {idlote}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Stock:</span> {stock}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Ingreso:</span> {format(new Date(ingreso), "yyyy-MMM-dd", { locale: es }).toUpperCase()}
          </p>
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Vence:</span> {format(fechaVencimiento, "yyyy-MMM-dd", { locale: es }).toUpperCase()}
          </p>
        </div>


        {/* Botones */}
        <div className="flex gap-3 justify-end mt-4">
          <BotonEditar onClick={() => setIsEdit(!isEdit)} />
          <BotonEliminar />
        </div>
      </div>
    </div>
  );
}

export default CartaLote;
