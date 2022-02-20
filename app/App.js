import actualizarCarrito from "./components/cart/actualizarCarrito.js";
import carritoIndex from "./components/cart/carritoIndex.js";
import { stockProductos } from "./components/products/stock.js";
import { PRODUCTS } from "./data/products.js";

let carritoStorage = [];
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");

const selectCategoria = document.getElementById("selectCategoria");

selectCategoria.addEventListener("change", () => {
  if (selectCategoria.value == "all") {
    mostrarProductos(PRODUCTS);
  } else {
    mostrarProductos(
      PRODUCTS.filter((elemento) => elemento.categoria == selectCategoria.value)
    );
  }
});

mostrarProductos(array);

export default function mostrarProductos(array) {
  contenedorCarrito.innerHTML = "";
  if (localStorage.getItem("carrito")) {
    carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    carritoStorage.map((producto) => {
      let div = document.createElement("div");
      div.classList.add("productoEnCarrito");
      div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;
      contenedorCarrito.appendChild(div);

      actualizarCarrito(carritoStorage);

      let botonEliminar = document.getElementById(`eliminar${producto.id}`);

      botonEliminar.addEventListener("click", () => {
        botonEliminar.parentElement.remove();
        carritoStorage = carritoStorage.filter((el) => el.id != producto.id);
        actualizarCarrito(carritoStorage);
      });
    });
  }

  array.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML += `<div class="card">
                        <div class="card-image">
                            <img src=${producto.img}>
                            <span class="card-title">${producto.nombre}</span>
                            <a class="btn-floating halfway-fab waves-effect waves-light red" id=boton${producto.id}><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${producto.desc}</p>
                            <p>Categoria: ${producto.categoria}</p>
                            <p> ${producto.precio}</p>
                        </div>
                      </div>`;

    contenedorProductos.appendChild(div);

    let boton = document.getElementById(`boton${producto.id}`);

    boton.addEventListener("click", () => {
      carritoIndex(producto.id);
    });
  });
}
