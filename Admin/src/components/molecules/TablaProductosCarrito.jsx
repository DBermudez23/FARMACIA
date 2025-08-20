import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import BotonCancelar from "../atoms/BotonCancelar";
import BotonConfirmar from "../atoms/BotonConfirmar";

const TablaCarrito = ({ carrito = [] }) => {

    const {
        aToken,
        productos, obtenerProductos,
        proveedores, obtenerProveedores
    } = useContext(AdminContext);

    const nombreProveedor = (item) => {
        return proveedores.find(prov => prov._id === item.proveedor)?.nombre;
    }

    // Agrupa el carrito por (productoId + loteId) y cuenta repeticiones
    const agruparCarritoPorLote = (carrito, catalogoProductos) => {
        const map = new Map();

        carrito.forEach((item) => {
            // clave única por lote (y producto por si acaso)
            const key = `${item.producto}-${item._id}`;

            const prodInfo = catalogoProductos.find(p => p._id === item.producto);

            if (map.has(key)) {
                map.get(key).cantidadEnCarrito += 1;
            } else {
                map.set(key, {
                    loteId: item._id,
                    productoId: item.producto,
                    proveedorId: item.proveedor,
                    fechaVencimiento: item.fechaVencimiento,
                    // precio unitario desde el catálogo (precio de venta)
                    precioUnitario: prodInfo?.precio ?? 0,
                    nombreProducto: prodInfo?.nombre ?? "",
                    cantidadEnCarrito: 1,
                });
            }
        });

        return Array.from(map.values());
    };

    // Calcula el total de la venta a partir del carrito agrupado
    const calcularTotalVenta = (carritoAgrupado) => {
        return carritoAgrupado.reduce((total, item) => {
            return total + (item.precioUnitario * item.cantidadEnCarrito);
        }, 0);
    };


    useEffect(() => {
        if (aToken) {
            obtenerProductos();
            obtenerProveedores();
        }
    }, [aToken])

    if (!Array.isArray(carrito) || carrito.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No hay productos en el carrito
            </div>
        );
    }

    const filas = agruparCarritoPorLote(carrito, productos);
    const totalVenta = calcularTotalVenta(filas);

    return (
        <>
            <div className="overflow-hidden rounded-xl border">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-white text-black text-sm text-center">
                            <th className="border-r px-4 py-2 rounded-tl-xl">CÓDIGO LOTE</th>
                            <th className="border-r px-4 py-2">PROVEEDOR</th>                        
                            <th className="border-r px-4 py-2">PRODUCTO</th>
                            <th className="border-r px-4 py-2">CANTIDAD</th>
                            <th className="border-r px-4 py-2">VENCIMIENTO</th>
                            <th className="px-4 py-2 rounded-tr-xl">PRECIO UNITARIO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((fila, idx) => {
                            const isLast = idx === filas.length - 1;

                            return (
                                <tr key={fila.loteId} className="text-center text-sm bg-gray-300">
                                    <td className={`border-r border-t px-2 py-1 ${isLast ? 'rounded-bl-xl' : ''}`}>
                                        {fila.loteId?.slice(0, 6)}
                                    </td>
                                    <td className="border-r border-t px-2 py-1">
                                        {nombreProveedor({ proveedor: fila.proveedorId })}
                                    </td>
                                    <td className="border-r border-t px-2 py-1">
                                        {fila.nombreProducto}
                                    </td>
                                    <td className="border-r border-t px-2 py-1">
                                        {fila.cantidadEnCarrito}
                                    </td>
                                    <td className="border-r border-t px-2 py-1">
                                        {new Date(fila.fechaVencimiento).toLocaleDateString()}
                                    </td>
                                    <td className={`border-t px-2 py-1 ${isLast ? 'rounded-br-xl' : ''}`}>
                                        ${fila.precioUnitario}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-10 pt-4 mt-6">
                <BotonCancelar />
                <BotonConfirmar />
                <div className="text-right">
                    <h2 className="font-semibold">TOTAL VENTA:</h2>
                    <p className="text-lg text-green-500">$ {totalVenta}</p>
                </div>
            </div>
        </>
    );
};

export default TablaCarrito;
