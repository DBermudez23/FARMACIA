import BarraBusqueda from "../components/atoms/BarraBusqueda";
import CartaLote from "../components/molecules/CartaLote";
import { useState } from "react";
import amoxicilina from "../assets/amoxicilinaIMG.png";
import diclofenaco from "../assets/diclofenacoIMG.png";
import ibuprofeno from "../assets/ibuprofenoIMG.png";
import loratadina from "../assets/loratadinaIMG.png";
import omeprazol from "../assets/omeprazolIMG.png";
import salbutamol from "../assets/salbutamolIMG.png";
import metmortfina from "../assets/metmortfinaIMG.png";
import NuevoLoteForm from "../components/molecules/NuevoLoteForm";
import añadir from "../assets/añadir.svg";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";

const lotesVencimiento = [
  // ❌ YA VENCIDOS (antes del 2025-07-24)
  {
    imagen: salbutamol,
    idlote: "1567",
    producto: "CEFALEXINA 500mg",
    proveedor: "DISTRIBUIDORA DEL VALLE",
    presentacion: "CAJA X12 CÁPSULAS",
    laboratorio: "GENFAR",
    precioLote: "320.00",
    precioUnidad: "3.30",
    ingreso: "2025-01-20",
    vencimiento: "2025-06-15",
    stock: 60
  },
  {
    imagen: ibuprofeno,
    idlote: "1568",
    producto: "IBUPROFENO 400mg",
    proveedor: "LOGIFARMA",
    presentacion: "CAJA X20 TABLETAS",
    laboratorio: "MK",
    precioLote: "390.00",
    precioUnidad: "3.90",
    ingreso: "2025-02-05",
    vencimiento: "2025-07-01",
    stock: 80
  },
  {
    imagen: metmortfina,
    idlote: "1569",
    producto: "CIPROFLOXACINA 500mg",
    proveedor: "SALUD FARMA",
    presentacion: "CAJA X10 TABLETAS",
    laboratorio: "SYNTHESIS",
    precioLote: "410.00",
    precioUnidad: "4.10",
    ingreso: "2025-01-10",
    vencimiento: "2025-06-25",
    stock: 75
  },
  {
    imagen: amoxicilina,
    idlote: "1562",
    producto: "AMOXICILINA 500mg",
    proveedor: "DISTRIBUIDORA ANDINA",
    presentacion: "CAJA X10 CÁPSULAS",
    laboratorio: "GENFAR",
    precioLote: "326.34",
    precioUnidad: "3.60",
    ingreso: "2024-12-10",
    vencimiento: "2025-01-10",
    stock: 109
  },
  // ✅ POR VENCER (futuro a partir de hoy)
  {
    imagen: omeprazol,
    idlote: "1563",
    producto: "NAPROXENO 250mg",
    proveedor: "FARMACENTRO",
    presentacion: "CAJA X20 TABLETAS",
    laboratorio: "SYNTHESIS",
    precioLote: "480.50",
    precioUnidad: "5.20",
    ingreso: "2025-04-15",
    vencimiento: "2025-08-25",
    stock: 150
  },
  {
    imagen: omeprazol,
    idlote: "1564",
    producto: "LORATADINA 10mg",
    proveedor: "DROMAX",
    presentacion: "CAJA X10 TABLETAS",
    laboratorio: "MK",
    precioLote: "210.00",
    precioUnidad: "2.10",
    ingreso: "2025-05-01",
    vencimiento: "2025-09-15",
    stock: 95
  },
  {
    imagen: omeprazol,
    idlote: "1565",
    producto: "OMEPRAZOL 20mg",
    proveedor: "FARMASUMINISTROS",
    presentacion: "CAJA X14 CÁPSULAS",
    laboratorio: "GENFAR",
    precioLote: "300.00",
    precioUnidad: "3.50",
    ingreso: "2025-03-10",
    vencimiento: "2025-09-01",
    stock: 120
  },
  {
    imagen: omeprazol,
    idlote: "1566",
    producto: "PARACETAMOL 500mg",
    proveedor: "PHARMA EXPRESS",
    presentacion: "CAJA X16 TABLETAS",
    laboratorio: "SYNTHESIS",
    precioLote: "275.80",
    precioUnidad: "2.75",
    ingreso: "2025-06-01",
    vencimiento: "2025-09-15",
    stock: 200
  },
];

