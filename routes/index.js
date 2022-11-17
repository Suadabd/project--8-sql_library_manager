var express = require('express');
var router = express.Router();

const Book = require('../models').Book;

/// Reduced error handling code when using async/await (no need for try block)
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error){
      next(error);
    }
  };
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/books");
  next();
});


// GET all books 
router.get('/books', asyncHandler (async (req, res, next) => {
  const books = await Book.findAll(); //will hold all return entries
  // res.render('index', { title: 'All Books' });
  res.json(books);   //delete l8tr
}));

// * get /books/new -Create new book form
router.get('/new', asyncHandler (async (req, res) => {
  res.render('/books/new', { title: 'New Book' });
}));

// *  Posts a new book to the database
router.get('/books/new', asyncHandler (async (req, res) => {
  res.render('/books/new', { title: 'New Book' });
}));


// * GET Shows book detail form


// * Post /books/:id - Updates book info in the database


// * Post /books/:id/delete






module.exports = router;
