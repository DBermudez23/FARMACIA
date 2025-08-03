import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import BotonCancelar from "../atoms/BotonCancelar";
import BotonConfirmar from "../atoms/BotonConfirmar";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import subir from '../../assets/Upload.svg';
import { useEffect } from "react";

function NuevoProductoForm({ setNuevoProducto }) {

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [laboratorio, setLaboratorio] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');
  const [imagen, setImagen] = useState(null);

  const { moneda } = useContext(AppContext);
  const {
    backendURL, aToken,
    laboratorios, obtenerLaboratorios,
    tipos, obtenerTipos,
    presentaciones, obtenerPresentaciones
  } = useContext(AdminContext);

  useEffect(()=> {
    if (aToken) {
      obtenerLaboratorios();
      obtenerTipos();
      obtenerPresentaciones();
    } 
  }, [aToken])

  console.log(laboratorios);


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(tipo, presentacion, laboratorio)

    if (!nombre || !tipo || !laboratorio || !presentacion || !precio || !imagen) {
      return toast.error('Todos los campos son obligatorios');
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    formData.append("laboratorio", laboratorio);
    formData.append("presentacion", presentacion);
    formData.append("precio", precio);
    formData.append("imagen", imagen);
    formData.append("infoAdicional", infoAdicional);

    try {
      const { data } = await axios.post(
        `${backendURL}/api/admin/nuevo-producto`,
        formData,
        {
          headers: {
            aToken
          }
        }
      );

      if (data.success) {
        toast.success("Producto creado exitosamente");
        setImagen(null);
        setNombre('');
        setLaboratorio('');
        setPrecio('');
        setPresentacion('');
        setTipo('');
        setInfoAdicional('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

      {/* Imagen */}
      <div className="flex flex-col items-center justify-center">
        <label className="block text-sm font-semibold text-gray-700 mb-2">IMAGEN DEL PRODUCTO</label>

        <label htmlFor="imagen-upload">
          <div className="relative w-36 h-36 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-[#15D0EF] rounded-md cursor-pointer overflow-hidden group">
            <img
              className="w-full h-full object-contain"
              src={
                imagen
                  ? URL.createObjectURL(imagen)
                  : subir
              }
              alt="Vista previa"
            />
            {
              !imagen && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <img
                    src={subir} 
                    className="w-8 h-8"
                    alt="Subir imagen"
                  />
                </div>
              )
            }
          </div>
          <input
            id="imagen-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </label>
      </div>


      {/* Nombre del producto */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">NOMBRE PRODUCTO</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
          required
        />
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">TIPO</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
          required
        >
          <option value="">Seleccione tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
          ))}
        </select>
      </div>

      {/* Laboratorio */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">LABORATORIO</label>
        <select
          value={laboratorio}
          onChange={(e) => setLaboratorio(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
          required
        >
          <option value="">Seleccione laboratorio</option>
          {laboratorios.map((lab) => (
            <option key={lab._id} value={lab._id}>{lab.nombre}</option>
          ))}
        </select>
      </div>

      {/* Presentación */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">PRESENTACIÓN</label>
        <select
          value={presentacion}
          onChange={(e) => setPresentacion(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
          required
        >
          <option value="">Seleccione presentación</option>
          {presentaciones.map((pres) => (
            <option key={pres._id} value={pres._id}>{pres.nombre}</option>
          ))}
        </select>
      </div>

      {/* Costo Unitario */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">COSTO UNITARIO</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
            required
          />
          <span className="text-gray-700 font-semibold">{moneda}</span>
        </div>
      </div>

      {/* Información adicional */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">INFORMACIÓN ADICIONAL</label>
        <textarea
          value={infoAdicional}
          onChange={(e) => setInfoAdicional(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-10 pt-4">
        <BotonCancelar onClick={() => setNuevoProducto(false)} />
        <BotonConfirmar type="submit" />
      </div>
    </form>
  );
}

export default NuevoProductoForm;
