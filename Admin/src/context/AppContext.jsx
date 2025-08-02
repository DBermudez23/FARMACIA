import { createContext, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "./AdminContext";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const {aToken} = useContext(AdminContext);
    const moneda = '$';

    const [carritoCompras, setCarritoCompras] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const clienteAxios = axios.create({
        baseURL: backendURL,
        headers: { aToken }
    });


    const value = {
        carritoCompras, setCarritoCompras,
        moneda
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;