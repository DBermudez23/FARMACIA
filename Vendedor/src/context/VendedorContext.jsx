import { createContext, useState } from "react";
import {toast} from 'react-toastify';
import axios from 'axios';

export const VendedorContext = createContext();

const VendedorContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [lotes, setLotes] = useState([]);
    const [laboratorios, setLaboratorios] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ventas, setVentas] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;


    const value = {
        token, setToken,
        backendURL,
        lotes, setLotes,
        proveedores, setProveedores
    }

    return (
        <VendedorContext.Provider value={value} >
            {props.children}
        </VendedorContext.Provider>
    )
}

export default VendedorContextProvider;