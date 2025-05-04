document.addEventListener("DOMContentLoaded", () => {
  fetch("/productos")
    .then(res => res.json())
    .then(productos => {
      const lista = document.getElementById("lista-productos");
      productos.forEach(producto => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombrePrenda} - Talla: ${producto.talla} - Color: ${producto.color} - Precio: $${producto.precio} - Stock: ${producto.stock}`;
        lista.appendChild(item);
      });
    });

  const formulario = document.getElementById("formulario-producto");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombrePrenda = document.getElementById("nombrePrenda").value;
    const talla = document.getElementById("talla").value;
    const color = document.getElementById("color").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    fetch("/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombrePrenda, talla, color, precio, stock })
    })
    .then(res => res.json())
    .then(producto => {
      alert("Prenda agregada con éxito");
      location.reload();
    });
  });
});
