import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tiposApi } from "./api/tipoApi";
import { Tipo, TiposState } from "./interfaces/tipo.interface";

const initialState: TiposState = {
    tipos: [],
    status: "idle",
    error: null,
};

const tiposSlice = createSlice({
    name: "Tipos",
    initialState,
    reducers: {
        setTipos: (state, action: PayloadAction<Tipo[]>) => {
            state.tipos = action.payload;
        },
        setStatus: (state, action: PayloadAction<TiposState["status"]>) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Obtener tipos 
        builder
            .addMatcher(
                tiposApi.endpoints.obtenerTipos.matchPending,
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                tiposApi.endpoints.obtenerTipos.matchFulfilled,
                (state, action: PayloadAction<Tipo[]>) => {
                    state.status = "succeeded";
                    state.tipos = action.payload;
                }
            )
            .addMatcher(
                tiposApi.endpoints.obtenerTipos.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Error al cargar los tipos";
                }
            )
            // Crear nuevo tipo
            .addMatcher(
                tiposApi.endpoints.crearTipo.matchPending,
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                tiposApi.endpoints.crearTipo.matchFulfilled,
                (state, action: PayloadAction<Tipo>) => {
                    state.status = "succeeded";
                    state.tipos.push(action.payload);
                }
            )
            .addMatcher(
                tiposApi.endpoints.crearTipo.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Error al crear el tipo";
                }
            );
    },
});

export const { setTipos, setStatus, setError } = tiposSlice.actions;

export default tiposSlice.reducer;
