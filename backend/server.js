require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)
connectDB()

app.use(logger); // Use the logger middleware
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json());
app.use(cookieParser()); // Parse cookies
// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

// Use root routes
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/userRoutes'));

// Handle 404 errorss
app.all(/.*/, (req, res) => {  // ✅ also safe
  res.status(404).send('404 Not Found');
});
app.use(errorHandler); // Use the error handler middleware
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
console.log('Database URI:', process.env.DATABASE_URI || process.env.DATABASE_URL);