document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const ventasContainer = document.getElementById('ventas-container');
    const addProductoForm = document.getElementById('add-producto-form');
    const addVentaForm = document.getElementById('add-venta-form');
    const loginButton = document.getElementById('login-button');
    
    // Inicializar Netlify Identity
    netlifyIdentity.init();
    
    // Botón de inicio de sesión
    loginButton.addEventListener('click', () => {
      netlifyIdentity.open('login');
    });
    
    // Netlify Identity eventos
    netlifyIdentity.on('login', (user) => {
      productosContainer.innerHTML = '<p>Bienvenido, usuario autenticado!</p>';
      fetchProductos();
      fetchVentas();
    });
    
    // Obtener productos
    async function fetchProductos() {
      try {
        const response = await fetch('/.netlify/functions/productos/productos');
        const productos = await response.json();
        
        productosContainer.innerHTML = productos.map(producto => `
          <div class="producto-card">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
          </div>
        `).join('');
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }
    
    // Obtener ventas
    async function fetchVentas() {
      try {
        const response = await fetch('/.netlify/functions/ventas/ventas');
        const ventas = await response.json();
        
        ventasContainer.innerHTML = ventas.map(venta => `
          <div class="venta-card">
            <p>Producto ID: ${venta.productoId}</p>
            <p>Cantidad: ${venta.cantidad}</p>
            <p>Total: $${venta.total}</p>
            <p>Fecha: ${new Date(venta.fecha).toLocaleDateString()}</p>
          </div>
        `).join('');
      } catch (error) {
        console.error('Error al obtener ventas:', error);
      }
    }
    
    // Agregar producto
    addProductoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre').value;
      const precio = parseFloat(document.getElementById('precio').value);
      const stock = parseInt(document.getElementById('stock').value);
      
      try {
        await fetch('/.netlify/functions/productos/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, precio, stock })
        });
        
        addProductoForm.reset();
        fetchProductos();
      } catch (error) {
        console.error('Error al agregar producto:', error);
      }
    });
    
    // Agregar venta
    addVentaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const productoId = parseInt(document.getElementById('producto-id').value);
      const cantidad = parseInt(document.getElementById('cantidad').value);
      const total = parseFloat(document.getElementById('total').value);
      
      try {
        await fetch('/.netlify/functions/ventas/ventas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productoId, cantidad, total })
        });
        
        addVentaForm.reset();
        fetchVentas();
      } catch (error) {
        console.error('Error al registrar venta:', error);
      }
    });
  });