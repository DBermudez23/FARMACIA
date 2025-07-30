import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import BotonEditar from '../atoms/BotonEditar';
import BotonEliminar from '../atoms/BotonEliminar';
import BotonConfirmarTablas from '../atoms/BotonConfirmarTablas';
import BotonCancelarTablas from '../atoms/BotonCancelarTablas';

const laboratorios = [
    { id: 1, nombre: 'Laboratorio A' },
    { id: 2, nombre: 'Laboratorio B' },
    { id: 3, nombre: 'Laboratorio C' },
]

const presentaciones = [
    { id: 1, nombre: 'Tabletas' },
    { id: 2, nombre: 'Jarabe' },
    { id: 3, nombre: 'Crema' },
];


function CartaGestionProducto({ infoProducto }) {

    const [editarProducto, setEditarProducto] = useState(false);
    const [productoEditado, setProductoEditado] = useState({
        laboratorio: infoProducto.laboratorio || "",
        tipo: infoProducto.tipo || "",
        presentacion: infoProducto.presentacion || "",
        precio: infoProducto.precio || 0,
    });


    const { moneda } = useContext(AppContext);



    const handleChange = (e) => {
        setProductoEditado({
            ...productoEditado,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="w-64 min-h-[380px] p-4 rounded-xl border border-[#15D0EF] shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <img
                src={infoProducto.imagen}
                alt={infoProducto.producto}
                className="w-32 h-32 object-contain mx-auto"
            />

            {
                editarProducto
                    ? (
                        <input
                            type="text"
                            value={infoProducto.nombre}
                            className="w-full border rounded px-3 py-1 mb-2"
                            onChange={(e) => infoProducto.nombre = e.target.value}
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
                                    <option key={lab.id} value={lab.nombre}>
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
                                <option value="Medicamento">Medicamento</option>
                                <option value="Insumo">Insumo</option>
                                <option value="Otro">Otro</option>
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
                                    <option key={pres.id} value={pres.nombre}>
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
                            <BotonConfirmarTablas onClick={() => setEditarProducto(false)} />
                            <BotonCancelarTablas onClick={() => setEditarProducto(false)} />
                        </div>)
                        : (
                            <div className="flex gap-3 justify-center items-center mt-4">
                                <BotonEditar onClick={() => setEditarProducto(!editarProducto)} />
                                <BotonEliminar />
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default CartaGestionProducto;
