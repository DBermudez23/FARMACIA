import { createContext, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [vendedores, setVendedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [lotes, setLotes] = useState([]);
    const [ventas, setVentas] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const value = {
        aToken, setAToken,
        backendURL
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;