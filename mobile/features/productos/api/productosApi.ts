import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${backendURL}/api/admin`,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.aToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

export const productosApi = createApi({
    reducerPath: "productosApi",
    baseQuery: baseQuery,
    tagTypes: ["Productos"],
    endpoints: (builder) => ({
        obtenerProductos: builder.query({
            query: () => "/obtener-Productos",
            providesTags: ["Productos"],
        }),
        crearProducto: builder.mutation({
            query: (nuevoLaboratorio) => ({
                url: "/nuevo-producto",
                method: "POST",
                body: nuevoLaboratorio
            }),
            invalidatesTags: ["Productos"],
        }),
        editarProducto: builder.mutation({
            query: ({ id, ...body}) => ({
                url: `/editar-producto/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Productos"],
        }),
        eliminarProducto: builder.mutation({
            query: (id) => ({
                url: `/eliminar-producto/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Productos"],
        }),
    })
});

export const {
    useObtenerProductosQuery,
    useCrearProductoMutation,
    useEditarProductoMutation,
    useEliminarProductoMutation,
} = productosApi;