import { configureStore } from '@reduxjs/toolkit'
import { lotesApi } from '@/features/lotes/api/lotesApi'
import { laboratoriosApi } from '@/features/laboratorios/api/laboratoriosApi';
import { presentacionApi } from '@/features/presentaciones/api/presentacionApi';
import { productosApi } from '@/features/productos/api/productosApi';
import { proveedoresApi } from '@/features/proveedores/api/proveedoresApi';
import { tiposApi } from '@/features/tiposMedicamento/api/tipoApi';
import { vendedoresApi } from '@/features/vendedores/api/vendedoresApi';
import { authApi } from '@/features/auth/api/authApi';
import authReducer from '@/features/auth/authSlice'
import lotesReducer from '@/features/lotes/lotesSlice';
import laboratoriosReducer from '@/features/laboratorios/laboratoriosSlice';
import presentacionesReducer from '@/features/presentaciones/presentacionesSlice'
import productosReducer from '@/features/productos/productosSlice';
import proveedoresReducer from '@/features/proveedores/proveedoresSlice';
import tiposReducer from '@/features/proveedores/proveedoresSlice';
import vendedoresReducer from '@/features/vendedores/vendedoresSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lotes: lotesReducer,
    laboratorios: laboratoriosReducer,
    presentaciones: presentacionesReducer,
    productos: productosReducer,
    proveedores: proveedoresReducer,
    tipos: tiposReducer,
    vendedores: vendedoresReducer,
    [lotesApi.reducerPath]: lotesApi.reducer,
    [laboratoriosApi.reducerPath]: laboratoriosApi.reducer,
    [presentacionApi.reducerPath]: presentacionApi.reducer,
    [productosApi.reducerPath]: productosApi.reducer,
    [proveedoresApi.reducerPath]: proveedoresApi.reducer,
    [tiposApi.reducerPath]: tiposApi.reducer,
    [vendedoresApi.reducerPath]: vendedoresApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      lotesApi.middleware,
      laboratoriosApi.middleware,
      presentacionApi.middleware,
      productosApi.middleware,
      proveedoresApi.middleware,
      tiposApi.middleware,
      vendedoresApi.middleware,
      authApi.middleware
    ),
})

// Tipos útiles
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default configureStore;
