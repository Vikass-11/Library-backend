const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController.js');
const { verifyToken, authorizeByRoleAndMethod } = require('../middleware/authMiddleware.js');

router.use(verifyToken);
router.use(authorizeByRoleAndMethod);

router.get('/books', libraryController.getAllBooks);
router.post('/books', libraryController.createBook);
router.get('/books/:id', libraryController.getBookById);
router.get('/authors', libraryController.getAllAuthors);

module.exports = router;