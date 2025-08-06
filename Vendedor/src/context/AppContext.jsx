import { createContext, useState, useContext } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const moneda = '$';

    const [carritoCompras, setCarritoCompras] = useState([]);

    const value = {
        moneda,
        carritoCompras, setCarritoCompras
    }

    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;