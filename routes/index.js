var express = require('express');
var router = express.Router();

const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  };
}

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("/books");
});

// GET all books (read...)
router.get('/books', asyncHandler (async (req, res) => {
  const books = await Book.findAll(); //will hold all return entries
  res.render('index', { title: 'All Books' , books });
  // res.json(books);   //delete 
}));

//* GET /books/new - Shows the create new book form
router.get('books/new', asyncHandler (async (req, res) => {
  res.render('new-book', { title: 'New Book' });
  // res.json(books); 
}));


//*  POSTS a new book to the database (create...)
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect(`/books/${book.id}`);
  } catch (error) {
    res.render('new-book', {book, errors: error.errors, title: 'New Book' });
}  }));


// * GET Shows book detail form
router.get('books/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("update-book" , { book }); 
  } else {
    const err = new Error();
    err.status=(404);
    err.message= "Sorry, Page not Found!";
    
  }
}));

// * POST /books/:id - Updates book info in the database

router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  try {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.update(req.body);
    res.redirect("/books/" + book.id); 
  } else {
    res.sendStatus(404);
  } 
  }catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('update-book', { book, errors:error.errors,  title: 'Book update' });

    } else {
      throw error;
    }

  }
}

));


// * POST /books/:id/delete


router.post("/books/:id/delete", asyncHandler (async (req, res, next) => {

  // Find a record---
  const book = await Book.findByPk(req.params.id);
  if (book) {
  //  Delete a record---
   await book.destroy();
      res.redirect('/books');
} else {
  const err = new Error();
    err.status=(404);
    err.message= "Sorry, Page not Found!";
    
}
  
}
)
);

module.exports = router;
