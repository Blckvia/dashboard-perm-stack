const Author = require('../models/author');

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
    Author.findById(id)
    .then(author => {
        if (!author) {
            const error = new Error('Could not find an Author');
            error.statusCode = 404;
            throw error;
        };
        author.destroy();
        res.status(200).json({message: 'Author was deleted.'})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })

}