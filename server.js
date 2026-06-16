const express = require('express');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
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
app.use(express.json());
app.use(authRoutes);
app.use('/api', libraryRoutes);
app.use((req,res)=>{
  res.status(404).json({error:"Route not found", path: req.originalUrl});
});
function errorHandler(err, req, res, next) {
  console.error(err.stack);  // or err.message — for your own debugging
  res.status(500).json({ error: "Something went wrong", message: err.message });
}
app.use(errorHandler);
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});