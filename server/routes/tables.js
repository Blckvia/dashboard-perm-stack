const express = require('express');

const tablesController = require('../controllers/tables');

const router = express.Router();

// tables/author

router.get('/author', tablesController.getAuthorTable);

router.delete('/author/:id', tablesController.deleteFromAuthor);

router.post('/author/item', tablesController.createItem);

router.put('/author/:id', tablesController.updateAuthor);

// tables/books

router.get('/books', tablesController.getBooksTable);

module.exports = router;
