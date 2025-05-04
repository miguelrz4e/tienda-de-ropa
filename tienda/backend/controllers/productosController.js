const productos = [];
const ventas = [];

exports.getProductos = (req, res) => {
  res.json(productos);
};

exports.addProducto = (req, res) => {
  const { nombre, precio, stock } = req.body;
  const nuevoProducto = { id: productos.length + 1, nombre, precio, stock };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
};

exports.getVentas = (req, res) => {
  res.json(ventas);
};

exports.addVenta = (req, res) => {
  const { productoId, cantidad, total } = req.body;
  const nuevaVenta = { id: ventas.length + 1, productoId, cantidad, total, fecha: new Date().toISOString() };
  ventas.push(nuevaVenta);
  res.status(201).json(nuevaVenta);
};