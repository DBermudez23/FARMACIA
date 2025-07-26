import { assetsLoteInfo } from "../../assets/assets.js"

function BotonEliminar() {
  return (
    <div 
      className="w-7 h-7 flex items-center justify-center bg-gray-300 rounded-xl cursor-pointer hover:bg-red-600">

        <img className="w-4" src={assetsLoteInfo.eliminarBlanco} alt="" />

    </div>
  )
}

export default BotonEliminar;
