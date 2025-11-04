export interface Vendedor {
    _id: string;
    nombre: string;
    mail: string;
    telefono: string;
    direccion?: string;
    imagen?: string;
}

export interface AuthState {
    aToken: string | null;
    isAuthenticated: boolean;
    vendedor: Vendedor | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}