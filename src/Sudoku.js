import React, { useState, useEffect } from 'react';

const isLeftColBold = ( colIndex) => {
    return (
       colIndex === 0 || colIndex===3 || colIndex ===6
    );
  };

  const isRightColBold = ( colIndex) => {
    return (
       colIndex === 2 || colIndex===5 || colIndex ===8
    );
  };

function SudokuBoard () {
    const [board, setBoard] = useState([]);

  useEffect(() => {
    const generateSudokuBoard = () => {
      const puzzle = createSudokuPuzzle();
      setBoard(puzzle);
    };

    generateSudokuBoard();
  }, []);

    const createSudokuPuzzle = () => {
        const puzzle = Array.from({ length: 9 }, () => Array(9).fill(0));
       
    const isValidMove = (row, col, num) => {
        for (let i = 0; i < 9; i++) {
          if (puzzle[row][i] === num || puzzle[i][col] === num) {
            return false;
          }
        }
  
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
  
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (puzzle[startRow + i][startCol + j] === num) {
              return false;
            }
          }
        }
  
        return true;
      };
  
      const solvePuzzle = () => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (puzzle[row][col] === 0) {
              for (let num = 1; num <= 9; num++) {
                if (isValidMove(row, col, num)) {
                  puzzle[row][col] = num;
                  if (solvePuzzle()) {
                    return true;
                  }
                  puzzle[row][col] = 0;
                }
              }
              return false;
            }
          }
        }
        return true;
      };
  
      solvePuzzle();
  
      // Remove some numbers to create the puzzle
      const numToRemove = 40; // You can adjust the difficulty by changing this number
  
      for (let i = 0; i < numToRemove; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        puzzle[row][col] = 0;
      }
  
      return puzzle;
       
      }

const handleCellChange = (event, rowIndex, colIndex) => {
    const updatedBoard = [...board];
    const inputValue = parseInt(event.target.value, 10);

    // Validate the input
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 9) {
      updatedBoard[rowIndex][colIndex] = inputValue;
    } else {
      updatedBoard[rowIndex][colIndex] = 0;
    }
    setBoard(updatedBoard);
    
  };

  return (
    <div className="sudoku-board">
  {board.map((row, rowIndex) => (
    <React.Fragment key={rowIndex}>
      {row.map((cell, colIndex) => (
        <div key={colIndex} className={`sudoku-cell ${isLeftColBold(colIndex) ? 'bold-border-left' : ''} ${isRightColBold(colIndex) ? 'bold-border-right' : ''} ${rowIndex % 3 === 2 ? 'bold-border-bottom' : ''} ${rowIndex % 3 === 0 ? 'bold-border-top' : ''}`}>
          {cell !== 0 ? cell : 
          <input className="sudoku-input"
                    //   type="number"
                      value={""}
                      type="tel"
                      pattern="[1-9]"
                      onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
                    />}
        </div>
      ))}
    </React.Fragment>
  ))}
</div>
  );
};

export default SudokuBoard;