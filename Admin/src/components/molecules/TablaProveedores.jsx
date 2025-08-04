import { useState } from "react";
import BotonEditarMini from "../atoms/BotonEditarMini";
import BotonEliminarMini from "../atoms/BotonEliminarMini";
import BotonConfirmarTablas from "../atoms/BotonConfirmarTablas";
import BotonCancelarTablas from "../atoms/BotonCancelarTablas";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ModalEliminar from "./ModalEliminar";


function TablaProveedores() {
  const [filaEditando, setFilaEditando] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const {aToken, proveedores, obtenerProveedores, backendURL} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      obtenerProveedores();
    }
  }, [aToken])

  useEffect(() => {
    obtenerProveedores();
  }, [proveedores])

  const handleEditar = (idx, prov) => {
    setFilaEditando(idx);
    setValoresEditados({ ...prov });
  };

  const handleCancelar = () => {
    setFilaEditando(null);
    setValoresEditados({});
  };

  const handleInputChange = (e) => {
    setValoresEditados({
      ...valoresEditados,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmar = async (lab) => {
    try {
      const {data} = await axios.put(
        backendURL + `/api/admin/editar-proveedor/${lab._id}`, 
        valoresEditados, 
        {headers: {aToken}}
      );

      if (data.success) {
        toast.success(data.message);
        setFilaEditando(null);
        setValoresEditados({});
        obtenerProveedores();
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Al hacer click en eliminar se mostrara la modal que solicitara la contraseña
  const handleEliminarClick = (prov) => {
    setProveedorSeleccionado(prov);
    setMostrarModal(true);
  }

  const eliminarProveedor = async (contraseñaAdmin) => {
    try {
      const {data} = await axios.delete(
        backendURL + `/api/admin/eliminar-proveedor/${proveedorSeleccionado._id}`,
        {
          headers: {aToken},
          data: {contraseña : contraseñaAdmin}
        }
      )
      if (data.success) {
        obtenerProveedores();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.success('Proveedor eliminado correctamente');
      setMostrarModal(false);
      setProveedorSeleccionado(null);
      obtenerProveedores();
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-white text-black text-sm text-center">
            <th className="border-r px-4 py-2 rounded-tl-xl">ID PROVEEDOR</th>
            <th className="border-r px-4 py-2">TELÉFONO</th>
            <th className="border-r px-4 py-2">NOMBRE</th>
            <th className="border-r px-4 py-2">DIRECCIÓN</th>
            <th className="border-r px-4 py-2">MAIL</th>
            <th className="px-4 py-2 rounded-tr-xl">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {proveedores && proveedores.map((prov, idx) => {
            const isEditing = filaEditando === idx;
            const isLast = idx === proveedores.length - 1;

            return (
              <tr key={idx} className="bg-gray-300 text-center text-sm">
                <td className={`border-r border-t px-2 py-2 ${isLast ? 'rounded-bl-xl' : ''}`}>
                  {prov._id.slice(0, 6)}
                </td>

                <td className="border-r border-t px-2 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="telefono"
                      value={valoresEditados.telefono}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    prov.telefono
                  )}
                </td>

                <td className="border-r border-t px-2 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="nombre"
                      value={valoresEditados.nombre}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    prov.nombre
                  )}
                </td>

                <td className="border-r border-t px-2 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="direccion"
                      value={valoresEditados.direccion}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    prov.direccion
                  )}
                </td>

                <td className="border-r border-t px-2 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="mail"
                      value={valoresEditados.mail}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  ) : (
                    prov.mail
                  )}
                </td>

                <td className="border-t px-2 py-2">
                  {isEditing ? (
                    <div className="flex justify-center items-center gap-2">
                      <BotonConfirmarTablas onClick={() => handleConfirmar(prov)} />
                      <BotonCancelarTablas onClick={handleCancelar} />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <BotonEditarMini onClick={() => handleEditar(idx, prov)} />
                      <BotonEliminarMini onClick={() => handleEliminarClick(prov)}/>
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
        onConfirm={eliminarProveedor }
        nombreElemento={proveedorSeleccionado?.nombre || "este proveedor"}
      />
    </div>
  );
}

export default TablaProveedores;
