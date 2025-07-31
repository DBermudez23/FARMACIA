import BarraBusqueda from "../components/atoms/BarraBusqueda";
import añadir from "../assets/añadir.svg";
import { useContext, useEffect, useState } from "react";
import NuevoProductoForm from "../components/molecules/NuevoProductoForm";
import CartaGestionProducto from "../components/molecules/CartaGestionProducto";
import { AdminContext } from "../context/AdminContext";

/*const productos = [
  {
    imagen: diclofenaco,
    _id: "1567",
    nombre: "CEFALEXINA 500mg",
    laboratorio: "GENFAR",
    presentacion: "CAJA X12 CÁPSULAS",
    precio: "3.30",
    tipo: "COMERCIAL"
  },
  {
    imagen: ibuprofeno,
    _id: "1568",
    nombre: "IBUPROFENO 400mg",
    laboratorio: "PROFAR",
    presentacion: "CAJA X12 TABLETAS",
    precio: "2.50",
    tipo: "COMERCIAL"
  },
  {
    imagen: loratadina,
    _id: "1569",
    nombre: "LORATADINA 10mg",
    laboratorio: "SANDOZ",
    presentacion: "CAJA X12 TABLETAS",
    precio: "4.00",
    tipo: "GENERICO"
  },
  {
    imagen: amoxicilina,
    _id: "1570",
    nombre: "AMOXICILINA 500mg",
    laboratorio: "GENFAR",
    presentacion: "CAJA X10 CÁPSULAS",
    precio: "3.60",
    tipo: "COMERCIAL"
  },
  {
    imagen: omeprazol,
    _id: "1571",
    nombre: "OMEPRAZOL 20mg",
    laboratorio: "MK",
    presentacion: "CAJA X14 CÁPSULAS",
    precio: "3.50",
    tipo: "GENERICO"
  },
  {
    imagen: salbutamol,
    _id: "1572",
    nombre: "SALBUTAMOL 100mcg",
    laboratorio: "TECNOFARMA",
    presentacion: "INHALADOR 200 DOSIS",
    precio: "6.80",
    tipo: "GENERICO"
  },
  {
    imagen: metmortfina,
    _id: "1573",
    nombre: "METFORMINA 850mg",
    laboratorio: "SYNTHESIS",
    presentacion: "CAJA X30 TABLETAS",
    precio: "5.20",
    tipo: "COMERCIAL"
  },
  {
    imagen: ibuprofeno,
    _id: "1574",
    nombre: "IBUPROFENO 200mg",
    laboratorio: "MK",
    presentacion: "CAJA X20 TABLETAS",
    precio: "2.10",
    tipo: "GENERICO"
  },
  {
    imagen: diclofenaco,
    _id: "1575",
    nombre: "DICLOFENACO 50mg",
    laboratorio: "GENFAR",
    presentacion: "CAJA X10 TABLETAS",
    precio: "2.40",
    tipo: "GENERICO"
  },
  {
    imagen: loratadina,
    _id: "1576",
    nombre: "LORATADINA 5mg Jarabe",
    laboratorio: "MK",
    presentacion: "FRASCO X120ml",
    precio: "7.00",
    tipo: "COMERCIAL"
  },
  {
    imagen: omeprazol,
    _id: "1577",
    nombre: "ESOMEPRAZOL 40mg",
    laboratorio: "FARMALIFE",
    presentacion: "CAJA X14 CÁPSULAS",
    precio: "4.60",
    tipo: "COMERCIAL"
  },
  {
    imagen: amoxicilina,
    _id: "1578",
    nombre: "CLAVULANATO + AMOXICILINA",
    laboratorio: "SANDOZ",
    presentacion: "CAJA X14 TABLETAS",
    precio: "9.50",
    tipo: "COMERCIAL"
  }
];*/



function GestionProducto() {

  const [nuevoProducto, setNuevoProducto] = useState(false);

  const {
    aToken,
    productos, obtenerProductos
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      obtenerProductos();
    }
  }, [aToken])

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
          <NuevoProductoForm setNuevoProducto={setNuevoProducto}/>
        )}


        {/* Lista de productos */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
          {productos.map((producto, i) => (
            <CartaGestionProducto key={i} infoProducto={producto} />
          ))}
        </div>



      </div>
    </div>
  )
}

export default GestionProducto
