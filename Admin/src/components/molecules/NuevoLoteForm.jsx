import BotonCancelar from "../atoms/BotonCancelar";
import BotonConfirmar from "../atoms/BotonConfirmar";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

function NuevoLoteForm({ setNuevoLote }) {
    const { moneda } = useContext(AppContext);
    const { backendURL,
         productos, obtenerProductos,
          proveedores, obtenerProveedores,
           aToken } = useContext(AdminContext);

    const [producto, setProducto] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fechaLlegada, setFechaLlegada] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [precio, setPrecio] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!producto || !proveedor || !cantidad || !fechaLlegada || !fechaVencimiento || !precio) {
            return toast.error('Todos los campos son obligatorios');
        }

        const formData = new FormData();
        formData.append('producto', producto);
        formData.append('proveedor', proveedor);
        formData.append('cantidad', cantidad);
        formData.append('fechaLlegada', fechaLlegada);
        formData.append('fechaVencimiento', fechaVencimiento);
        formData.append('precio', precio);

        try {

            const { data } = await axios.post(
                backendURL + '/api/admin/nuevo-lote',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        aToken
                    }
                }
            );

            if (data.success) {
                toast.success(data.message);
                setProducto('');
                setProveedor('');
                setCantidad('');
                setFechaLlegada('');
                setFechaVencimiento('');
                setPrecio('');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (aToken) {
            obtenerProductos();
        }
    }, [aToken]);

    useEffect(() => {
        if (aToken) {
            obtenerProveedores();
        }
    }, [aToken])

    return (
        <form 
            onSubmit={onSubmitHandler}
            className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 mb-12">

            <div className="text-center mb-4 text-lg font-semibold text-gray-800">
                <p>CADA NUEVO LOTE DEBE ESTAR ASOCIADO A UN PRODUCTO EXISTENTE</p>
            </div>

            {/* Producto (Previamente creado*/}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">PRODUCTO</label>
                <select
                    onChange={(e) => setProducto(e.target.value)}
                    value={producto}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                >
                    <option >Seleccione un producto</option>
                    {productos.map((prod) => (
                        <option key={prod._id} value={prod._id}>{prod.nombre}</option>
                    ))}
                </select>
            </div>

            {/* Proveedor */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">PROVEEDOR</label>
                <select
                    onChange={(e) => setProveedor(e.target.value)}
                    value={proveedor}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                >
                    <option >Seleccione un proveedor</option>
                    {proveedores.map((prov) => (
                        <option key={prov._id} value={prov._id}>{prov.nombre}</option>
                    ))}
                </select>
            </div>

            {/* Cantidad */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CANTIDAD</label>
                <input
                    onChange={(e) => setCantidad(e.target.value)}
                    type="number"
                    value={cantidad}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
            </div>

            {/* Fecha de recibido */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    FECHA DE INGRESO</label>
                <input
                    onChange={(e) => setFechaLlegada(e.target.value)}
                    type="date"
                    value={fechaLlegada}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
                <span className="text-gray-400 font-semibold">FORMATO: 01-ENE-2000</span>
            </div>

            {/* Fecha de vencimiento */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    FECHA DE VENCIMIENTO</label>
                <input
                    onChange={(e) => setFechaVencimiento(e.target.value)}
                    type="date"
                    value={fechaVencimiento}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                />
                <span className="text-gray-400 font-semibold">FORMATO: 01-ENE-2000</span>
            </div>

            {/* Costo Lote */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">COSTO LOTE</label>
                <div className="flex items-center gap-2">
                    <input
                        onChange={(e) => setPrecio(e.target.value)}
                        type="number"
                        value={precio}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15D0EF]"
                    />
                    <span className="text-gray-700 font-semibold">{moneda}</span>
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-10 pt-4">
                <BotonCancelar onClick={() => setNuevoLote(false)} />
                <BotonConfirmar type='submit'/>
            </div>

        </form>
    )
}

export default NuevoLoteForm
