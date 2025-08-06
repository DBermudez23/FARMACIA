import { useContext, useState } from "react";
import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";
import BotonConfirmarMini from "../atoms/BotonConfirmarMini";
import BotonCancelarMini from "../atoms/BotonCancelarMini";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import subir from '../../assets/Upload.svg';
import ModalEliminar from "./ModalEliminar";


function CartaUsuarios({ usuario }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [datosEditados, setDatosEditados] = useState({
    nombre: usuario.nombre || "",
    telefono: usuario.telefono || "",
    mail: usuario.mail || "",
    direccion: usuario.direccion || ""
  });

  const actualizarInfoUsuario = async () => {
    const formData = new FormData();
    formData.append('nombre', datosEditados.nombre);
    formData.append('telefono', datosEditados.telefono);
    formData.append('direccion', datosEditados.direccion);
    formData.append('mail', datosEditados.mail);
    nuevaImagen && formData.append('imagen', nuevaImagen);

    try {
      const { data } = await axios.put(backendURL + `/api/admin/editar-vendedor/${usuario._id}`, formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setModoEdicion(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const { backendURL, aToken, obtenerVendedores } = useContext(AdminContext);

  const handleChange = (e) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value,
    });
  };


  function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return "";
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  const handleCancelar = () => {
    setModoEdicion(false);
    setDatosEditados({ ...usuario });
  };

  //Al hacer click en eliminar se mostrará la modal que solicitara la contraseña del administrador
  const handleEliminarClick = (usuario) => {
    setMostrarModal(true);
  };

  //Función que se ejecutara al introducir la contraseña en la modal
  const eliminarUsuario = async (contraseñaAdmin) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/admin/eliminar-vendedor/${usuario._id}`,
        {
          headers: { aToken },
          data: { contraseña: contraseñaAdmin }
        }
      );

      if (data.success) {
        obtenerVendedores();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.success('vendedor eliminado correctamente');
      setMostrarModal(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-sm min-h-[340px] rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300 border border-gray-200">

      {/*IMAGEN */}
      {
        modoEdicion ? (
          <label htmlFor={`imagen-${usuario._id}`}>
            <div className='inline-block relative cursor-pointer'>
              <img
                className='w-24 h-24 rounded opacity-75 object-contain mx-auto'
                src={
                  nuevaImagen
                    ? URL.createObjectURL(nuevaImagen)
                    : usuario.imagen
                }
                alt="Producto"
              />
              {
                !nuevaImagen && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition rounded-md">
                    <img src={subir} className="w-8 h-8" alt="Cambiar imagen" />
                  </div>
                )
              }
            </div>
            <input
              type="file"
              id={`imagen-${usuario._id}`}
              hidden
              accept="image/*"
              onChange={(e) => setNuevaImagen(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={usuario.imagen}
            alt={usuario.nombre}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#15D0EF]"
          />
        )
      }


      <div className="w-full text-center flex flex-col gap-2">
        {modoEdicion ? (
          <>
            <input
              type="text"
              name="nombre"
              value={datosEditados.nombre}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
            <input
              type="email"
              name="correo"
              value={datosEditados.mail}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
            <input
              type="tel"
              name="telefono"
              value={datosEditados.telefono}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
            <input
              type="text"
              name="direccion"
              value={datosEditados.direccion}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15D0EF] transition"
            />
          </>
        ) : (
          <div className="w-full text-left space-y-2 text-xs sm:text-sm py-3">
            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">NOMBRE: </span>
              <span>{usuario.nombre}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">CORREO: </span>
              <span>{usuario.mail}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">TELÉFONO: </span>
              <span>{usuario.telefono}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">DIRECCIÓN: </span>
              <span>{usuario.direccion}</span>
            </p>

            <p className="text-gray-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-semibold">EDAD: </span>
              <span>{calcularEdad(usuario.nacimiento)} años</span>
            </p>
          </div>


        )}
      </div>

      <div className="flex justify-center gap-4 mt-3 flex-wrap">
        {modoEdicion ? (
          <>
            <BotonCancelarMini onClick={handleCancelar} />
            <BotonConfirmarMini onClick={actualizarInfoUsuario} />
          </>
        ) : (
          <>
            <BotonEditar onClick={() => setModoEdicion(!modoEdicion)} />
            <BotonEliminar onClick={() => handleEliminarClick(usuario)}/>
          </>
        )}
      </div>

      <ModalEliminar
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={eliminarUsuario}
        nombreElemento={usuario.nombre || "este usuario"}
      />
    </div>
  );
}

export default CartaUsuarios;
