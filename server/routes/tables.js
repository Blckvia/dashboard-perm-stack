const express = require('express');
const { body } = require('express-validator');

const tablesController = require('../controllers/tables');

const router = express.Router();

// tables/author

router.get('/author', tablesController.getAuthorTable);

router.delete('/author/:id', tablesController.deleteFromAuthor);

router.post('/author/item', [
  body('first_name').isEmpty().trim(),
  body('last_name').isEmpty().trim(),
  body('birth_date', 'Invalid Date').matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
], tablesController.createItem);

// tables/books

router.get('/books', tablesController.getBooksTable);

module.exports = router;