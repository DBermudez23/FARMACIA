import { useState } from 'react';
import { assetVentas } from "../assets/assets";
import VentasDia from '../components/organism/VentasDia';
import VentasSemana from '../components/organism/VentasSemana';
import VentasMes from '../components/organism/VentasMes';

const ventasDia = [
  {
    _id : '3564',
    clienteNombre : 'Esteban Beltran',
    clienteDNI : '1045669895',
    vendedor : {
      _id : '5697',
      nombre : 'Jhon Arias'
    },
    fecha: '2025-JUL-29',
    hora: '19:45',
    productos : [
      {
        _id: '3567',
        nombre: 'AMOXICILINA 500mg'
      },
    ],

  }
]


function PanelVentas() {


  const [mostrarVentasDia, setMostrarVentasDia] = useState(true);
  const [mostrarVentasSemana, setMostrarVentasSemana] = useState(false);
  const [mostrarVentasMes, setMostrarVentasMes] = useState(false);

  return (
    <div className='w-full flex flex-wrap justify-center overflow-y-scroll'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <div className="w-full flex flex-wrap gap-20 justify-center my-4">

          <div
            onClick={() => {
              setMostrarVentasDia(true);
              setMostrarVentasSemana(false);
              setMostrarVentasMes(false);
            }}
            className={`w-[290px] h-[250px] bg-[#5D94B9] rounded-md shadow-md flex flex-col justify-center items-center cursor-pointer transition-transform duration-300
            ${mostrarVentasDia ? "scale-105 border-4 border-cyan-600 shadow shadow-lg" : "hover:scale-105 border-4 border-transparent hover:border-cyan-600"}`}
          >
            <h3 className="text-white font-bold text-center mb-2">VENTAS DEL DÍA</h3>
            <img src={assetVentas.ventasDia} alt="Ventas del Día" className="w-40 h-40" />

          </div>

          <div
            onClick={() => {
              setMostrarVentasDia(false);
              setMostrarVentasSemana(true);
              setMostrarVentasMes(false);
            }}
            className={`w-[290px] h-[250px] bg-[#FEBA5A] rounded-md shadow-md flex flex-col justify-center items-center cursor-pointer transition-transform duration-300
            ${mostrarVentasSemana ? "scale-105 border-4 border-cyan-600 shadow shadow-lg" : "hover:scale-105 border-4 border-transparent hover:border-cyan-600"}`}
          >
            <h3 className="text-white font-bold text-center mb-2">VENTAS DE LA SEMANA</h3>
            <img src={assetVentas.ventasSemana} alt="Ventas de la Semana" className="w-40 h-40" />

          </div>

          <div
            onClick={() => {
              setMostrarVentasDia(false);
              setMostrarVentasSemana(false);
              setMostrarVentasMes(true);
            }}
            className={`w-[290px] h-[250px] bg-[#5D94B9] rounded-md shadow-md flex flex-col justify-center items-center cursor-pointer transition-transform duration-300
            ${mostrarVentasMes ? "scale-105 border-4 border-cyan-600 shadow shadow-lg" : "hover:scale-105 border-4 border-transparent hover:border-cyan-600"}`}
          >
            <h3 className="text-white font-bold text-center mb-2">VENTAS DEL MES</h3>
            <img src={assetVentas.ventasMes} alt="Ventas del Mes" className="w-40 h-40" />
          </div>


          <div className="w-full flex flex-col items-center my-10">
            {mostrarVentasDia && (
              <VentasDia ventas={ventasDia} />
            )}
            {mostrarVentasSemana && (
              <VentasSemana ventas={ventasSemana} />
            )}
            {mostrarVentasMes && (
              <VentasMes ventas={ventasMes} />
            )}
          </div>

        </div>


      </div>
    </div>
  )
}

export default PanelVentas
