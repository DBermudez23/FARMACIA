import BarraBusqueda from "../components/atoms/BarraBusqueda";
import añadir from "../assets/añadir.svg";
import { useState } from "react";
import NuevoProductoForm from "../components/organism/NuevoProductoForm";

function GestionProducto() {

  const [nuevoProducto, setNuevoProducto] = useState(false);

  return (
    <div className='w-full flex flex-wrap justify-center overflow-y-scroll'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          BUSCAR PRODUCTO
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <div className="flex items-center gap-4 mb-6 cursor-pointer " onClick={() => setNuevoProducto(!nuevoProducto)}>
          <img src={añadir} alt="Nuevo Producto" />
          <p className="text-[#15D0EF]">NUEVO PRODUCTO</p>
        </div>

        {nuevoProducto && (
          <NuevoProductoForm />
        )}


      </div>
    </div>
  )
}

export default GestionProducto
