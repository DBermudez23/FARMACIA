import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { proveedoresApi } from "./api/proveedoresApi";
import { Proveedor, ProveedoresState } from "./interfaces/proveedor.interface";

const initialState: ProveedoresState = {
    proveedores: [],
    status: "idle",
    error: null,
};

const proveedoresSlice = createSlice({
    name: "Proveedores",
    initialState,
    reducers: {
        setProveedores: (state, action: PayloadAction<Proveedor[]>) => {
            state.proveedores = action.payload;
        },
        setStatus: (state, action: PayloadAction<ProveedoresState["status"]>) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Obtener proveedores
        builder
            .addMatcher(
                proveedoresApi.endpoints.obtenerProveedores.matchPending,
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.obtenerProveedores.matchFulfilled,
                (state, action: PayloadAction<Proveedor[]>) => {
                    state.status = "succeeded";
                    state.proveedores = action.payload;
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.obtenerProveedores.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Error al cargar los proveedores";
                }
            )
            // Crear nuevo proveedor
            .addMatcher(
                proveedoresApi.endpoints.crearProveedor.matchPending,
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.crearProveedor.matchFulfilled,
                (state, action: PayloadAction<Proveedor>) => {
                    state.status = "succeeded";
                    state.proveedores.push(action.payload);
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.crearProveedor.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Error al crear el proveedor";
                }
            )
            // Editar proveedor por id
            .addMatcher(
                proveedoresApi.endpoints.editarProveedor.matchPending,
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.editarProveedor.matchFulfilled,
                (state, action: PayloadAction<Proveedor>) => {
                    state.status = "succeeded";
                    const proveedorActualizado = action.payload;
                    state.proveedores = state.proveedores.map((prov) =>
                        prov._id === proveedorActualizado._id ? proveedorActualizado : prov
                    );
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.editarProveedor.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Error al editar el proveedor";
                }
            )
            // Eliminar proveedor por id
            .addMatcher(
                proveedoresApi.endpoints.eliminarProveedor.matchPending,
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.eliminarProveedor.matchFulfilled,
                (state, action: PayloadAction<string>) => {
                    state.status = "succeeded";
                    state.proveedores = state.proveedores.filter(
                        (prov) => prov._id !== action.payload
                    );
                }
            )
            .addMatcher(
                proveedoresApi.endpoints.eliminarProveedor.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Error al eliminar el proveedor";
                }
            );
    },
});

export const { setProveedores, setStatus, setError } = proveedoresSlice.actions;

export default proveedoresSlice.reducer;
