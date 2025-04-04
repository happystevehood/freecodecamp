'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      //console.log('Check puzzle:', puzzle);
      //console.log('Check coordinate, value:', coordinate, value);

      // Validate the input
      if (!puzzle || !coordinate || !value) {
        console.log('Missing required fields');
        return res.json({ error: 'Required field(s) missing' });
      }

      if (puzzle.length !== 81) {
        console.log('Expected puzzle to be 81 characters long', puzzle.length);
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      if (solver.validate(puzzle) === false) {
        console.log('Invalid characters in puzzle');
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      // Validate the coordinate
      const coordinateRegex = /^[A-I][1-9]$/;
      if (!coordinateRegex.test(coordinate)) {
        console.log('Invalid coordinate format');
        return res.json({ error: 'Invalid coordinate' });
      }

      // Validate the value
      const valueRegex = /^[1-9]$/;
      if (!valueRegex.test(value)) {
        console.log('Invalid value format');
        return res.json({ error: 'Invalid value' });
      }

      const [row, col] = coordinate.split('');
      const rowIndex = row.charCodeAt(0) - 'A'.charCodeAt(0);
      const colIndex = parseInt(col) - 1;

      if (rowIndex < 0 || rowIndex > 8 || colIndex < 0 || colIndex > 8) {
        //This should not happen because of the regex check
        console.log('Invalid row or column index');
        return res.json({ error: 'Invalid coordinate' });
      }

      // Check the puzzle
      const conflict = solver.checkPlacement(puzzle, rowIndex, colIndex, value);

      if (conflict.length === 0) {
        //console.log('No conflicts found', conflict);
        return res.json({ valid: true });
      } else {
        //console.log('Conflicts found:', conflict);
        return res.json({ valid: false, conflict: conflict });
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body;

      //console.log('Received puzzle:', puzzle);

      // Validate the input
      if (!puzzle) {
        console.log('Puzzle is missing');
        return res.json({ error: 'Required field missing' });
      }

      if (puzzle.length !== 81) {
        console.log('Puzzle length is not 81', puzzle.length);
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      if (solver.validate(puzzle) === false) {
        console.log('Invalid characters in puzzle');
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      const solution = solver.solve(puzzle);

      if (solution === false) {
        //console.log('Puzzle cannot be solved');
        return res.json({ error: 'Puzzle cannot be solved' });
      } else {
        //console.log('Solved puzzle:', solution);
        return res.json({ "solution": solution });
      }
    });
};
