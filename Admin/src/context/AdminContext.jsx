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
    const [lotesVencidos, setLotesVencidos] = useState([]);
    const [lotesPorVencer, setLotesPorVencer] = useState([]);
    const [ventas, setVentas] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;


    //----------------------------------------------------------- GESTIÓN DE PRODUCTOS-------------------------------------------------------------
    const obtenerProductos = async () => {
        try {

            const {data} = await axios.get(backendURL + '/api/admin/obtener-productos', {headers: {aToken}});
            if (data.success) {
                setProductos(data.productos);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }


    //----------------------------------------------------------- GESTIÓN DE LOTES-------------------------------------------------------------

    const obtenerLotes = async () => {
        try {

            const {data} = await axios.get(backendURL + '/api/admin/obtener-lotes', {headers: {aToken}});
            if (data.success) {
                toast.success(data.message);
                setLotes(data.lotes)
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const obtenerLotesVencidos = async () => {
        try {

            const {data} = await axios.get(backendURL + '/api/admin/obtener-lotes-vencidos', {headers: {aToken}});
            if (data.success) {
                setLotesVencidos(data.lotes);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const obtenerLotesPorVencer = async () => {
        try {

            const {data} = await axios.get(backendURL + '/api/admin/obtener-lotes-por-vencer', {headers: {aToken}});
            if (data.success) {
                setLotesPorVencer(data.lotes);
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

            const {data} = await axios.get(backendURL + '/api/admin/obtener-laboratorios', {headers: {aToken}});
            if (data.success) {
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
            
            const {data} = await axios.get(backendURL + '/api/admin/obtener-presentaciones', {headers: {aToken}});
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

            const {data} = await axios.get(backendURL + '/api/admin/obtener-tipos', {headers: {aToken}});
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

            const {data} = await axios.get(backendURL + '/api/admin/obtener-proveedores', {headers: {aToken}});
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

            const {data} = await axios.get(backendURL + '/api/admin/obtener-vendedores', {headers: {aToken}});
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
        backendURL,
        productos, obtenerProductos, setProductos,
        proveedores, obtenerProveedores, setProveedores,
        laboratorios, obtenerLaboratorios, setLaboratorios,
        vendedores, obtenerVendedores, setVendedores,
        tipos, obtenerTipos,
        presentaciones, obtenerPresentaciones,
        lotes, obtenerLotes, lotesVencidos, lotesPorVencer, obtenerLotesVencidos, obtenerLotesPorVencer
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;