// type/presentacion

export interface Presentacion{
    _id: string;
    nombre: string;
    descripción: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PresentacionesState {
    presentaciones: Presentacion[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}