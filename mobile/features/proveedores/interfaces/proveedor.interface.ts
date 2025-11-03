//types/laboratorio.ts
export interface Proveedor {
    _id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    mail: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface ProveedoresState {
    proveedores: Proveedor[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};