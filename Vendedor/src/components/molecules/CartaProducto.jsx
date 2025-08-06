//import { useContext } from "react";
import BotonCarrito from "../atoms/BotonCarrito";
//import { AppContext } from "../../context/AppContext";
//import { AdminContext } from "../../context/AdminContext";
//import { useEffect } from "react";


function CartaProducto({ infoProducto }) {
    
    /*const {
        moneda,
    } = useContext(AppContext);

    const {
        laboratorios, obtenerLaboratorios,
        presentaciones, obtenerPresentaciones,
        tipos, obtenerTipos,
        aToken
    } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            obtenerLaboratorios();
            obtenerPresentaciones();
            obtenerTipos();
        }
    })*/

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

            <div className="flex flex-col items-start text-left mt-1 space-y-1 overflow-hidden">

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">ID LOTE:</span> {infoProducto._id.slice(0,6)}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">LABORATORIO:</span> 
                    {laboratorios.find((lab) => lab._id === infoProducto.laboratorio)?.nombre || 'No disponible'}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">TIPO:</span> 
                    {tipos.find((tipo) => tipo._id === infoProducto.tipo)?.nombre || 'No disponible'}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">PRESENTACIÓN:</span>
                    {presentaciones.find((pres) => pres._id === infoProducto.presentacion)?.nombre || 'No disponible'}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600 mt-2">
                    {moneda} {infoProducto.precio}
                </p>
                <BotonCarrito />
            </div>
        </div>

    );
}


export default CartaProducto;
