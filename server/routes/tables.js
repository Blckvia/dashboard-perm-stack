const express = require('express');
const tablesController = require('../controllers/tables');

const router = express.Router();

// GET author table

router.get('/author', tablesController.getAuthorTable);

router.delete('/author/:id', tablesController.deleteFromAuthor);

module.exports = router;