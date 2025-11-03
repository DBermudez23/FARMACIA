//types/laboratorio.ts
export interface Laboratorio {
    _id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    mail: string;
    activo: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export interface LaboratoriosState {
    laboratorios: Laboratorio[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};