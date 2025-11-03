import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productosApi } from "./api/productosApi";
import { Producto, ProductosState } from "./interfaces/producto.interface";

const initialState: ProductosState = {
  productos: [],
  status: "idle",
  error: null,
};

const productosSlice = createSlice({
  name: "Productos",
  initialState,
  reducers: {
    setProductos: (state, action: PayloadAction<Producto[]>) => {
      state.productos = action.payload;
    },
    setStatus: (state, action: PayloadAction<ProductosState["status"]>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Obtener productos
    builder
      .addMatcher(
        productosApi.endpoints.obtenerProductos.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        productosApi.endpoints.obtenerProductos.matchFulfilled,
        (state, action: PayloadAction<Producto[]>) => {
          state.status = "succeeded";
          state.productos = action.payload;
        }
      )
      .addMatcher(
        productosApi.endpoints.obtenerProductos.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message || "Error al cargar los productos";
        }
      )

      // Crear nuevo producto
      .addMatcher(
        productosApi.endpoints.crearProducto.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        productosApi.endpoints.crearProducto.matchFulfilled,
        (state, action: PayloadAction<Producto>) => {
          state.status = "succeeded";
          state.productos.push(action.payload);
        }
      )
      .addMatcher(
        productosApi.endpoints.crearProducto.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message || "Error al crear el producto";
        }
      )

      // Editar producto por ID
      .addMatcher(
        productosApi.endpoints.editarProducto.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        productosApi.endpoints.editarProducto.matchFulfilled,
        (state, action: PayloadAction<Producto>) => {
          state.status = "succeeded";
          const productoActualizado = action.payload;
          state.productos = state.productos.map((prod) =>
            prod._id === productoActualizado._id
              ? productoActualizado
              : prod
          );
        }
      )
      .addMatcher(
        productosApi.endpoints.editarProducto.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message || "Error al editar el producto";
        }
      )

      // Eliminar producto por ID
      .addMatcher(
        productosApi.endpoints.eliminarProducto.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        productosApi.endpoints.eliminarProducto.matchFulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.productos = state.productos.filter(
            (prod) => prod._id !== action.payload
          );
        }
      )
      .addMatcher(
        productosApi.endpoints.eliminarProducto.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message || "Error al eliminar el producto";
        }
      );
  },
});

export const { setProductos, setStatus, setError } = productosSlice.actions;

export default productosSlice.reducer;
