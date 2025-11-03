import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";

const backendURL = process.env.VITE_BACKEND_URL;

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

export const laboratoriosApi = createApi({
    reducerPath: "laboratoriosApi",
    baseQuery: baseQuery,
    tagTypes: ["Laboratorios"],
    endpoints: (builder) => ({
        obtenerLaboratorios: builder.query({
            query: () => "/obtener-laboratorios",
            providesTags: ["Laboratorios"],
        }),
        crearLaboratorio: builder.mutation({
            query: (nuevoLaboratorio) => ({
                url: "/nuevo-laboratorio",
                method: "POST",
                body: nuevoLaboratorio
            }),
            invalidatesTags: ["Laboratorios"],
        }),
        editarLaboratorio: builder.mutation({
            query: ({ id, ...body}) => ({
                url: `/editar-laboratorio/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Laboratorios"],
        }),
        eliminarLaboratorio: builder.mutation({
            query: (id) => ({
                url: `/eliminar-laboratorio/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Laboratorios"],
        }),
    })
});

export const {
    useObtenerLaboratoriosQuery,
    useCrearLaboratorioMutation,
    useEditarLaboratorioMutation,
    useEliminarLaboratorioMutation,
} = laboratoriosApi;