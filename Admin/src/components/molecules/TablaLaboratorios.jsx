import { useState } from "react";
import BotonEditarMini from "../atoms/BotonEditarMini";
import BotonEliminarMini from "../atoms/BotonEliminarMini";
import BotonConfirmarTablas from "../atoms/BotonConfirmarTablas";
import BotonCancelarTablas from "../atoms/BotonCancelarTablas";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ModalEliminar from "./ModalEliminar";

function TablaLaboratorios() {
  const [filaEditando, setFilaEditando] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});

  const [mostrarModal, setMostrarModal] = useState(false);
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null);

  const { laboratorios, obtenerLaboratorios, aToken, backendURL } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      obtenerLaboratorios();
    }
  }, [aToken])

  const handleEditar = (idx, lab) => {
    setFilaEditando(idx);
    setValoresEditados({ ...lab });
  };


  const handleCancelar = () => {
    setFilaEditando(null);
    setValoresEditados({});
  };

  const handleConfirmar = async (lab) => {
    try {
      const { data } = await axios.put(
        backendURL + `/api/admin/editar-laboratorio/${lab._id}`,
        valoresEditados,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Laboratorio editado correctamente");
        setFilaEditando(null);
        setValoresEditados({});
        obtenerLaboratorios();
      } else {
        toast.error(data.message || "Error al editar");
      }
    } catch (error) {
      toast.error(error.message || "Error en la petición");
    }
  };

  //Al hacer click en eliminar se mostrará la modal que solicitara la contraseña del administrador
  const handleEliminarClick = (lab) => {
    setLaboratorioSeleccionado(lab);
    setMostrarModal(true);
  };

  //Función que se ejecutara al introducir la contraseña en la modal
  const eliminarLaboratorio = async (contraseñaAdmin) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/admin/eliminar-laboratorio/${laboratorioSeleccionado._id}`,
        {
          headers: { aToken },
          data: { contraseña: contraseñaAdmin }
        }
      );

      if (data.success) {
        obtenerLaboratorios();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.success('Laboratorio eliminado correctamente');
      setMostrarModal(false);
      setLaboratorioSeleccionado(null);
    }
  };



  const handleInputChange = (e) => {
    setValoresEditados({
      ...valoresEditados,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-white text-black text-sm text-center">
            <th className="border-r px-4 py-2 rounded-tl-xl">CÓDIGO</th>
            <th className="border-r px-4 py-2">NOMBRE</th>
            <th className="border-r px-4 py-2">DIRECCIÓN</th>
            <th className="border-r px-4 py-2">TELÉFONO</th>
            <th className="border-r px-4 py-2">MAIL</th>
            <th className="px-4 py-2 rounded-tr-xl">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios.map((lab, idx) => {
            const isEditing = filaEditando === idx;
            const isLast = idx === laboratorios.length - 1;

            return (
              <tr key={idx} className="bg-gray-300 text-center text-sm">
                <td className={`border-r border-t px-2 py-1 ${isLast ? "rounded-bl-xl" : ""}`}>
                  {lab._id.slice(0, 8)}
                </td>

                <td className="border-r border-t px-2 py-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="nombre"
                      value={valoresEditados.nombre}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border bg-white border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    lab.nombre
                  )}
                </td>

                <td className="border-r border-t px-2 py-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="direccion"
                      value={valoresEditados.direccion}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border bg-white border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    lab.direccion
                  )}
                </td>

                <td className="border-r border-t px-2 py-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="telefono"
                      value={valoresEditados.telefono}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border bg-white border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    lab.telefono
                  )}
                </td>

                <td className="border-r border-t px-2 py-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="mail"
                      value={valoresEditados.mail}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border bg-white border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    lab.mail
                  )}
                </td>

                <td className="border-t px-2 py-2">
                  {isEditing ? (
                    <div className="flex justify-center items-center gap-2">
                      <BotonConfirmarTablas onClick={() => handleConfirmar(lab)} />
                      <BotonCancelarTablas onClick={handleCancelar} />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <BotonEditarMini onClick={() => handleEditar(idx, lab)} />
                      <BotonEliminarMini onClick={() => handleEliminarClick(lab)} />
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalEliminar
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={eliminarLaboratorio}
        nombreElemento={laboratorioSeleccionado?.nombre || "este laboratorio"}
      />

    </div>
  );
}

export default TablaLaboratorios;
