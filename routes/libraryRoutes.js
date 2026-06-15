const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController.js');
router.get('/books', libraryController.getAllBooks);
router.get('/books/:id', libraryController.getBookById);
router.get('/authors', libraryController.getAllAuthors);
module.exports =router;
