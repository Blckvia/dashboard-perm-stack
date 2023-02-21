const Author = require('../models/author');
const Books = require('../models/books');

const { validationResult } = require('express-validator');

exports.getAuthorTable = async (req, res, next) => {
    // try {
    //     const authors = Author.findAll()
    //     if(!authors) {
    //         const error = new Error('Could not find authors.')
    //         err.statusCode = 422
    //         throw error;
    //     }
    //     res.status(200).json({message: 'Fetched table succesfully', authors: authors})
    // } catch (err) {
    //     if (!err.statusCode) {
    //         err.statusCode = 500;
    //     }
    //     next(err);
    // }
    Author.findAll()
    .then(authors => {
        if (!authors) {
            const error = new Error('Could not find authors.')
            err.statusCode = 422
            throw error;
        }
        res.status(200).json({message: 'Fetched table succesfully', authors: authors})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteFromAuthor = (req, res, next) => {
    const id = req.params.id;
    Author.destroy({where: {author_id: id}})
    .then(author => {
        if (!author) {
            const error = new Error('Could not find an Author');
            error.statusCode = 404;
            throw error;
        };
        res.status(200).json({message: 'Author was deleted.'})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.createItem = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(
            'Validation failed, entered data is incorrect'
        );
        error.statusCode = 422;
        throw error;
    }
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const birth_date = req.body.birth_date
    const death_age = req.body.death_age
    const rating = req.body.rating
    Author.create({
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        death_age: death_age,
        rating: rating
    })
    .then(result => {
        res.status(201).json({
            message: 'Item added successfully!',
            item: result
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getBooksTable = async (req, res, next) => {
    // try {
    //     const authors = Author.findAll()
    //     if(!authors) {
    //         const error = new Error('Could not find authors.')
    //         err.statusCode = 422
    //         throw error;
    //     }
    //     res.status(200).json({message: 'Fetched table succesfully', authors: authors})
    // } catch (err) {
    //     if (!err.statusCode) {
    //         err.statusCode = 500;
    //     }
    //     next(err);
    // }
    Books.findAll()
    .then(books => {
        if (!books) {
            const error = new Error('Could not find books.')
            err.statusCode = 422
            throw error;
        }
        res.status(200).json({message: 'Fetched table succesfully', books: books})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};