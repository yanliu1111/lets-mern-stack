const allowedOrigins = require('./allowedOrigins');
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // allow postman or other non-origin requests
      // If the origin is in the allowedOrigins array or if the request has no origin (like from Postman)
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // For legacy browser support
};

module.exports = corsOptions;