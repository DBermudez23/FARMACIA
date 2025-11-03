import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { lotesApi } from './api/lotesApi';
import { Lote, LotesState } from './interfaces/lote.interface';

const initialState: LotesState = {
    lotes: [],
    lotesVencidos: [],
    lotesPorVencer: [],
    status: 'idle',
    error: null,
}

const lotesSlice = createSlice({
    name: 'Lotes',
    initialState,
    reducers: {
        clearLotes: (state) => {
            state.lotes = [];
            state.lotesVencidos = [];
            state.lotesPorVencer = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Obtener lotes
        builder.addMatcher(
            lotesApi.endpoints.obtenerLotes.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            lotesApi.endpoints.obtenerLotes.matchFulfilled,
            (state, action: PayloadAction<Lote[]>) => {
                state.status = 'succeeded';
                state.lotes = action.payload;
            }
        )
        .addMatcher(
            lotesApi.endpoints.obtenerLotes.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar los lotes';
            }
        )
        // Obtener lotes vencidos
        .addMatcher(
            lotesApi.endpoints.obtenerLotesVencidos.matchFulfilled,
            (state, action: PayloadAction<Lote[]>) => {
                state.lotesVencidos = action.payload;
            }
        )
        // Obtener Lotes Por Vencer
        .addMatcher(
            lotesApi.endpoints.obtenerLotesPorVencer.matchFulfilled,
            (state, action: PayloadAction<Lote[]>) => {
                state.lotesPorVencer = action.payload;
            }
        )
        // Crear lote
        .addMatcher(
            lotesApi.endpoints.crearLote.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            lotesApi.endpoints.crearLote.matchFulfilled,
            (state, action: PayloadAction<Lote>) => {
                state.status = 'succeeded';
                state.lotes.push(action.payload);
            }
        )
        .addMatcher(
            lotesApi.endpoints.crearLote.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al crear el lote';
            }
        )
        // Editar lote
        .addMatcher(
            lotesApi.endpoints.editarLote.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            lotesApi.endpoints.editarLote.matchFulfilled,
            (state, action) => {
                state.status = 'succeeded';
                // Actualizar el lote editado en los arrays correspondientes
                const loteActualizado = action.payload;
                state.lotes = state.lotes.map(lote => 
                    lote._id === loteActualizado._id ? loteActualizado : lote
                );
                state.lotesVencidos = state.lotesVencidos.map(lote => 
                    lote._id === loteActualizado._id ? loteActualizado : lote
                );
                state.lotesPorVencer = state.lotesPorVencer.map(lote => 
                    lote._id === loteActualizado._id ? loteActualizado : lote
                );
            }
        )
        .addMatcher(
            lotesApi.endpoints.editarLote.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al editar el lote';
            }
        )
        // Eliminar lote
        .addMatcher(
            lotesApi.endpoints.eliminarLote.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            lotesApi.endpoints.eliminarLote.matchFulfilled,
            (state, action) => {
                state.status = 'succeeded';
                // Eliminar el lote de todos los arrays
                const loteId = action.meta.arg.originalArgs;
                state.lotes = state.lotes.filter(lote => lote._id !== loteId);
                state.lotesVencidos = state.lotesVencidos.filter(lote => lote._id !== loteId);
                state.lotesPorVencer = state.lotesPorVencer.filter(lote => lote._id !== loteId);
            }
        )
        .addMatcher(
            lotesApi.endpoints.eliminarLote.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al eliminar el lote';
            }
        )
    }
});

export const { clearLotes } = lotesSlice.actions;
export default lotesSlice.reducer;

// Selectores
export const selectAllLotes = (state: { lotes: LotesState }) => state.lotes.lotes;
export const selectLotesVencidos = (state: { lotes: LotesState }) => state.lotes.lotesVencidos;
export const selectLotesPorVencer = (state: { lotes: LotesState }) => state.lotes.lotesPorVencer;
export const selectLotesStatus = (state: { lotes: LotesState }) => state.lotes.status;
export const selectLotesError = (state: { lotes: LotesState }) => state.lotes.error;