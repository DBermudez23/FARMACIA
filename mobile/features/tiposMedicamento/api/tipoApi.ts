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

export const tiposApi = createApi({
    reducerPath: "tiposApi",
    baseQuery: baseQuery,
    tagTypes: ["Tipos"],
    endpoints: (builder) => ({
        obtenerTipos: builder.query({
            query: () => "/obtener-tipos",
            providesTags: ["Tipos"]
        }),
        crearTipo: builder.mutation({
            query: (nuevoTipo) => ({
                url: "/nuevo-tipo",
                method: "POST",
                body: nuevoTipo
            }),
            invalidatesTags: ["Tipos"]
        })
    })
});

export const {
    useObtenerTiposQuery,
    useCrearTipoMutation
} = tiposApi;