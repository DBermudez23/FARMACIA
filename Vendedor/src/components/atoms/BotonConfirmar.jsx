import logoConfirmar from "../../assets/confirmar.svg";

function BotonConfirmar({ type = "button" }) {
  return (
    <button
      type={type}
      className="w-40 h-14 flex items-center justify-center bg-[#15D0EF] rounded-xl cursor-pointer hover:bg-cyan-300 transition duration-300"
    >
      <img src={logoConfirmar} alt="Confirmar" />
      <p>CONFIRMAR</p>
    </button>
  );
}

export default BotonConfirmar;