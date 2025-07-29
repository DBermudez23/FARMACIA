import logoConfirmar from "../../assets/confirmar.svg";

function BotonConfirmarMini({ onClick }) {
    return (
        <div className="w-12 h-12 flex items-center justify-center bg-[#15D0EF] rounded-xl cursor-pointer hover:bg-cyan-300 transition duration-300" onClick={onClick}>
            <img src={logoConfirmar} alt="" />
        </div>
    )
}

export default BotonConfirmarMini
