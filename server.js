
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json());

// Extra CORS headers for preflight safety
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});


// Import form routes
const formRoutes = require('./routes/formRoutes');
app.use('/api', formRoutes);

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Debug route to list registered routes (useful on deployed hosts)
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  const stack = app._router && app._router.stack ? app._router.stack : [];

  const extract = (layer, basePath = '') => {
    if (layer.route && layer.route.path) {
      const path = basePath + layer.route.path;
      const methods = Object.keys(layer.route.methods || {}).map(m => m.toUpperCase());
      routes.push({ path, methods });
    } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
      const newBase = basePath + (layer.regexp && layer.regexp.source ? '' : '');
      layer.handle.stack.forEach(l => extract(l, basePath));
    }
  };

  stack.forEach(layer => extract(layer));
  res.json({ success: true, routes });
});

// Generic error handler to ensure stack traces are logged
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(500).json({ success: false, error: err && err.message ? err.message : 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
