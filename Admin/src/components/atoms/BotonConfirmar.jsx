import logoConfirmar from "../../assets/confirmar.svg";

function BotonConfirmar() {
    return (
        <div className="w-40 h-14 flex items-center justify-center bg-[#15D0EF] rounded-xl cursor-pointer hover:bg-cyan-300 transition duration-300">
            <img src={logoConfirmar} alt="" />
            <p>CONFIRMAR</p>
        </div>
    )
}

export default BotonConfirmar
