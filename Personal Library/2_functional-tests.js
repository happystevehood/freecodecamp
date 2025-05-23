/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
//const api = require('../routes/api');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
 // test('#example Test GET /api/books', function(done){
 //    chai.request(server)
 //     .get('/api/books')
 //     .end(function(err, res){
 //       assert.equal(res.status, 200);
 //       assert.isArray(res.body, 'response should be an array');
 //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
 //       assert.property(res.body[0], 'title', 'Books in array should contain title');
 //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
 //       done();
 //     });
 // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  //keep track of the book id
  //this will be used to test the PUT and DELETE routes
  let _id = 0;
  let title = '';

  server_string = 'http://localhost:3000';

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server_string)
          .post("/api/books")
          .send({title: 'test title #1'})
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.equal(res.body.title, 'test title #1', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server_string)
          .post('/api/books')
          .send({})
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server_string)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200,"Response status should be 200");
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            _id = res.body[0]._id;
            title = res.body[0].title;
            done();
          })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server_string)
          .get('/api/books/12345')
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "no book exists","the response must be no book exists");
            done();
          });          
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server_string)
          .get(`/api/books/${_id}`)
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.isArray(res.body.comments, 'Books in array should contain comments');
            assert.equal(res.body._id, _id, "The book id should be the same as the one in the database");
            assert.equal(res.body.title, title, 'Books in array should contain title');
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server_string)
          .post(`/api/books/${_id}`)
          .send({comment: "test comment"})
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server_string)
          .post(`/api/books/${_id}`)
          .send({})
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.equal(res.text, 'missing required field comment', 'Books in array should contain comments');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server_string)
          .post('/api/books/12345')
          .send({comment: 'test comment #2'})
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.equal(res.text, 'no book exists', "the response must be no book exists");
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server_string)
          .delete(`/api/books/${_id}`)
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.equal(res.text, 'delete successful', "the response must be delete successful");
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server_string)
          .delete('/api/books/12345')
          .end(function(err, res){
            assert.equal(res.status, 200, "Response status should be 200");
            assert.equal(res.text, 'no book exists', "the response must be no book exists");
            done();
          });
      });

    });

  });

});
