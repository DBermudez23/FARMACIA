// IMPORTAMOS LOGOS DE HEADER Y NAVBAR
import logoFarmacia from './LogoFarmaciaNav.svg';
import carrito from './carrito.svg';
import panelPrincipal from './panelPrincipal.svg';
import miPerfil from './miPerfil.svg';
import contraseña from './contraseña.svg';
import ventas from './ventas.svg';

const assetsNav = {
    logoFarmacia,
    carrito,
    panelPrincipal,
    miPerfil,
    contraseña,
    ventas
}

const sideBarBotones = [
    {
        icono: panelPrincipal,
        texto: 'PANEL PRINCIPAL',
        to: '/admin-panel-principal'
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

export { assetsNav, sideBarBotones };