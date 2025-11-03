import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { vendedoresApi } from "./api/vendedoresApi";
import { Vendedor, VendedoresState } from "./interfaces/vendedor.interface";

const initialState: VendedoresState = {
    vendedores: [],
    status: "idle",
    error: null,
};

const vendedoresSlice = createSlice({
    name: "Vendedores",
    initialState,
    reducers: {
        setVendedores: (state, action: PayloadAction<Vendedor[]>) => {
            state.vendedores = action.payload;
        },
        setStatus: (state, action: PayloadAction<VendedoresState["status"]>) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Obtener vendedores
        builder.addMatcher(
            vendedoresApi.endpoints.obtenerVendedores.matchPending,
            (state) => {
                state.status = "loading";
            }
        )
        .addMatcher(
            vendedoresApi.endpoints.obtenerVendedores.matchFulfilled,
            (state, action: PayloadAction<Vendedor[]>) => {
                state.status = "succeeded";
                state.vendedores = action.payload;
            }
        )
        .addMatcher(
            vendedoresApi.endpoints.obtenerVendedores.matchRejected,
            (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error al cargar los vendedores";
            }
        )
        // Crear nuevo vendedor
        .addMatcher(
            vendedoresApi.endpoints.crearVendedor.matchPending,
            (state) => {
                state.status = "loading";
            }
        )
        .addMatcher(
            vendedoresApi.endpoints.crearVendedor.matchFulfilled,
            (state, action: PayloadAction<Vendedor>) => {
                state.status = "succeeded";
                state.vendedores.push(action.payload);
            }
        )
        .addMatcher(
            vendedoresApi.endpoints.crearVendedor.matchRejected,
            (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error al crear el vendedor";
            }
        )
        .addMatcher(
            vendedoresApi.endpoints.editarVendedor.matchFulfilled,
            (state, action: PayloadAction<Vendedor>) => {
                state.status = 'succeeded';
                const vendedorActualizado = action.payload;
                state.vendedores = state.vendedores.map(v =>
                    v._id === vendedorActualizado._id ? vendedorActualizado : v
                );
            }
        )
        .addMatcher(
            vendedoresApi.endpoints.eliminarVendedor.matchFulfilled,
            (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.vendedores = state.vendedores.filter(v => v._id !== action.payload);
            }
        )
    },
});

export const { setVendedores, setStatus, setError } = vendedoresSlice.actions;

export default vendedoresSlice.reducer;
