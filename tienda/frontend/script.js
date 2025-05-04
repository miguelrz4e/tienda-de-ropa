function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${producto.nombrePrenda}</h3>
      <p>Talla: ${producto.talla}</p>
      <p>Color: ${producto.color}</p>
      <p>Precio: $${producto.precio}</p>
      <p>Stock: ${producto.stock}</p>
    `;
    contenedor.appendChild(div);
  });
}

fetch("/productos")
  .then(res => res.json())
  .then(data => mostrarProductos(data));
