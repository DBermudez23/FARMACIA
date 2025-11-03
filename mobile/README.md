**Estructura de archivos aplicación movil**

```
mobile/
│
├── api/              # Comunicación directa con backend
├── app/              # Configuración global (store, navegación raíz, providers)
├── assets/           # Recursos estáticos
├── components/       # Componentes UI reutilizables
├── features/         # Dominios funcionales (ej: products, auth, orders)
├── hooks/            # Hooks globales
├── interfaces/       # Tipos e interfaces globales
├── navigators/       # Stacks, tabs, routers
├── providers/        # Contextos globales
├── screens/          # Screens generales
├── themes/           # Estilos globales
├── utilities/        # Constantes, helpers, validadores
│
└── tsconfig.base.json
```