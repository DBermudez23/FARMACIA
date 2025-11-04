import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${backendURL}/api/admin`,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.aToken;
    if (token) {
      headers.set("aToken", token);
    }
    return headers;
  }
});

export const lotesApi = createApi({
  reducerPath: "lotesApi",
  baseQuery: baseQuery,
  tagTypes: ["Lotes"],
  endpoints: (builder) => ({
    obtenerLotes: builder.query({
      query: () => "/obtener-lotes",
      providesTags: ["Lotes"],
    }),
    obtenerLotesVencidos: builder.query({
      query: () => "/obtener-lotes-vencidos",
      providesTags: ["Lotes"],
    }),
    obtenerLotesPorVencer: builder.query({
      query: () => "/obtener-lotes-por-vencer",
      providesTags: ["Lotes"],
    }),
    crearLote: builder.mutation({
      query: (nuevoLote) => ({
        url: "/nuevo-lote",
        method: "POST",
        body: nuevoLote,
      }),
      invalidatesTags: ["Lotes"],
    }),
    editarLote: builder.mutation({
        query: ({ id, ...body }) => ({
            url: `/editar-lote/${id}`,
            method: "PUT",
            body
        }),
        invalidatesTags: ["Lotes"],
    }),
    eliminarLote: builder.mutation({
        query: (id) => ({
            url: `/eliminar-lote/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Lotes"],
    }),
  }),
});

export const {
  useObtenerLotesQuery,
  useObtenerLotesVencidosQuery,
  useObtenerLotesPorVencerQuery,
  useEditarLoteMutation,
  useEliminarLoteMutation,
} = lotesApi;