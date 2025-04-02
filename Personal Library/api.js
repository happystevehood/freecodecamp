/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

require('dotenv').config();
const { ObjectId } = require("mongodb");

module.exports = function (app, Book) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      getAllBooks(Book, (err, data) => {
        if (err)
          res.status(200).json(err);
        else if (data)
          res.status(200).json(data);
      });
   })
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.status(200).send('missing required field title');
      }
      const book = createBook(title, Book, (err, data) => {
        if (err)
          res.status(200).json(err);
        else if (data)
          res.status(200).json(data);
      });

      
    })
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      deleteAllBooks(Book,  (err, data) => {
        if (err)
          res.status(200).json(err);
        else if (data)
          res.status(200).send('complete delete successful');
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = getBookById(bookid, Book, (err, data) => {
        if (err)
          res.status(200).send('no book exists');
        if (data)
          res.status(200).json(data);
      });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) {
        return res.status(200).send('missing required field comment');
      }
      const book = getBookById(bookid, Book, (err, data) => {
        if (err){
          res.status(200).send('no book exists');
        }

        else if (data)
          addCommentToBook(bookid, comment, Book, (err1, data) => {
            if (err1)
            {
              res.status(200).json(err1);
            }      
            if (data)
              res.status(200).json(data);
        });
      });
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const book = getBookById(bookid, Book, (err, data) => {
        if (err)
          res.status(200).send('no book exists');
        if (data)
        {
          if (!book) {
            return res.status(200).send('no book exists');
          }
          else
          {
            deleteBook(bookid, Book, (err1, data) => {
              if (err1)
                res.status(200).json(err1);
              if (data)
                res.status(200).send('delete successful');
            });
          }
        }
      });
    });

  // helper Database functions
  async function getAllBooks(Book, done) {

    try{
      const book = await Book.find({}, { _id: 1, title: 1, comments: 1 }).toArray();
      // Check if the bookres is an array
      if (!Array.isArray(book)) {
        throw new Error('Book response is not an array');
      }
 
      done(null, book);
    } catch (err) {
      console.error('Error getting all books:', err);
      done(err);
    }

  }

  async function getBookById(id, Book, done) {
    try{
      const book = await Book.findOne({ _id: ObjectId(id) });
      // Check if the book exists
      if (book == null) {
        done('no book exists');
      }
      else{
        done(null, {
          _id: book._id,
          title: book.title,
          comments: book.comments,
        });
      }
    } catch (err) {
      done('no book exists');
    }
  }

  async function createBook(title, Book, done) {

    try{
      // Check if the title is valid
      if (!title || typeof title !== 'string') {
        throw new Error('Invalid title');
      }

      const book = await Book.insertOne({
        title: title,
        comments: [],
        commentcount: 0
      });
  
      // Check if the insertedId is valid
      if (!ObjectId.isValid(book.insertedId)) {
        throw new Error('Invalid book ID');
      }
      // Check if the book object is valid
      if (!book || !book.ops || book.ops.length === 0) {
        throw new Error('Invalid book object');
      }
      // Check if the book has the expected properties
      if (!book.ops[0]._id || !book.ops[0].title) {
        throw new Error('Book object does not have the expected properties');
      }
      // Check if the book has an empty comments array
      if (!Array.isArray(book.ops[0].comments)) {
        throw new Error('Book object does not have an empty comments array');
      }
  
      // Find the book we just inserted
      const findBook = await Book.findOne({ _id: book.insertedId });
  
      // Return the book object instead of the _id
      done(null, { title: findBook.title, '_id': findBook._id });

    }
    catch (err) {
      console.error('Error creating book:', err);
      return done(err);
    }
  }   

  async function addCommentToBook(id, comment, Book, done  ) {

    try{

      // Check if the comment is valid
      if (!comment || typeof comment !== 'string') {
        //console.log('Invalid comment');
        throw new Error('missing required field comment');
      }

      const book = await Book.findOne({ _id: ObjectId(id) });

      // Check if the book exists
      if (!book) {
        //console.log('Book not found');
        throw new Error('no book exists');
      }

      const updatedBook = await Book.findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { commentcount: 1 },  $push: { comments: comment } }, { returnDocument: 'after' });

      //Not each book has a commentcount property
      done(null, updatedBook.value);
    }
    catch (err) {
      console.error('Error adding comment:', err);
      return done(err);
    }

  }

  async function deleteBook(id, Book, done) {

    try{
      const book = await Book.findOne({ _id: ObjectId(id) });
      // Check if the book exists
      if (!book) {
        throw new Error('Book not found');
      }
      // Check if the book has the expected properties
      else if (!book._id || !book.title) {
        throw new Error('Book object does not have the expected properties');
      }
      else{
        done(null, 'delete successful');
      }

    }
    catch (err) {
      return done(err);
    }
  }
  async function deleteAllBooks(Book, done) {

    try {
      const book = await Book.deleteMany({});
        done(null, 'delete successful');
    } catch (e) {
      // catch errors
      done('no book exists');
    }

  }

  //404 Not Found Middleware
  app.use(function (req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

};

