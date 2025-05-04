const express = require('express');
const cors = require('cors');
const app = express();
const productosRoutes = require('../routes/productosRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});