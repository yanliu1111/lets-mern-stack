const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Use root routes
app.use('/', require('./routes/root'));

// Handle 404 errors
app.all(/.*/, (req, res) => {  // ✅ also safe
  res.status(404).send('404 Not Found');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});