
export interface Producto {
    _id: string;
    nombre: string;
    presentacion: string;
    laboratorio: string;
    tipo: string;
    precio: number;
    imagen: string;
    infoAdicional: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface ProductosState {
    productos: Producto[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};