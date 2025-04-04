class SudokuSolver {

  validate(puzzleString) {
    // Check if the puzzle string is valid
    if (puzzleString.length !== 81) {
      return false;
    }
    const regex = /^[1-9.]+$/;
    return regex.test(puzzleString); 
 }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = Math.floor(row / 9) * 9;
    const rowEnd = rowStart + 9;

    //traverse the 9 elements of the row
    for (let i = rowStart; i < rowEnd; i++) {
      //skip orig value
      if (i === row * 9 + column) {
        continue;
      }

      if (puzzleString[i] === value) {
        return false;
      }
    }
    return true;

  }

  checkColPlacement(puzzleString, row, column, value) {
    const colStart = column % 9;
    for (let i = 0; i < 9; i++) {
      //skip orig value
      if (i === row) {
        continue;
      }

      if (puzzleString[i * 9 + colStart] === value) {
        return false;
      }
    }
    return true; 
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(column / 3) * 3;

    for (let i = regionRow; i < regionRow + 3; i++) {
      for (let j = regionCol; j < regionCol + 3; j++) {
        //skip orig value
        if (i === row && j === column) {
          continue;
        }

        if (puzzleString[i * 9 + j] === value) {
          return false;
        }
      }
    }
    return true;

  }

  checkPlacement(puzzleString, row, column, value) {
    const conflicts = [];

    //console.log('Checking placement for', row, column, value, puzzleString);

    if (!this.checkRowPlacement(puzzleString, row, column, value)) {
      conflicts.push('row');
    }
    if (!this.checkColPlacement(puzzleString, row, column, value)) {
      conflicts.push('column');
    }
    if (!this.checkRegionPlacement(puzzleString, row, column, value)) {
      conflicts.push('region');
    }

    return conflicts;
  }

  checkBoard(board, row, column, value) {
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(column / 3) * 3;

    //traverse the 9 elements of the row/columns
    for (let i = 0; i < 9; i++) {
      if (board[i][column] === value) {
        return false;
      }
      if (board[row][i] === value) {
        return false;
      }
    }

    //traverse the 9 elemnts of region
    for (let i = regionRow; i < regionRow + 3; i++) {
      for (let j = regionCol; j < regionCol + 3; j++) {
        if (board[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }



  solve(puzzleString) {

    // Check if the puzzle string is valid
    if (!this.validate(puzzleString)) {
      return false;
    }

    // Convert the puzzle string into a 2D array
    // make board recursive friendly
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push(puzzleString.slice(i * 9, i * 9 + 9).split(''));
    }

    // Solve the Sudoku puzzle using backtracking
    const solveSudoku = (row, col) => {
      if (row === 9) {
        return true; // Solved
      }
      if (col === 9) {
        return solveSudoku(row + 1, 0); // Move to next row
      }
      if (board[row][col] !== '.') {
        return solveSudoku(row, col + 1); // Skip filled cells
      }

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        if (this.checkBoard(board, row, col, value)) {
          board[row][col] = value;
          if (solveSudoku(row, col + 1)) {
            return true;
          }
          board[row][col] = '.'; // Backtrack
        }
      }
      //console.log('No valid number found for', row, col, board[row][0], board[row][1], board[row][2], board[row][3], board[row][4], board[row][5], board[row][6], board[row][7], board[row][8]);
      return false;
    };

    if (solveSudoku(0, 0)) {
      return board.flat().join('');
    } else {
      return false; // No solution found
    }
  }
}

module.exports = SudokuSolver;

