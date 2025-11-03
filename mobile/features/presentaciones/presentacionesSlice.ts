import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { presentacionApi } from "./api/presentacionApi";
import { Presentacion, PresentacionesState } from "./interfaces/presentacion.interface";

const initialState: PresentacionesState = {
    presentaciones: [],
    status: "idle",
    error: null
}

const presentacionesSlice = createSlice({
    name: "Presentaciones",
    initialState,
    reducers: {
        setPresentaciones: (state, action: PayloadAction<Presentacion[]>) => {
            state.presentaciones = action.payload;
        },
        setStatus: (state, action: PayloadAction<PresentacionesState["status"]>) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Obtener presentaciones 
        builder.addMatcher(
            presentacionApi.endpoints.obtenerPresentaciones.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            presentacionApi.endpoints.obtenerPresentaciones.matchFulfilled,
            (state, action: PayloadAction<Presentacion[]>) => {
                state.status = 'succeeded';
                state.presentaciones = action.payload;
            }
        )
        .addMatcher(
            presentacionApi.endpoints.obtenerPresentaciones.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar las presentaciones';
            }
        )
        // Crear nueva presentación
        .addMatcher(
            presentacionApi.endpoints.crearPresentacion.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            presentacionApi.endpoints.crearPresentacion.matchFulfilled,
            (state, action: PayloadAction<Presentacion>) => {
                state.status = 'succeeded';
                state.presentaciones.push(action.payload);
            }
        )
        .addMatcher(
            presentacionApi.endpoints.crearPresentacion.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al crear la presentación';
            }
        )
        // Editar presentación por id
        .addMatcher(
            presentacionApi.endpoints.editarPresentacion.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            presentacionApi.endpoints.editarPresentacion.matchFulfilled,
            (state, action: PayloadAction<Presentacion>) => {
                state.status = 'succeeded';
                // Actualizar la presentación en el estado
                const presentacionActualizada = action.payload;
                state.presentaciones = state.presentaciones.map(pres => 
                    pres._id === presentacionActualizada._id ? presentacionActualizada : pres
                );
            }
        )
        .addMatcher(
            presentacionApi.endpoints.editarPresentacion.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al editar la presentación';
            }
        )
        // Eliminar presentación por id
        .addMatcher(
            presentacionApi.endpoints.eliminarPresentacion.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            presentacionApi.endpoints.eliminarPresentacion.matchFulfilled,
            (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.presentaciones = state.presentaciones.filter(pres => pres._id !== action.payload);
            }
        )
        .addMatcher(
            presentacionApi.endpoints.eliminarPresentacion.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al eliminar la presentación';
            }
        );
    }
});

export const { setPresentaciones, setStatus, setError } = presentacionesSlice.actions;

export default presentacionesSlice.reducer;