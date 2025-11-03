import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";

const backendURL = process.env.VITE_BACKEND_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${backendURL}/api/admin`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.aToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const vendedoresApi = createApi({
    reducerPath: "vendedoresApi",
    baseQuery: baseQuery,
    tagTypes: ["Vendedores"],
    endpoints: (builder) => ({
        obtenerVendedores: builder.query({
            query: () => "/obtener-vendedores",
            providesTags: ["Vendedores"],
        }),
        crearVendedor: builder.mutation({
            query: (nuevoVendedor) => ({
                url: "/nuevo-vendedor",
                method: "POST",
                body: nuevoVendedor,
            }),
            invalidatesTags: ["Vendedores"],
        }),
        editarVendedor: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/editar-vendedor/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Vendedores"],
        }),
        eliminarVendedor: builder.mutation({
            query: (id) => ({
                url: `/eliminar-vendedor/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Vendedores"],
        }),
    }),
});

export const {
    useObtenerVendedoresQuery,
    useCrearVendedorMutation,
    useEditarVendedorMutation,
    useEliminarVendedorMutation,
} = vendedoresApi;
