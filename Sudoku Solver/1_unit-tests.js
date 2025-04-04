const chai = require('chai');
const assert = chai.assert;

const testPuzzles = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

    suite('validate', () => {
        test('Valid puzzle string', () => {
            solver = new Solver();
            assert.equal(solver.validate('123456789123456789123456789123456789123456789123456789123456789123456789123456789'), true);
        });
        test('Invalid puzzle string', () => {
            solver = new Solver();
            assert.equal(solver.validate('1.2.3.4.5.6.7.8.90'), false);
        });
    });

    suite('checkPlacement', () => {
        test('Valid placement', () => {
            solver = new Solver();
            assert.equal(solver.checkPlacement(testPuzzles[0][0], 0, 1, '3').length, 0);
        });
        test('Invalid placement', () => {
            solver = new Solver();
            assert.notEqual(solver.checkPlacement('123456789123456789123456789123456789123456789123456789123456789123456789123456789', 0, 0, '1').length, 0);
        });
    });
    suite('checkRowPlacement', () => {
        test('Valid row placement', () => {
            solver = new Solver();
            assert.equal(solver.checkRowPlacement(testPuzzles[0][0], 0, 1, '3'), true);
        });
        test('Invalid row placement', () => {
            solver = new Solver();
            assert.equal(solver.checkRowPlacement('123456789123456789123456789123456789123456789123456789123456789123456789123456789', 0, 1, '1'), false);
        });
    });
    suite('checkColPlacement', () => {
        test('Valid column placement', () => {
            solver = new Solver();
            assert.equal(solver.checkColPlacement(testPuzzles[0][0], 0, 1, '3'), true);
        });
        test('Invalid column placement', () => {
            solver = new Solver();
            assert.equal(solver.checkColPlacement(testPuzzles[0][0], 3, 0, '3'), false);
        });
    });

    suite('checkRegionPlacement', () => {
        test('Valid region placement', () => {
            solver = new Solver();
            assert.equal(solver.checkRegionPlacement(testPuzzles[0][0], 0, 1, '3'), true);
        });
        test('Invalid region placement', () => {
            solver = new Solver();
            assert.equal(solver.checkRegionPlacement('123456789123456789123456789123456789123456789123456789123456789123456789123456789', 0, 1, '1'), false);
        });
    }); 

    suite('solve tests', function () {
        test('solution 0 tests', function () {
          let test = [...testPuzzles[6][0]]
          assert.isFalse(solver.solve(test))
        })
    
        test('solution 1 tests', function () {
          let test = [...testPuzzles[7][0]]
          assert.isFalse(solver.solve(test))
        })
    });
});
