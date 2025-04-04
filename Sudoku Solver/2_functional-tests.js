const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const testPuzzles = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

chai.use(chaiHttp);

/*  These are agood set of functional tests to run:
  1.  Solve a puzzle with valid puzzle string: POST request to /api/solve
  2.  Solve a puzzle with missing puzzle string: POST request to /api/solve
  3.  Solve a puzzle with invalid characters: POST request to /api/solve
  4.  Solve a puzzle with incorrect length: POST request to /api/solve
  5.  Solve a puzzle that cannot be solved: POST request to /api/solve
  6.  Check a puzzle placement with all fields: POST request to /api/check
  7.  Check a puzzle placement with single placement conflict: POST request to /api/check
  8.  Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  9.  Check a puzzle placement with all placement conflicts: POST request to /api/check
  10. Check a puzzle placement with missing required fields: POST request to /api/check
  11. Check a puzzle placement with invalid characters: POST request to /api/check
  12. Check a puzzle placement with incorrect length: POST request to /api/check
  13. Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  14. Check a puzzle placement with invalid placement value: POST request to /api/check
*/

suite('Functional Tests', () => {

  suite('POST /api/solve', () => {
    test('Solve a puzzle with valid puzzle string', (done) => {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: testPuzzles[0][0] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, testPuzzles[0][1]);
          done();
        });
    });

    test('Solve a puzzle with missing puzzle string', (done) => {
      chai.request(server)
        .post('/api/solve')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Required field missing');
          done();
        });
    });

    test('Solve a puzzle with invalid characters', (done) => {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.A.3674.3.7.2..9.47...8..1..16....926914.37.' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

    test('Solve a puzzle with incorrect length', (done) => {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });

    test('Solve a puzzle that cannot be solved', (done) => {
      chai.request(server)
        .post('/api/solve')
        .send({ 
            puzzle: testPuzzles[5][0],
        })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Puzzle cannot be solved');
            done();
        })
    });
  });

  suite('POST /api/check', () => {
    test('Check a puzzle placement with all fields', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'A2',
          value: '3'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);
          done();
        });
    });

    test('Check a puzzle placement with single placement conflict', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'A1',
          value: '6'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict.length, 1);
          done();
        });
    });

    test('Check a puzzle placement with multiple placement conflicts', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'D1',
          value: '1'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.equal(res.body.conflict.length, 2);
          done();
        });
    });

    test('Check a puzzle placement with all placement conflicts', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'B1',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.equal(res.body.conflict.length, 3);
          done();
        });
    });

    test('Check a puzzle placement with missing required fields', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'A1'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Required field(s) missing');
          done();
        });
    });

    test('Check a puzzle placement with invalid characters', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[6][0],
          coordinate: 'A1',
          value: 'a'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

    test('Check a puzzle placement with invalid placement coordinate', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'A0',
          value: '1'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid coordinate');
          done();
        });
    });

    test('Post with a puzzle with with incorrect length', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          coordinate: "F8",
          value: "1",
          puzzle: testPuzzles[7][0]
        })
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
          done()
        })
    })

    test('Check a puzzle placement with invalid placement value', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: testPuzzles[0][0],
          coordinate: 'A1',
          value: '10'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid value');
          done();
        });
    });
  });
});