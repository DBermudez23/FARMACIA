import { useContext } from "react"
import { assetsNav } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"

function BotonCarrito({onClick}) {
 
  const {productosCarrito, setProductosCarrito} = useContext(AppContext);

  return (
    <div 
      onClick={() => {setProductosCarrito(prev => prev + 1); onClick()}} 
      className="w-7 h-7 flex items-center justify-center bg-[#15D0EF] rounded-xl cursor-pointer hover:bg-cyan-300">

        <img className="w-4" src={assetsNav.carrito} alt="" />

    </div>
  )
}

export default BotonCarrito
