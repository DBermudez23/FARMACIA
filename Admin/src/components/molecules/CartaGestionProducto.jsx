import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { AdminContext } from '../../context/AdminContext';
import BotonEditar from '../atoms/BotonEditar';
import BotonEliminar from '../atoms/BotonEliminar';
import BotonConfirmarTablas from '../atoms/BotonConfirmarTablas';
import BotonCancelarTablas from '../atoms/BotonCancelarTablas';
import subir from '../../assets/Upload.svg';
import { toast } from 'react-toastify';
import axios from 'axios';

function CartaGestionProducto({ infoProducto }) {

    const { moneda } = useContext(AppContext);

    const {
        backendURL,
        aToken,
        eliminarProducto,
        laboratorios,
        tipos,
        presentaciones
    } = useContext(AdminContext);


    const [editarProducto, setEditarProducto] = useState(false);
    const [nuevaImagen, setNuevaImagen] = useState(false);

    const [productoEditado, setProductoEditado] = useState({
        nombre: infoProducto.nombre || "",
        laboratorio: infoProducto.laboratorio?._id || "",
        tipo: infoProducto.tipo?._id || "",
        presentacion: infoProducto.presentacion?._id || "",
        precio: infoProducto.precio || 0,
    });


    const actualizarInfoProducto = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre', productoEditado.nombre);
            formData.append('presentacion', productoEditado.presentacion);
            formData.append('laboratorio', productoEditado.laboratorio);
            formData.append('precio', productoEditado.precio);
            formData.append('tipo', productoEditado.tipo);

            if (nuevaImagen) {
                formData.append('imagen', nuevaImagen);
            }

            const { data } = await axios.put(backendURL + `/api/admin/editar-producto/${infoProducto._id}`, formData, {
                headers: {
                    aToken
                }
            });

            if (data.success) {
                toast.success(data.message);
                setEditarProducto(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setProductoEditado({
            ...productoEditado,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="w-64 min-h-[380px] p-4 rounded-xl border border-[#15D0EF] shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            

            {/*IMAGEN */}
            {
                editarProducto ? (
                    <label htmlFor={`imagen-${infoProducto._id}`}>
                        <div className='inline-block relative cursor-pointer'>
                            <img
                                className='w-32 h-32 rounded opacity-75 object-contain mx-auto'
                                src={
                                    nuevaImagen
                                        ? URL.createObjectURL(nuevaImagen)
                                        : infoProducto.imagen
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
                            id={`imagen-${infoProducto._id}`}
                            hidden
                            accept="image/*"
                            onChange={(e) => setNuevaImagen(e.target.files[0])}
                        />
                    </label>
                ) : (
                    <img
                        src={infoProducto.imagen}
                        alt={infoProducto.nombre}
                        className="w-32 h-32 object-contain mx-auto"
                    />
                )
            }

            {/*NOMBRE DEL PRODUCTO*/}
            {
                editarProducto
                    ? (
                        <input
                            type="text"
                            value={infoProducto.nombre}
                            className="w-full border rounded px-3 py-1 mb-2"
                            onChange={handleChange}
                        />
                    )
                    : <p className="text-center mt-2 font-semibold text-[#15D0EF] truncate w-full max-w-[220px]">{infoProducto.nombre}</p>
            }

            <div className="flex flex-col items-start text-left mt-2 space-y-1 overflow-hidden">

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">ID PRODUCTO:</span> {infoProducto._id}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px]">
                    <span className="font-bold">LABORATORIO:</span>{" "}
                    {
                        editarProducto ? (
                            <select
                                name="laboratorio"
                                value={productoEditado.laboratorio}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full text-gray-800 mt-1"
                            >
                                {laboratorios.map((lab) => (
                                    <option key={lab._id} value={lab.nombre}>
                                        {lab.nombre}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            infoProducto.laboratorio
                        )
                    }
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px]">
                    <span className="font-bold">TIPO:</span>{" "}
                    {
                        editarProducto ? (
                            <select
                                name="tipo"
                                value={productoEditado.tipo}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full text-gray-800 mt-1"
                            >
                                {tipos.map((tipo) => (
                                    <option key={tipo._id} value={tipo.nombre}>
                                        {tipo.nombre}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            infoProducto.tipo
                        )
                    }
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px]">
                    <span className="font-bold">PRESENTACIÓN:</span>{" "}
                    {
                        editarProducto ? (
                            <select
                                name="presentacion"
                                value={productoEditado.presentacion}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full text-gray-800 mt-1"
                            >
                                {presentaciones.map((pres) => (
                                    <option key={pres._id} value={pres.nombre}>
                                        {pres.nombre}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            infoProducto.presentacion
                        )
                    }
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px]">
                    <span className="font-bold">PRECIO: </span>
                    {
                        editarProducto
                            ? (
                                <input
                                    type="number"
                                    name="precio"
                                    value={productoEditado.precio}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm w-full text-gray-800 mt-1"
                                />
                            ) : (
                                <>
                                    {moneda} {infoProducto.precio}
                                </>
                            )
                    }
                </p>


                {
                    editarProducto
                        ? (<div className="flex gap-3 justify-center items-center mt-4">
                            <BotonConfirmarTablas onClick={actualizarInfoProducto} />
                            <BotonCancelarTablas onClick={() => setEditarProducto(false)} />
                        </div>)
                        : (
                            <div className="flex gap-3 justify-center items-center mt-4">
                                <BotonEditar onClick={() => setEditarProducto(!editarProducto)} />
                                <BotonEliminar onClick={eliminarProducto}/>
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default CartaGestionProducto;
