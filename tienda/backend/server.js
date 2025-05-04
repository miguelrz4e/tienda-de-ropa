const express = require('express');
const session = require('express-session');
const path = require('path');
const { users, sales, addUser, authenticateUser, addSale } = require('./data.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(session({
  secret: 'supermercado-secret',
  resave: false,
  saveUninitialized: true
}));

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/sales', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  res.sendFile(path.join(__dirname, '../frontend/sales.html'));
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (addUser(username, password)) {
    res.status(201).json({ message: 'Usuario creado' });
  } else {
    res.status(400).json({ message: 'Usuario ya existe' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (authenticateUser(username, password)) {
    req.session.user = username;
    res.status(200).json({ message: 'Login exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

app.post('/api/sales', (req, res) => {
  const { product, price, quantity } = req.body;
  if (!req.session.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  addSale(req.session.user, product, price, quantity);
  res.status(201).json({ message: 'Venta registrada' });
});

app.get('/api/sales', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  res.json(sales);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});