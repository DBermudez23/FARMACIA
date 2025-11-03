import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { laboratoriosApi } from "./api/laboratoriosApi";
import { Laboratorio, LaboratoriosState } from "./interfaces/laboratorio.interface";

const initialState: LaboratoriosState = {
    laboratorios: [],
    status: "idle",
    error: null,
}

const laboratoriosSlice = createSlice({
    name: "Laboratorios",
    initialState,
    reducers: {
        setLaboratorios: (state, action: PayloadAction<Laboratorio[]>) => {
            state.laboratorios = action.payload;
        },
        setStatus: (state, action: PayloadAction<LaboratoriosState["status"]>) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Obtener laboratorios 
        builder.addMatcher(
            laboratoriosApi.endpoints.obtenerLaboratorios.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.obtenerLaboratorios.matchFulfilled,
            (state, action: PayloadAction<Laboratorio[]>) => {
                state.status = 'succeeded';
                state.laboratorios = action.payload;
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.obtenerLaboratorios.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar los laboratorios';
            }
        )
        // Crear nuevo laboratorio
        .addMatcher(
            laboratoriosApi.endpoints.crearLaboratorio.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.crearLaboratorio.matchFulfilled,
            (state, action: PayloadAction<Laboratorio>) => {
                state.status = 'succeeded';
                state.laboratorios.push(action.payload);
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.crearLaboratorio.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al crear el laboratorio';
            }
        )
        // Editar laboratorio por id
        .addMatcher(
            laboratoriosApi.endpoints.editarLaboratorio.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.editarLaboratorio.matchFulfilled,
            (state, action: PayloadAction<Laboratorio>) => {
                state.status = 'succeeded';
                // Actualizar el laboratorio en el estado
                const laboratorioActualizado = action.payload;
                state.laboratorios = state.laboratorios.map(lab => 
                    lab._id === laboratorioActualizado._id ? laboratorioActualizado : lab
                );
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.editarLaboratorio.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al editar el laboratorio';
            }
        )
        // Eliminar laboratorio por id
        .addMatcher(
            laboratoriosApi.endpoints.eliminarLaboratorio.matchPending,
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.eliminarLaboratorio.matchFulfilled,
            (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.laboratorios = state.laboratorios.filter(lab => lab._id !== action.payload);
            }
        )
        .addMatcher(
            laboratoriosApi.endpoints.eliminarLaboratorio.matchRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error al eliminar el laboratorio';
            }
        );
    }
});

export const { setLaboratorios, setStatus, setError } = laboratoriosSlice.actions;

export default laboratoriosSlice.reducer;
