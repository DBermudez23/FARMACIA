export interface Vendedor {
    _id?: string;
    nombre: string;
    mail: string;
    contrasena: string;
    telefono: string;
    nacimiento: Date; 
    genero: "Masculino" | "Femenino" | "Otro";
    direccion: string;
    imagen?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface VendedoresState {
    vendedores: Vendedor[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

