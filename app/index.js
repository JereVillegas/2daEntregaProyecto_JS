import mostrarProductos from "./App.js";
import { PRODUCTS } from "./data/products.js"

document.addEventListener("DOMContentLoaded", (e) => {
  mostrarProductos(PRODUCTS);
})