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

export const proveedoresApi = createApi({
  reducerPath: "proveedoresApi",
  baseQuery: baseQuery,
  tagTypes: ["Proveedores"],
  endpoints: (builder) => ({
    // Obtener todos los proveedores
    obtenerProveedores: builder.query({
      query: () => "/obtener-proveedores",
      providesTags: ["Proveedores"],
    }),

    // Crear nuevo proveedor
    crearProveedor: builder.mutation({
      query: (nuevoProveedor) => ({
        url: "/nuevo-proveedor",
        method: "POST",
        body: nuevoProveedor,
      }),
      invalidatesTags: ["Proveedores"],
    }),

    // Editar proveedor por ID
    editarProveedor: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/editar-proveedor/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Proveedores"],
    }),

    // Eliminar proveedor por ID
    eliminarProveedor: builder.mutation({
      query: (id) => ({
        url: `/eliminar-proveedor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Proveedores"],
    }),
  }),
});

export const {
  useObtenerProveedoresQuery,
  useCrearProveedorMutation,
  useEditarProveedorMutation,
  useEliminarProveedorMutation,
} = proveedoresApi;
