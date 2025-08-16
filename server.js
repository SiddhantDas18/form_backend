const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Import form routes
const formRoutes = require('./routes/formRoutes');
app.use('/api', formRoutes);

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
