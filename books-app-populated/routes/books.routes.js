const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const Book = require('../models/book.model')
const Author = require('../models/author.model')            // modelo refrenciado

// Endpoints
router.get('/', (req, res) => res.send('inicio libros'))




// Books list
router.get('/listado', (req, res) => {

    Book
        .find()
        .select('title')
        .then(books => res.render('books/books-list', { books, error: req.query.error }))
        .catch(err => console.log('ERROR:', err))
})




// Book details
router.get('/detalles/:book_id', (req, res) => {

    const book_id = req.params.book_id

    if (!mongoose.Types.ObjectId.isValid(book_id)) {
        res.redirect('/libros/listado?error=El ID del libro no es válido')
        return
    }

    Book
        .findById(book_id)
        .populate('author')         // nombre del campo
        .then(book => res.render('books/book-details', book))
        .catch(err => console.log(err))
})




// New book form
router.get('/nuevo-libro', (req, res) => res.render('books/new-book-form'))

router.post('/nuevo-libro', (req, res) => {

    const { title, author, description, rating } = req.body

    Book
        .create({ title, rating, description, author })
        // .then(response => res.redirect('/libros/listado'))
        .then(book => res.redirect(`/libros/detalles/${book._id}`))
        .catch(err => console.log(err))
})





// Edit book form
router.get('/editar/:book_id', (req, res) => {

    const book_id = req.params.book_id

    Book
        .findById(book_id)
        .then(book => res.render('books/edit-book-form', book))
        .catch(err => console.log(err))
})

router.post('/editar/:book_id', (req, res) => {

    const { title, author, description, rating } = req.body
    const book_id = req.params.book_id

    Book
        .findByIdAndUpdate(book_id, { title, author, description, rating })
        .then(book => res.redirect(`/libros/detalles/${book._id}`))
        .catch(err => console.log(err))
})



module.exports = router