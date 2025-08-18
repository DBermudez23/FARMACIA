import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";
import { useState, useContext, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import BotonConfirmarTablas from "../atoms/BotonConfirmarTablas";
import BotonCancelarTablas from "../atoms/BotonCancelarTablas";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import ModalEliminar from "./ModalEliminar";
import { toast } from "react-toastify";

function CartaLote({ infoLote }) {
  const { moneda } = useContext(AppContext);
  const {
    proveedores, obtenerProveedores,
    laboratorios, obtenerLaboratorios,
    presentaciones, obtenerPresentaciones,
    productos, obtenerProductos,
    aToken, setAToken,
    backendURL
  } = useContext(AdminContext);

  const [editar, setEditar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [datosEditados, setDatosEditados] = useState({
    proveedor: infoLote.proveedor || "",
    precioLote: infoLote.precio ?? "",
    idlote: infoLote._id || "",
    stock: infoLote.cantidad ?? "",
    ingreso: infoLote.fechaLlegada
      ? format(new Date(infoLote.fechaLlegada), "yyyy-MM-dd")
      : "",
    vencimiento: infoLote.fechaVencimiento
      ? format(new Date(infoLote.fechaVencimiento), "yyyy-MM-dd")
      : "",
  });

  const actualizarInfoLote = async () => {
    const payload = {
      proveedor: datosEditados.proveedor,
      cantidad: datosEditados.stock,
      fechaLlegada: datosEditados.ingreso,
      fechaVencimiento: datosEditados.vencimiento,
      precio: datosEditados.precioLote
    };


    try {
      const { data } = await axios.put(
        `${backendURL}/api/admin/editar-lote/${infoLote._id}`,
        payload,
        {
          headers: {
            aToken
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        setEditar(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };


  useEffect(() => {
    if (aToken) {
      obtenerLaboratorios();
      obtenerPresentaciones();
      obtenerProductos();
      obtenerProveedores();
    }
  }, [aToken])

  const handleChange = (e) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelar = () => {
    setEditar(false);
    setDatosEditados({
      proveedor: infoLote.proveedor || "",
      precioLote: infoLote.precio ?? "",
      idlote: infoLote._id || "",
      stock: infoLote.cantidad ?? "",
      ingreso: infoLote.fechaLlegada
        ? format(new Date(infoLote.fechaLlegada), "yyyy-MM-dd")
        : "",
      vencimiento: infoLote.fechaVencimiento
        ? format(new Date(infoLote.fechaVencimiento), "yyyy-MM-dd")
        : "",
    });

  }

  //Al hacer click en eliminar se mostrará la modal que solicitara la contraseña del administrador
  const handleEliminarClick = () => {
    setMostrarModal(true);
  };

  //Función que se ejecutara al introducir la contraseña en la modal
  const eliminarLote = async (contraseñaAdmin) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/admin/eliminar-lote/${infoLote._id}`,
        {
          headers: { aToken },
          data: { contraseña: contraseñaAdmin }
        }
      );

      if (data.success) {
        setMostrarModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.success('Lote eliminado correctamente');
    }
  };

  const fechaHoy = new Date();
  const fechaVencimiento = new Date(infoLote.fechaVencimiento);
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

  return (
    <div className={`relative w-full max-w-4xl min-h-[200px] bg-white rounded-xl shadow-md p-5 flex gap-4 items-center ${bordeColor}`}>
      {/* Badge */}
      <div className={`absolute top-0 left-0 rounded-br-xl px-3 py-1 text-xs font-bold ${colorBadge}`}>
        {estado}
      </div>

      {/* Imagen */}
      <img
        src={productos.find(prod => prod._id === infoLote.producto)?.imagen}
        alt={'Producto'}
        className="w-28 h-28 object-contain rounded-md"
      />

      {/* Info */}
      <div className="flex flex-col justify-between text-sm w-full">
        <h3 className="text-lg font-bold uppercase text-gray-800">
          {productos.find(prod => prod._id === infoLote.producto)?.nombre}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-2 mt-2">
          {/* Proveedor */}
          <p className="max-w-[240px] truncate">
            <span className="font-semibold text-gray-600">Proveedor:</span>{" "}
            {editar ? (
              <select
                name="proveedor"
                value={datosEditados.proveedor}
                onChange={handleChange}
              >
                {proveedores.map((prov) => (
                  <option key={prov._id} value={prov._id}>
                    {prov.nombre}
                  </option>
                ))}
              </select>
            ) : (
              proveedores.find(prov => prov._id === infoLote.proveedor)?.nombre
            )}
          </p>

          {/* Presentación */}
          <p className="max-w-[240px] truncate">
            <span className="font-semibold text-gray-600">Presentación:</span>{" "}
            {presentaciones.find(
              pres => pres._id === productos.find(prod => prod._id === infoLote.producto)?.presentacion
            )?.nombre}
          </p>

          {/* Laboratorio */}
          <p className="max-w-[240px] truncate">
            <span className="font-semibold text-gray-600">Laboratorio:</span>{" "}
            {laboratorios.find(
              lab => lab._id === productos.find(prod => prod._id === infoLote.producto)?.laboratorio
              )?.nombre}
          </p>

          {/* Precio Lote */}
          <div className="max-w-[240px]">
            <span className="font-semibold text-gray-600">Precio lote:</span>{" "}
            {editar ? (
              <input
                type="number"
                name="precioLote"
                value={datosEditados.precioLote}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : (
              `${moneda}${infoLote.precio}`
            )}
          </div>

          {/* ID Lote */}
          <p className="max-w-[240px] truncate">
            <span className="font-semibold text-gray-600">ID lote:</span>{" "}
            {infoLote._id.slice(0, 6)}
          </p>

          {/* Stock */}
          <p className="max-w-[240px]">
            <span className="font-semibold text-gray-600">Stock:</span>{" "}
            {editar ? (
              <input
                type="number"
                name="stock"
                value={datosEditados.stock}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : (
              infoLote.cantidad
            )}
          </p>

          {/* Fecha ingreso */}
          <p className="max-w-[240px]">
            <span className="font-semibold text-gray-600">Ingreso:</span>{" "}
            {editar ? (
              <input
                type="date"
                name="ingreso"
                value={datosEditados.ingreso}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : infoLote.fechaLlegada ? (
              format(new Date(infoLote.fechaLlegada), "yyyy-MMM-dd", { locale: es }).toUpperCase()
            ) : (
              "SIN FECHA"
            )}
          </p>

          {/* Fecha vencimiento */}
          <p className="max-w-[240px]">
            <span className="font-semibold text-gray-600">Vence:</span>{" "}
            {editar ? (
              <input
                type="date"
                name="vencimiento"
                value={datosEditados.vencimiento}
                onChange={handleChange}
                className="border border-black bg-white rounded px-2 py-1 w-full text-sm text-gray-800"
              />
            ) : infoLote.fechaVencimiento ? (
              format(new Date(infoLote.fechaVencimiento), "yyyy-MMM-dd", { locale: es }).toUpperCase()
            ) : (
              "SIN FECHA"
            )}
          </p>
        </div>

        {/* Botones */}
        {editar ? (
          <div className="flex gap-3 justify-end mt-4">
            <BotonConfirmarTablas onClick={actualizarInfoLote} />
            <BotonCancelarTablas onClick={handleCancelar} />
          </div>
        ) : (
          <div className="flex gap-3 justify-end mt-4">
            <BotonEditar onClick={() => setEditar(!editar)} />
            <BotonEliminar onClick={() => handleEliminarClick(infoLote)} />
          </div>
        )}
      </div>

      <ModalEliminar
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={eliminarLote}
        nombreElemento={productos.find(prod => prod._id === infoLote.producto)?.nombre || "este usuario"}
      />
    </div>
  );
}

export default CartaLote;