/*const lotes = [
  {
    imagen: omeprazol,
    idlote: "1564",
    producto: "LORATADINA 10mg",
    proveedor: "DROMAX",
    presentacion: "CAJA X10 TABLETAS",
    laboratorio: "MK",
    precioLote: "210.00",
    precioUnidad: "2.10",
    ingreso: "2025-05-01",
    vencimiento: "2025-12-15",
    stock: 95
  },
  {
    imagen: omeprazol,
    idlote: "1565",
    producto: "OMEPRAZOL 20mg",
    proveedor: "FARMASUMINISTROS",
    presentacion: "CAJA X14 CÁPSULAS",
    laboratorio: "GENFAR",
    precioLote: "300.00",
    precioUnidad: "3.50",
    ingreso: "2025-03-10",
    vencimiento: "2025-10-01",
    stock: 120
  },
  {
    imagen: omeprazol,
    idlote: "1566",
    producto: "PARACETAMOL 500mg",
    proveedor: "PHARMA EXPRESS",
    presentacion: "CAJA X16 TABLETAS",
    laboratorio: "SYNTHESIS",
    precioLote: "275.80",
    precioUnidad: "2.75",
    ingreso: "2025-06-01",
    vencimiento: "2025-10-15",
    stock: 200
  },
  {
    imagen: omeprazol,
    idlote: "1567",
    producto: "NAPROXENO 250mg",
    proveedor: "MEDICALL",
    presentacion: "CAJA X20 TABLETAS",
    laboratorio: "TECNOFARMA",
    precioLote: "220.00",
    precioUnidad: "2.20",
    ingreso: "2025-05-15",
    vencimiento: "2025-10-10",
    stock: 85
  },
  {
    imagen: omeprazol,
    idlote: "1568",
    producto: "ACETAMINOFÉN 500mg",
    proveedor: "FARMARED",
    presentacion: "CAJA X30 TABLETAS",
    laboratorio: "GENFAR",
    precioLote: "330.00",
    precioUnidad: "3.30",
    ingreso: "2025-04-01",
    vencimiento: "2025-12-20",
    stock: 140
  },
  {
    imagen: omeprazol,
    idlote: "1569",
    producto: "IBUPROFENO 200mg",
    proveedor: "SALUD Y VIDA",
    presentacion: "CAJA X20 TABLETAS",
    laboratorio: "MK",
    precioLote: "280.00",
    precioUnidad: "2.80",
    ingreso: "2025-03-05",
    vencimiento: "2025-11-30",
    stock: 160
  },
  {
    imagen: omeprazol,
    idlote: "1570",
    producto: "RANITIDINA 150mg",
    proveedor: "PHARMA EXPRESS",
    presentacion: "CAJA X12 TABLETAS",
    laboratorio: "TECNOFARMA",
    precioLote: "190.00",
    precioUnidad: "1.90",
    ingreso: "2025-06-12",
    vencimiento: "2025-10-15",
    stock: 70
  },
  {
    imagen: omeprazol,
    idlote: "1571",
    producto: "DICLOFENACO 50mg",
    proveedor: "MEDICALL",
    presentacion: "CAJA X10 TABLETAS",
    laboratorio: "GENFAR",
    precioLote: "240.00",
    precioUnidad: "2.40",
    ingreso: "2025-07-01",
    vencimiento: "2025-11-20",
    stock: 100
  }
]; */



function GestionLotes() {

  const {lotes, obtenerLotes, aToken} = useContext(AdminContext);

  const [lotesRiesgo, setLotesRiesgo] = useState(false);
  const [verTodo, setVerTodo] = useState(false);
  const [nuevoLote, setNuevoLote] = useState(false);

  const lotesMostrados = verTodo ? lotesVencimiento : lotesVencimiento.slice(0, 2);

  useEffect(() => {
    if (aToken) {
      obtenerLotes();
    }
  }, [aToken])

  return (
    <div className='w-full flex flex-wrap justify-center'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          BUSCAR LOTE
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <button
          onClick={() => {
            setLotesRiesgo(prev => !prev);
          }}
          className="px-6 py-2 bg-[#FFB800] text-white rounded-full font-semibold shadow hover:bg-[#FF9900] transition duration-300 mb-6 cursor-pointer"
        >
          LOTES EN RIESGO
        </button>

        {lotesRiesgo && (
          <>
            <h2 id="riesgo" className="text-sm sm:text-md text-start mb-4">
              LOTES EN RIESGO POR VENCIMIENTO:
            </h2>

            <div className="w-full flex flex-col items-center gap-6 mt-6">
              {/* Cartas de lotes vencidos*/}
              <div className="w-full flex flex-col items-center gap-6">
                {lotesMostrados.map((lote, i) => (
                  <CartaLote key={i} infoLote={lote} />
                ))}
              </div>


              {lotesVencimiento.length > 2 && (
                <button
                  onClick={() => setVerTodo(prev => !prev)}
                  className="px-6 py-2 border border-[#15D0EF] text-[#15D0EF] rounded-full text-sm hover:bg-[#15D0EF] hover:text-white transition duration-300 cursor-pointer"
                >
                  {verTodo ? "VER MENOS" : "VER MÁS"}
                </button>
              )}
            </div></>

        )}


        <div className="flex items-center gap-4 mt-6 mb-10 cursor-pointer " onClick={() => setNuevoLote(!nuevoLote)}>
          <img src={añadir} alt="Nuevo Lote" />
          <p className="text-[#15D0EF]">NUEVO LOTE</p>
        </div>

        {nuevoLote && (
          <NuevoLoteForm setNuevoLote={setNuevoLote}/>
        )}

        {/* Cartas de lotes sin vencer */}
        <div className="w-full flex flex-col items-center gap-6 my-5">
          {lotes.map((lote, i) => (
            <CartaLote key={i} infoLote={lote} />
          ))}
        </div>


      </div>
    </div>
  )
}

export default GestionLotes
