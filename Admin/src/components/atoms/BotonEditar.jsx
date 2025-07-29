import { assetsLoteInfo } from "../../assets/assets"

function BotonEditar({ onClick }) {
  return (
    <div 
      className="w-7 h-7 flex items-center justify-center bg-gray-300 rounded-xl cursor-pointer hover:bg-cyan-300"
      onClick={onClick}
    >

        <img className="w-4" src={assetsLoteInfo.editarBlanco} alt="" />
    </div>
  )
}

export default BotonEditar;
