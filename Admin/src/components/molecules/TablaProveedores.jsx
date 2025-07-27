import BotonEditarMini from "../atoms/BotonEditarMini";
import BotonEliminarMini from "../atoms/BotonEliminarMini";

function TablaProveedores({ proveedores }) {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white text-black text-sm text-center">
              <th className="border-r px-4 py-2 rounded-tl-xl">ID PROVEEDOR</th>
              <th className="border-r px-4 py-2">TELÉFONO</th>
              <th className="border-r px-4 py-2">NOMBRE</th>
              <th className="border-r px-4 py-2">DIRECCIÓN</th>
              <th className="px-4 py-2 rounded-tr-xl">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((prov, idx) => {
              const isLast = idx === proveedores.length - 1;

              return (
                <tr
                  key={idx}
                  className="bg-gray-300 text-center text-sm"
                >
                  <td className={`border-r border-t px-2 py-2 ${isLast ? 'rounded-bl-xl' : ''}`}>{prov.codigo}</td>
                  <td className="border-r border-t px-2 py-2">{prov.telefono}</td>
                  <td className="border-r border-t px-2 py-2">{prov.nombre}</td>
                  <td className="border-r border-t px-2 py-2">{prov.direccion}</td>
                  <td className="border-t px-2 py-2">
                    <div className="flex justify-center items-center gap-2">
                      <BotonEditarMini />
                      <BotonEliminarMini />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaProveedores;
