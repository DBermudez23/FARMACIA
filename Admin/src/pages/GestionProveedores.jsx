import { useState } from 'react';
import BarraBusqueda from '../components/atoms/BarraBusqueda';
import añadir from '../assets/añadir.svg';
import NuevoProveedorForm from '../components/molecules/NuevoProveedorForm';
import TablaProveedores from '../components/molecules/TablaProveedores';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useEffect } from 'react';

function GestionProveedores() {
  const [nuevoProveedor, setNuevoProveedor] = useState(false);

  const {
    aToken,
    proveedores, obtenerProveedores
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      obtenerProveedores();
    }
  }, [aToken])

  //console.log(proveedores)

  return (
    <div className='w-full flex flex-wrap justify-center overflow-y-scroll'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          BUSCAR PROVEEDOR
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevoProveedor(!nuevoProveedor)}>
          <img src={añadir} alt="Nuevo Lote" />
          <p className="text-[#15D0EF]">NUEVO PROVEEDOR</p>
        </div>

        {nuevoProveedor && <NuevoProveedorForm setNuevoProveedor={setNuevoProveedor}/>}

        <div className='bg-white rounded-lg shadow-md p-4 sm:p-6 my-10'>
          <TablaProveedores proveedores={proveedores} />
        </div>


      </div>
    </div>
  )
}

export default GestionProveedores
