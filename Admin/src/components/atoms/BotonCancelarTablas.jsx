import logoCancelar from "../../assets/cancelar.svg";

function BotonCancelarTablas({ onClick }) {
    return (
        <div className="w-6 h-6 flex items-center justify-center bg-red-500 rounded-xl cursor-pointer hover:bg-red-400 transition duration-300" onClick={onClick}>
            <img src={logoCancelar} alt="" />
        </div>
    )
}

export default BotonCancelarTablas
