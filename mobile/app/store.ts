import { configureStore } from '@reduxjs/toolkit'
import { lotesApi } from '../features/lotes/api/lotesApi'
import { laboratoriosApi } from '@/features/laboratorios/api/laboratoriosApi';
import { presentacionApi } from '@/features/presentaciones/api/presentacionApi';
import authReducer from '../features/auth/authSlice'
import lotesReducer from '../features/lotes/lotesSlice';
import laboratoriosReducer from '../features/laboratorios/laboratoriosSlice';
import presentacionesReducer from '@/features/presentaciones/presentacionesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lotes: lotesReducer,
    laboratorios: laboratoriosReducer,
    presentaciones: presentacionesReducer,
    [lotesApi.reducerPath]: lotesApi.reducer,
    [laboratoriosApi.reducerPath]: laboratoriosApi.reducer,
    [presentacionApi.reducerPath]: presentacionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lotesApi.middleware),
})

// Tipos útiles
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
