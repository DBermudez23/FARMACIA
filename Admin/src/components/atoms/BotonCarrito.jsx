import { assetsNav } from "../../assets/assets"

function BotonCarrito() {
  return (
    <div className="w-7 h-7 flex items-center justify-center bg-[#15D0EF] rounded-xl">
      <img className="w-4" src={assetsNav.carrito} alt="" />
    </div>
  )
}

export default BotonCarrito
