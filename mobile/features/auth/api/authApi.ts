import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminAuthResponse } from '../interfaces/authResponse';
import { AdminCredentials } from '../interfaces/credentials.interface';
import { RootState } from '../../../app/store';

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://10.0.2.2:5000';
// Al inicio del archivo authApi.ts
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendURL}/api/admin`,
        prepareHeaders: (headers, { getState }) => {
            // Obtener el token desde el estado de Redux
            const token = (getState() as RootState).auth.aToken;
            if (token) {
                headers.set('aToken', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginAdmin: builder.mutation<AdminAuthResponse, AdminCredentials>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
}); 

export const { useLoginAdminMutation } = authApi;