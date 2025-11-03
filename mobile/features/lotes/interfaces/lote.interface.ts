// types/Lote.ts
export interface Lote {
  _id: string; // ID de MongoDB
  producto: string; // referencia al id del producto
  proveedor: string; // referencia al id del proveedor
  precio: number;
  cantidad: number;
  cantidadVendida: number;
  fechaLlegada: string; // viene como string ISO desde el backend
  fechaVencimiento: string;
  activo: boolean;
  stockDisponible?: number; // virtual calculado en el backend
  createdAt?: string;
  updatedAt?: string;
}

export interface LotesState {
  lotes: Lote[];
  lotesVencidos: Lote[];
  lotesPorVencer: Lote[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}