import BarraBusqueda from "../components/atoms/BarraBusqueda";
import CartaProducto from "../components/molecules/CartaProducto";
import TablaMedicamentos from "../components/organism/TablaMedicamentos";
import amoxicilina from "../assets/amoxicilinaIMG.png";
import diclofenaco from "../assets/diclofenacoIMG.png";
import ibuprofeno from "../assets/ibuprofenoIMG.png";
import loratadina from "../assets/loratadinaIMG.png";
import omeprazol from "../assets/omeprazolIMG.png";
import salbutamol from "../assets/salbutamolIMG.png";
import metmortfina from "../assets/metmortfinaIMG.png";

const medicamentos = [
  {
    codigo: "0156",
    producto: "AMOXICILINA 500mg",
    cantidad: "120 CAJAS",
    laboratorio: "GENFAR",
    presentacion: "CAJA X 10 CÁPSULAS",
    proveedor: "DISTRIBUIDORA ANDINA",
    vencimiento: "2024-08-10",
  },
  {
    codigo: "0327",
    producto: "IBUPROFENO 400mg",
    cantidad: "100 CAJAS",
    laboratorio: "SYNTHESIS",
    presentacion: "CAJA X 20 TABLETAS",
    proveedor: "FARMASUMINISTROS",
    vencimiento: "2025-01-10",
  },
  {
    codigo: "1785",
    producto: "SALBUTAMOL 100mcg",
    cantidad: "30 UNIDADES",
    laboratorio: "BAYER",
    presentacion: "INHALADOR",
    proveedor: "INSUMOS DEL CAFÉ",
    vencimiento: "2025-08-18",
  },
  {
    codigo: "7432",
    producto: "OMEPRAZOL 20mg",
    cantidad: "75 CAJAS",
    laboratorio: "ABBOT",
    presentacion: "CAJA X 14 CÁPSULAS",
    proveedor: "DISMÉDICA",
    vencimiento: "2025-10-30",
  },
  {
    codigo: "1975",
    producto: "LORATADINA 10mg",
    cantidad: "60 CAJAS",
    laboratorio: "TECNOQUÍMICAS",
    presentacion: "CAJA X 10 TABLETAS",
    proveedor: "DROGUERÍA TOTAL",
    vencimiento: "2025-12-15",
  },
  {
    codigo: "1258",
    producto: "DICLOFENACO 50mg",
    cantidad: "65 CAJAS",
    laboratorio: "BIOGÉNESIS",
    presentacion: "CAJA X 10 TABLETAS",
    proveedor: "FARMAEXPRESS",
    vencimiento: "2025-11-25",
  },
  {
    codigo: "9866",
    producto: "ENALAPRIL 10mg",
    cantidad: "80 CAJAS",
    laboratorio: "GENFAR",
    presentacion: "CAJA X 20 TABLETAS",
    proveedor: "MEDIPHARMA LTDA",
    vencimiento: "2025-09-12",
  }

];

const productos = [
  {
    _id: "2345",
    producto: "AMOXICILINA 500mg",
    imagen: amoxicilina,
    cantidad: "100 CAJAS",
    presentacion: "CAJA X 10 CÁPSULAS",
    proveedor: "DISTRIFARMA",
    precio: "3.60"
  },
  {
    _id: "0327",
    producto: "IBUPROFENO 400mg",
    imagen: ibuprofeno,
    cantidad: "100 CAJAS",
    presentacion: "CAJA X 20 TABLETAS",
    proveedor: "FARMASUMINISTROS",
    precio: "1.40"
  },
  {
    _id: "1975",
    producto: "LORATADINA 10mg",
    imagen: loratadina,
    cantidad: "60 CAJAS",
    presentacion: "CAJA X 10 TABLETAS",
    proveedor: "DROGUERÍA TOTAL",
    precio: "7.40"
  },
  {
    _id: "4598",
    producto: "METFORMINA 850mg",
    imagen: metmortfina,
    cantidad: "90 CAJAS",
    presentacion: "CAJA X 30 TABLETAS",
    proveedor: "INTERPHARMA",
    precio: "28.90"
  },
  {
    _id: "7432",
    producto: "OMEPRAZOL 20mg",
    imagen: omeprazol,
    cantidad: "75 CAJAS",
    presentacion: "CAJA X 14 CÁPSULAS",
    proveedor: "DISMÉDICA",
    precio: "5.60"
  },
  {
    _id: "1258",
    producto: "DICLOFENACO 50mg",
    imagen: diclofenaco,
    cantidad: "65 CAJAS",
    presentacion: "CAJA X 10 TABLETAS",
    proveedor: "FARMAEXPRESS",
    precio: "2.40"
  },
  {
    _id: "1785",
    producto: "SALBUTAMOL 100mcg",
    imagen: salbutamol,
    cantidad: "30 UNIDADES",
    presentacion: "INHALADOR",
    proveedor: "INSUMOS DEL CAFÉ",
    precio: "10.00" // No se muestra precio en la imagen
  },
  {
    _id: "9866",
    producto: "ENALAPRIL 10mg",
    imagen: amoxicilina,
    cantidad: "80 CAJAS",
    presentacion: "CAJA X 20 TABLETAS",
    proveedor: "MEDIPHARMA LTDA",
    precio: "3.60"
  }
];  


function PanelPrincipal() {
  return (
    <div className="w-full flex flex-wrap justify-center overflow-y-scroll">
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <h2 className="text-sm sm:text-md text-start mb-4">
          CATÁLOGO
        </h2>

        <div className="flex justify-center mb-8">
          <BarraBusqueda />
        </div>

        <h2 className="text-sm sm:text-md text-start mb-4">
          LOTES EN RIESGO POR VENCIMIENTO:
        </h2>

        <div className="overflow-x-auto">
          <TablaMedicamentos medicamentos={medicamentos} />
        </div>

        {/* PRODUCTOS */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {productos.map((producto, i) => (
            <CartaProducto key={i} infoProducto={producto} />
          ))}
        </div>


      </div>


    </div>
  )
}

export default PanelPrincipal
