import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const moneda = '$';

    const [carritoCompras, setCarritoCompras] = useState([]);
    const [productosCarrito, setProductosCarrito] = useState(0);


    const value = {
        carritoCompras, setCarritoCompras,
        productosCarrito, setProductosCarrito,
        moneda
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;