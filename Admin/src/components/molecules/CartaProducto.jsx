import { useContext } from "react";
import BotonCarrito from "../atoms/BotonCarrito";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { toast } from "react-toastify";


function CartaProducto({ infoProducto }) {

    /*
    LO QUE SE RENDERIZA EN ESTE COMPONENTE SON LOS PRODUCTOS EXISTENTES EN EL INVENTARIO
    ES DECIR QUE EXISTA UN LOTE ASOCIADO A DICHO PRODUCTO QUE CUMPLA CON:

        - PRODUCTOS DISPONIBLES (STOCK).
        - PRODUCTOS QUE NO HAYAN PASADO SU FECHA DE VENCIMIENTO (LOS QUE ESTAN CON RIESGO DE VENCER DEBEN SER PRIORIDAD).

    */

    const {
        moneda,
        carritoCompras, setCarritoCompras
    } = useContext(AppContext);

    const {
        laboratorios, obtenerLaboratorios,
        presentaciones, obtenerPresentaciones,
        tipos, obtenerTipos,
        productos, obtenerProductos,
        aToken
    } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            obtenerLaboratorios();
            obtenerPresentaciones();
            obtenerTipos();
            obtenerProductos();
        }
    }, [aToken])
    useEffect(() => {
        console.log(carritoCompras)
    }, [carritoCompras])

    const añadirAlCarrito = (productoSeleccionado) => {
        try {
            setCarritoCompras((prev) => [...prev, productoSeleccionado]);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-64 h-[380px] p-4 rounded-xl border border-[#15D0EF] shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            {/* IMAGEN */}
            <img
                src={productos.find(prod => prod._id === infoProducto.producto)?.imagen}
                alt={productos.find(prod => prod._id === infoProducto.producto)?.nombre}
                className="w-32 h-32 object-contain mx-auto"
            />

            {/* NOMBRE */}
            <p className="text-center mt-2 font-semibold text-[#15D0EF] truncate w-full max-w-[220px]">
                {productos.find(prod => prod._id === infoProducto.producto)?.nombre}
            </p>

            <div className="flex flex-col items-start text-left mt-1 space-y-1 overflow-hidden">

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">ID LOTE: </span>{infoProducto._id.slice(0, 6)}
                </p>

                {/* LABORATORIO */}
                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">LABORATORIO: </span>
                    {laboratorios.find(
                        lab => lab._id === productos.find(prod => prod._id === infoProducto.producto)?.laboratorio
                    )?.nombre}
                </p>

                {/* TIPO */}
                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">TIPO: </span>
                    {tipos.find(
                        tipo => tipo._id === productos.find(prod => prod._id === infoProducto.producto)?.tipo
                    )?.nombre}
                </p>

                {/* PRESENTACIÓN */}
                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">PRESENTACIÓN: </span>
                    {presentaciones.find(
                        pres => pres._id === productos.find(prod => prod._id === infoProducto.producto)?.presentacion
                    )?.nombre}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600 mt-2">
                    {moneda} {productos.find(prod => prod._id === infoProducto.producto)?.precio}
                </p>
                <BotonCarrito onClick={() => añadirAlCarrito(infoProducto)} />

            </div>
        </div>

    );
}


export default CartaProducto;
