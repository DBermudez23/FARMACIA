import logoCancelar from "../../assets/cancelar.svg";

function BotonCancelar({ onClick }) {
  return (
    <div className="w-40 h-14 flex items-center justify-center bg-gray-300 rounded-xl cursor-pointer hover:bg-cyan-300 transition duration-300" onClick={onClick}>
      <img src={logoCancelar} alt="" />
      <p>CANCELAR</p>
    </div>
  )
}

export default BotonCancelar
