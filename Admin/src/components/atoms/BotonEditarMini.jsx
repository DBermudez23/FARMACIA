import { assetsLoteInfo } from "../../assets/assets"

function BotonEditarMini() {
  return (
    <div 
      className="w-6 h-6 flex items-center justify-center bg-[#15D0EF] rounded-xl cursor-pointer hover:bg-cyan-300">

        <img className="w-4" src={assetsLoteInfo.editarBlanco} alt="" />
    </div>
  )
}

export default BotonEditarMini
