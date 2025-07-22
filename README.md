# FARMACIA APP

Sistema web de gestión de inventario y facturación, diseñado inicialmente para farmacias, pero adaptable a cualquier comercio que requiera control por lotes, manejo de stock y ventas con impuestos. Construido con el stack MERN (MongoDB, Express.js, React.js, Node.js), este proyecto combina rendimiento, escalabilidad y una interfaz clara para usuarios administrativos y vendedores.

## ✨ Características principales
Panel de administración con control total sobre productos, lotes, proveedores, usuarios y ventas.

Facturación dinámica con cálculo automático de impuestos, aplicación de descuentos y soporte para múltiples métodos de pago (efectivo, digital, etc.).

Control por lotes con alertas de vencimiento, gestión de inventario y eliminación segura de productos vencidos.

Gestión de roles: Administrador y Vendedor, cada uno con accesos específicos.

Historial de ventas por día, semana y mes, filtrado por cliente, vendedor o fecha.

Seguridad basada en login con permisos y control de acceso.

Pruebas automatizadas con Jest para asegurar confiabilidad en la lógica de negocio.

Diseño adaptable, enfocado en usabilidad y velocidad operativa.

## 🔗 Diseño en Figma
Aquí puedes visualizar el prototipo de interfaz antes del desarrollo:

Figma: [Enlace al diseño](https://www.figma.com/design/gbNAR0Q0yPENaCkC7KKk2u/FARMACIA-DANIEL?node-id=0-1&p=f&t=6CnacTipS5IPvvsI-0)

## 🚀 Tecnologías utilizadas
Frontend(Vendedor): React.js 

Admin: React.js

Backend: Node.js + Express.js

Base de datos: MongoDB + Mongoose

Pruebas: Jest

Autenticación: JWT (JSON Web Tokens)

Estilos: TailwindCSS 

PDFs de facturación: [opcional: Librería como pdfmake, jsPDF o html2pdf]

## 🔧 Estado del proyecto
Actualmente se encuentra en fase activa de desarrollo bajo el stack MERN, integrando mejores prácticas y mayor potencial de escalabilidad.

## 📈 Posible extensibilidad
El sistema ha sido diseñado para crecer. Entre las extensiones futuras previstas se encuentran:

Módulo de pedidos a domicilio.

Integración con pasarelas de pago (Stripe, PayPhone, DataFast, etc.).

Soporte para múltiples sucursales con reportes segmentados por sede.

Registro de compras y gestión de stock por entrada/salida.

App móvil conectada a la misma API.