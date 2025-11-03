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

export const presentacionApi = createApi({
    reducerPath: "presentacionApi",
    baseQuery: baseQuery,
    tagTypes: ["Presentaciones"],
    endpoints: (builder) => ({
        obtenerPresentaciones: builder.query({
            query: () => "/obtener-presentaciones",
            providesTags: ["Presentaciones"],
        }),
        crearPresentacion:  builder.mutation({
            query: (nuevaPresentacion) => ({
                url: "/nueva-presentacion",
                method: "POST",
                body: nuevaPresentacion
            }),
            invalidatesTags: ["Presentaciones"]
        }),
        editarPresentacion: builder.mutation({
            query: ({ id, ...body}) => ({
                url: `/editar-presentacion/${id}`,
                method: "PUT",
                body
            }), 
            invalidatesTags: ["Presentaciones"],
        }),
        eliminarPresentacion: builder.mutation({
            query: (id) => ({
                url: `/eliminar-presentacion/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Presentaciones"]
        })
    })
});

export const {
    useObtenerPresentacionesQuery,
    useCrearPresentacionMutation,
    useEditarPresentacionMutation,
    useEliminarPresentacionMutation
} = presentacionApi;