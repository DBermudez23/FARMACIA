import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import BotonEditar from '../atoms/BotonEditar';
import BotonEliminar from '../atoms/BotonEliminar';

function CartaGestionProducto({ infoProducto }) {

    const { moneda } = useContext(AppContext);



    return (
        <div className="w-64 h-[380px] p-4 rounded-xl border border-[#15D0EF] shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <img
                src={infoProducto.imagen}
                alt={infoProducto.producto}
                className="w-32 h-32 object-contain mx-auto"
            />

            <p className="text-center mt-2 font-semibold text-[#15D0EF] truncate w-full max-w-[220px]">
                {infoProducto.nombre}
            </p>

            <div className="flex flex-col items-start text-left mt-2 space-y-1 overflow-hidden">

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">ID PRODUCTO:</span> {infoProducto._id}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">LABORATORIO:</span> {infoProducto.laboratorio}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">TIPO:</span> {infoProducto.tipo}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    {infoProducto.presentacion}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    {moneda} {infoProducto.precio}
                </p>

                <div className="flex gap-3 justify-center items-center mt-4">
                    <BotonEditar onClick={() => setIsEdit(!isEdit)} />
                    <BotonEliminar />
                </div>
            </div>

        </div>
    )
}

export default CartaGestionProducto;
