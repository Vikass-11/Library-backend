const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController.js');
router.get('/books', libraryController.getAllBooks);
router.get('/books/:id', libraryController.getBookById);
router.get('/author', libraryController.getAllAuthors);
module.exports =router;
