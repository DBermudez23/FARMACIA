export interface Tipo {
    _id: string;
    nombre: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TiposState {
    tipos: Tipo[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}