const express = require('express');
const rateLimit = require('express-rate-limit');
const PORT = 3000;
const app = express();
const libraryRoutes = require('./routes/libraryRoutes.js');

function requestLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}

// Rate limiting middleware - 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestLogger);
app.use(limiter);
app.use('/api', libraryRoutes);
function errorHandler(err, req, res, next) {
  console.error(err.stack);  // or err.message — for your own debugging
  res.status(500).json({ error: "Something went wrong", message: err.message });
}
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));