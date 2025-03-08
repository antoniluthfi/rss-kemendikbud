const express = require("express");
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Use routes
app.use('/', routes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
