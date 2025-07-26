// IMPORTAMOS LOGOS DE HEADER Y NAVBAR
import logoFarmacia from './LogoFarmaciaNav.svg';
import carrito from './carrito.svg';
import panelPrincipal from './panelPrincipal.svg';
import gestionLotes from './gestionLTS.svg';
import gestionProducto from './gestionPRD.svg';
import gestionAtributos from './gestionATR.svg';
import gestionProveedores from './gestionPRD.svg';
import miPerfil from './miPerfil.svg';
import contraseña from './contraseña.svg';
import gestionUsuarios from './gestionUSR.svg';
import ventas from './ventas.svg';
//IMPORTAMOS PARA CARTA DE LOTE
import editarBlanco from './editarBlanco.svg';
import eliminarBlanco from './eliminarBlanco.svg';
// IMPORTAMOS IMAGENES PARA ATRIBUTOS
import laboratorios from './laboratoriosIMG.svg';
import presentacion from './presentacionIMG.svg';
import tipo from './tipoMedicamentoIMG.svg';


const assetsNav = {
    logoFarmacia,
    carrito,
    panelPrincipal,
    gestionLotes,
    gestionProducto,
    gestionAtributos,
    gestionProveedores,
    miPerfil,
    contraseña,
    gestionUsuarios,
    ventas
}

const sideBarBotones = [
    {
        icono: panelPrincipal,
        texto: 'PANEL PRINCIPAL',
        to: '/admin-panel-principal'
    },
    {
        icono: gestionLotes,
        texto: 'GESTIÓN LOTES',
        to: '/admin-gestion-lotes'
    },
    {
        icono: gestionProducto,
        texto: 'GESTIÓN PRODUCTOS',
        to: '/admin-gestion-producto'
    },
    {
        icono: gestionAtributos,
        texto: 'GESTIÓN ATRIBUTOS',
        to: '/admin-gestion-atributos'
    },
    {
        icono: gestionProveedores,
        texto: 'GESTIÓN PROVEEDORES',
        to: '/admin-gestion-proveedores'
    },
    {
        icono: gestionUsuarios,
        texto: 'GESTIÓN USUARIOS',
        to: '/admin-gestion-usuarios'
    },
    {
        icono: miPerfil,
        texto: 'MI PERFIL',
        to: '/admin-editar-perfil'
    },
    {
        icono: contraseña,
        texto: 'CONTRASEÑA',
        to: '/admin-editar-contraseña'
    },
    {
        icono: ventas,
        texto: 'VENTAS',
        to: '/admin-panel-ventas'
    }
];

const assetsLoteInfo = {
    editarBlanco,
    eliminarBlanco
}

const assetsAtributos = {
    laboratorios,
    presentacion,
    tipo
}



export { assetsNav, sideBarBotones, assetsLoteInfo, assetsAtributos };