import { useState } from "react";
import { assetsAtributos } from "../assets/assets";
import GestionLaboratorios from "../components/organism/GestionLaboratorios";
import GestionPresentaciones from "../components/organism/GestionPresentaciones";
import GestionTipos from "../components/organism/GestionTipos";

const laboratorios = [
  { codigo: "LAB001", nombre: "Laboratorio A", direccion: "Calle Falsa 123", telefono: "123456789", mail: "labA@example.com" },
  { codigo: "LAB002", nombre: "Laboratorio B", direccion: "Avenida Siempre Viva 456", telefono: "987654321", mail: "labB@example.com" },
  { codigo: "LAB003", nombre: "Laboratorio C", direccion: "Boulevard de los Sueños Rotos 789", telefono: "456123789", mail: "labC@example.com" }
]

const presentaciones = [
  { codigo: "PRES001", nombre: "Tabletas", descripcion: "Tabletas de 500mg" },
  { codigo: "PRES002", nombre: "Jarabe", descripcion: "Jarabe de 200ml" },
  { codigo: "PRES003", nombre: "Inyectable", descripcion: "Solución inyectable de 10ml" }
];

const tipos =[
  {tipo : "COMERCIAL"},
  {tipo : "GENÉRICO"},
  {tipo : "OTC"}
]


function GestionAtributos() {
  const [mostrarLaboratorios, setMostrarLaboratorios] = useState(true);
  const [mostrarPresentaciones, setMostrarPresentaciones] = useState(false);
  const [mostrarTipos, setMostrarTipos] = useState(false);

  return (
    <div className='w-full flex flex-wrap justify-center overflow-y-scroll'>
      <div className="max-w-6xl w-full px-4 sm:px-8 py-8">

        <div className="w-full flex flex-wrap gap-20 justify-center my-4">

          <div
            onClick={() => {
              setMostrarLaboratorios(true);
              setMostrarPresentaciones(false);
              setMostrarTipos(false);
            }}
            className={`w-[290px] h-[250px] bg-[#5D94B9] rounded-md shadow-md flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 
              ${mostrarLaboratorios ? "scale-105 border-4 border-cyan-600 shadow shadow-lg" : "hover:scale-105 border-4 border-transparent hover:border-cyan-600"}`}
          >
            <h3 className="text-white font-bold text-center mb-2">LABORATORIOS</h3>
            <img src={assetsAtributos.laboratorios} alt="Laboratorios" className="w-40 h-40" />
          </div>

          <div
            onClick={() => {
              setMostrarLaboratorios(false);
              setMostrarPresentaciones(true);
              setMostrarTipos(false);
            }}
            className={`w-[290px] h-[250px] bg-[#FEBA5A] rounded-md shadow-md flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 
              ${mostrarPresentaciones ? "scale-105 border-4 border-cyan-600 shadow shadow-lg" : "hover:scale-105 border-4 border-transparent hover:border-cyan-600"}`}
          >
            <h3 className="text-white font-bold text-center mb-2">PRESENTACIÓN</h3>
            <img src={assetsAtributos.presentacion} alt="Presentación" className="w-40 h-40" />
          </div>

          <div
            onClick={() => {
              setMostrarLaboratorios(false);
              setMostrarPresentaciones(false);
              setMostrarTipos(true);
            }}
            className={`w-[290px] h-[250px] bg-[#15D0EF] rounded-md shadow-md flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 
              ${mostrarTipos ? "scale-105 border-4 border-cyan-600 shadow shadow-lg" : "hover:scale-105 border-4 border-transparent hover:border-cyan-600"}`}
          >
            <h3 className="text-white font-bold text-center mb-2">TIPOS DE MEDICAMENTO</h3>
            <img src={assetsAtributos.tipo} alt="Tipo" className="w-40 h-40" />
          </div>

        </div>

        <div className="w-full flex flex-col items-center my-10">
          {mostrarLaboratorios && (
            <GestionLaboratorios laboratorios={laboratorios} />
          )}
          {mostrarPresentaciones && (
            <GestionPresentaciones presentaciones={presentaciones} />
          )}
          {mostrarTipos && (
            <GestionTipos tipos={tipos} />
          )}
        </div>

        

      </div>
    </div>
  );
}

export default GestionAtributos;
