import BotonCarrito from "../atoms/BotonCarrito";


function CartaProducto({ infoProducto }) {
    const simboloDinero = '$';

    return (
        <div className="w-64 h-[380px] p-4 rounded-xl border border-[#15D0EF] shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <img
                src={infoProducto.imagen}
                alt={infoProducto.producto}
                className="w-32 h-32 object-contain mx-auto"
            />

            <p className="text-center mt-2 font-semibold text-[#15D0EF] truncate w-full max-w-[220px]">
                {infoProducto.producto}
            </p>

            <div className="flex flex-col items-start text-left mt-2 space-y-1 overflow-hidden">

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">ID LOTE:</span> {infoProducto._id}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    <span className="font-bold">PROVEEDOR:</span> {infoProducto.proveedor}
                </p>

                <p className="text-sm text-gray-600 w-full max-w-[220px] truncate">
                    {infoProducto.presentacion}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600 mt-2">
                    {simboloDinero} {infoProducto.precio}
                </p>
                <BotonCarrito />
            </div>
        </div>

    );
}


export default CartaProducto;
