import { createContext, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [vendedores, setVendedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [laboratorios, setLaboratorios] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [lotes, setLotes] = useState([]);
    const [ventas, setVentas] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const clienteAxios = axios.create({
        baseURL: backendURL,
        headers : {aToken}
    });


    //----------------------------------------------------------- GESTIÓN DE PRODUCTOS-------------------------------------------------------------
    const obtenerProductos = async () => {
        try {

            const {data} = await clienteAxios.get('/api/admin/obtener-productos');
            if (data.success) {
                setProductos(data.productos);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const eliminarProducto = async (id) => {
        try {
            
            const {data} = await clienteAxios.delete(`/api/admin/eliminar-producto/${id}`);
            if (data.success) {
                toast.success(data.message);
                obtenerProductos();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    //----------------------------------------------------------- GESTIÓN DE LABORATORIOS-------------------------------------------------------------
    const obtenerLaboratorios = async () => {
        try {

            const {data} = await clienteAxios.get('/api/admin/obtener-laboratorios');
            if (data.succcess) {
                setLaboratorios(data.laboratorios);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    //----------------------------------------------------------- GESTIÓN DE PRESENTACIONES-------------------------------------------------------------

    const obtenerPresentaciones = async () => {
        try {
            
            const {data} = await clienteAxios.get('/api/admin/obtener-presentaciones');
            if (data.success) {
                setPresentaciones(data.presentaciones);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    //----------------------------------------------------------- GESTIÓN DE TIPOS DE MEDICAMENTO-------------------------------------------------------------

    const obtenerTipos = async () => {
        try {

            const {data} = await clienteAxios.get('/api/admin/obtener-tipos');
            if (data.success) {
                setTipos(data.tipos);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    //----------------------------------------------------------- GESTIÓN DE PROVEEDORES-------------------------------------------------------------
    const obtenerProveedores = async () => {
        try {

            const {data} = await clienteAxios.get('/api/admin/obtener-proveedores');
            if (data.success) {
                setProveedores(data.proveedores);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    //----------------------------------------------------------- GESTIÓN DE VENDEDORES-------------------------------------------------------------

    const obtenerVendedores = async () => {
        try {

            const {data} = await clienteAxios.get('/api/admin/obtener-vendedores');
            if (data.success) {
                setVendedores(data.vendedores);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }


    const value = {
        aToken, setAToken,
        backendURL, clienteAxios,
        productos, obtenerProductos, setProductos,eliminarProducto,
        proveedores, obtenerProveedores, setProveedores,
        laboratorios, obtenerLaboratorios, setLaboratorios,
        vendedores, obtenerVendedores, setVendedores,
        tipos, obtenerTipos,
        presentaciones, obtenerPresentaciones
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;