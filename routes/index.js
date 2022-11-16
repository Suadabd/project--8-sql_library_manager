var express = require('express');
var router = express.Router();

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
});


const Book = require('../models').Book;



// GET all books
router.get('/books', asyncHandler (async (req, res, next) => {
  const books = await Book.findAll(); //will hold all return entries
  // res.render('index', { title: 'All Books' });
  res.json(books);   //delete l8tr
}));


module.exports = router;
