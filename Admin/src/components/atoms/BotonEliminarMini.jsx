import { assetsLoteInfo } from "../../assets/assets"

function BotonEliminarMini({ onClick }) {
  return (
    <div 
      className="w-6 h-6 flex items-center justify-center bg-red-500 rounded-xl cursor-pointer hover:bg-red-400"
      onClick={onClick}
    >
      <img className="w-4" src={assetsLoteInfo.eliminarBlanco} alt="" />
    </div>
  )
}

export default BotonEliminarMini
