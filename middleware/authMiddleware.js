const jwt = require('jsonwebtoken');

// Verifying JWT Token
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized', message: 'Token expired' });
        }

        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }
};

// Check if user has specific role
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden', message: `This route requires ${allowedRoles.join(' or ')} role` });
        }

        next();
    };
};

module.exports = { verifyToken, authorizeRole };
