const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    //Create an issue with every field: POST request to /api/issues/{project}
    suite('POST request to /api/issues/{project}', function() {
      test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Every field',
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Title');
            assert.equal(res.body.issue_text, 'text');
            assert.equal(res.body.created_by, 'Functional Test - Every field');
            assert.equal(res.body.assigned_to, 'Chai and Mocha');
            assert.equal(res.body.status_text, 'In QA');
            assert.equal(res.body.open, true);
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'updated_on');
            assert.property(res.body, '_id');
            done();
          });
      });
    })


    //Create an issue with only required fields: POST request to /api/issues/{project}
    suite('POST request to /api/issues/{project}', function() {
      test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Only required fields'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Title');
            assert.equal(res.body.issue_text, 'text');
            assert.equal(res.body.created_by, 'Functional Test - Only required fields');
            assert.equal(res.body.open, true);
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'updated_on');
            assert.property(res.body, '_id');
            done();
          });
      });
    })
    
    //Create an issue with missing required fields: POST request to /api/issues/{project}
    suite('POST request to /api/issues/{project}', function() {
      test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title',
            issue_text: 'text'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'required field(s) missing');
            done();
          });
      })
    })
    
    //View issues on a project: GET request to /api/issues/{project}
    suite('GET request to /api/issues/{project}', function() {
      test('View issues on a project: GET request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], '_id');
            done();
          });
      });
    })
    
    //View issues on a project with one filter: GET request to /api/issues/{project}
    suite('GET request to /api/issues/{project}', function() {
      test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test?open=true')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], '_id');
            done();
          });
      });
    })
    
    //View issues on a project with multiple filters: GET request to /api/issues/{project}
    suite('GET request to /api/issues/{project}', function() {
      test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test?open=true&created_by=Functional Test - Only required fields')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], '_id');
            done();
          })
    })
    
    //Update one field on an issue: PUT request to /api/issues/{project}
    suite('PUT request to /api/issues/{project}', function() {
      test('Update one field on an issue: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .end(function(err, res) {
            const id = res.body[0]._id;
            chai.request(server)
              .put('/api/issues/test')
              .send({
                _id: id,
                issue_title: 'New Title'
              })
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully updated');
                done();
              });
          });
      });
    })  

    
    //Update multiple fields on an issue: PUT request to /api/issues/{project}
    suite('PUT request to /api/issues/{project}', function() {
      test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .end(function(err, res) {
            const id = res.body[0]._id;
            chai.request(server)
              .put('/api/issues/test')
              .send({
                _id: id,
                issue_title: 'New Title',
                issue_text: 'New text'
              })
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully updated');
                done();
              });
          });
      });
    })
    
    //Update an issue with missing _id: PUT request to /api/issues/{project}
    suite('PUT request to /api/issues/{project}', function() {
      test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            issue_title: 'New Title',
            issue_text: 'New text'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'missing _id');
            done();
          });
      });
    })

    
    //Update an issue with no fields to update: PUT request to /api/issues/{project}
    suite('PUT request to /api/issues/{project}', function() {
      test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .end(function(err, res) {
            const id = res.body[0]._id;
            chai.request(server)
              .put('/api/issues/test')
              .send({
                _id: id
              })
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'no update field(s) sent');
                done();
              });
          });
      });
    })

    
    //Update an issue with an invalid _id: PUT request to /api/issues/{project}
    suite('PUT request to /api/issues/{project}', function() {
      test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: 123,
            issue_title: 'New Title',
            issue_text: 'New text'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'could not update');
            done();
          }
        );
      })
    })
    
    //Delete an issue: DELETE request to /api/issues/{project}
    suite('DELETE request to /api/issues/{project}', function() {
      test('Delete an issue: DELETE request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .end(function(err, res) {
            const id = res.body[0]._id;
            chai.request(server)
              .delete('/api/issues/test')
              .send({
                _id: id
              })
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully deleted');
                done();
              });
          });
      });
    })})
    
    //Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
    suite('DELETE request to /api/issues/{project}', function() {
      test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .send({
            _id: 123
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'could not delete');
            done();
          });
      });
    })

    
    //Delete an issue with missing _id: DELETE request to /api/issues/{project}
    suite('DELETE request to /api/issues/{project}', function() {
      test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'missing _id');
            done();
          });
      });
    })

});
