import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import BotonConfirmarTablas from "../atoms/BotonConfirmarTablas";
import BotonCancelarTablas from "../atoms/BotonCancelarTablas";
import subir from '../../assets/Upload.svg';

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
    imagen: imagenInicial // ⚠️ Renombrado aquí para evitar conflicto con useState
  } = infoLote;

  const proveedores = [
    "Proveedor 1",
    "Proveedor 2",
    "Proveedor 3",
    "Proveedor 4"
  ]

  const [editar, setEditar] = useState(false);
  const [imagenActual, setImagenActual] = useState(imagenInicial);
  const [datosEditados, setDatosEditados] = useState({
    proveedor,
    presentacion,
    laboratorio,
    precioLote,
    precioUnidad,
    idlote,
    stock,
    ingreso,
    vencimiento,
  });

  const handleChange = (e) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value,
    });
  };



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
    <div className={`relative w-full max-w-3xl min-h-[200px] ${bgCard} rounded-xl shadow-md p-5 flex gap-6 items-center ${bordeColor}`}>

      {/* Badge de estado */}
      <div className={`absolute top-0 left-0 rounded-br-xl px-3 py-1 text-xs font-bold ${colorBadge}`}>
        {estado}
      </div>

      {/* Imagen */}
      {editar ? (
        <label htmlFor="imagen" className="cursor-pointer group relative">
          <div className="inline-block relative">
            <img
              className="w-28 h-28 object-contain rounded-md opacity-75 group-hover:opacity-70 transition"
              src={imagenActual instanceof File ? URL.createObjectURL(imagenActual) : imagenActual}
              alt="Vista previa"
            />
            <div className="absolute inset-0 flex items-center rounded-md justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition cursor-pointer">
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
          src={imagenInicial}
          alt={producto}
          className="w-28 h-28 object-contain rounded-md"
        />
      )}


      {/* Info */}
      <div className="flex flex-col justify-between text-sm w-full">
        <h3 className={`text-lg font-bold uppercase ${textoColor}`}>{producto}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-2">
          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Proveedor:</span>
            {editar ? (
              <select name="proveedor" id="proveedor" value={datosEditados.proveedor} onChange={handleChange}>
                {proveedores.map((prov, idx) => (
                  <option key={idx} value={prov}>{prov}</option>
                ))}
              </select>
            ) : (
              proveedor
            )}
          </p>

          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Presentación:</span>
            {presentacion}
          </p>

          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Laboratorio:</span>
            {laboratorio}
          </p>

          <div className="max-w-[200px]">
            <span className={`font-semibold ${labelColor}`}>Precio lote:</span>
            {editar ? (
              <input
                type="number"
                name="precioLote"
                value={precioLote}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : (
              `$${precioLote}`
            )}
          </div>

          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>Precio c/u:</span> ${precioUnidad}
          </p>

          <p className="max-w-[200px] truncate">
            <span className={`font-semibold ${labelColor}`}>ID lote:</span> {idlote}
          </p>

          <p className="max-w-[200px]">
            <span className={`font-semibold ${labelColor}`}>Stock:</span>{" "}
            {editar ? (
              <input
                type="number"
                name="stock"
                value={datosEditados.stock}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : (
              stock
            )}
          </p>

          <p className="max-w-[200px]">
            <span className={`font-semibold ${labelColor}`}>Ingreso:</span>{" "}
            {editar ? (
              <input
                type="date"
                name="ingreso"
                value={format(new Date(datosEditados.ingreso), "yyyy-MM-dd")}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : (
              format(new Date(ingreso), "yyyy-MMM-dd", { locale: es }).toUpperCase()
            )}
          </p>

          <p className="max-w-[200px]">
            <span className={`font-semibold ${labelColor}`}>Vence:</span>{" "}
            {editar ? (
              <input
                type="date"
                name="vencimiento"
                value={format(new Date(datosEditados.vencimiento), "yyyy-MM-dd")}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : (
              format(fechaVencimiento, "yyyy-MMM-dd", { locale: es }).toUpperCase()
            )}
          </p>

        </div>


        {/* Botones */}
        {editar
          ? (
            <div className="flex gap-3 justify-end mt-4">
              <BotonConfirmarTablas onClick={() => setEditar(false)} />
              <BotonCancelarTablas onClick={() => setEditar(false)} />
            </div>
          ) : <div className="flex gap-3 justify-end mt-4">
            <BotonEditar onClick={() => setEditar(!editar)} />
            <BotonEliminar />
          </div>}

      </div>
    </div>
  );
}

export default CartaLote;
