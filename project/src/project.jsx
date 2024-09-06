import React, { useState } from "react";
import style from "./project.module.css";

function Sodoku() {
  const [board, setBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(""))
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (row, col, value) => {
    // Ensure value is a single digit between 1 and 9, or empty
    if (/^[1-9]?$/.test(value)) {
      const newBoard = [...board];
      newBoard[row][col] = value ? value : "";
      setBoard(newBoard);
    }
  };

  const isOk = (board, row, col, target) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === target) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === target) {
        return false;
      }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === target) {
          return false;
        }
      }
    }
    return true;
  };

  const validateBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value !== "" && !isOk(board, row, col, value)) {
          return false;
        }
      }
    }
    return true;
  };

  const solve = (board, row = 0, col = 0) => {
    if (row === 9) return true;
    if (col === 9) return solve(board, row + 1, 0);
    if (board[row][col] !== "") {
      return solve(board, row, col + 1);
    }
    for (let num = 1; num <= 9; num++) {
      const charNum = num.toString();
      if (isOk(board, row, col, charNum)) {
        board[row][col] = charNum;
        if (solve(board, row, col + 1)) return true;
        board[row][col] = "";
      }
    }
    return false;
  };

  const handleSolve = () => {
    setStatusMessage(""); // Clear previous status message
    const newBoard = [...board];
    if (!validateBoard(newBoard)) {
      setStatusMessage("The entered Sudoku is invalid.");
      return;
    }
    if (solve(newBoard)) {
      setBoard(newBoard);
    } else {
      setStatusMessage("No solution found.");
    }
  };

  const handleReset = () => {
    setBoard(
      Array(9)
        .fill()
        .map(() => Array(9).fill(""))
    );
    setStatusMessage(""); // Clear status message on reset
  };

  return (
    <div className={style.sudokuContainer}>
      <h1>Sudoku Solver</h1>
      <br />
      <table className={style.sudokuTable}>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className={style.sudokuCellContainer}>
                  <input
                    type="text"
                    value={cell || ""}
                    onChange={(e) =>
                      handleChange(rowIndex, colIndex, e.target.value)
                    }
                    className={style.sudokuCell}
                    maxLength="1"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.buttons}>
        <button onClick={handleSolve} className={style.solveButton}>
          Solve
        </button>
        <button onClick={handleReset} className={style.resetButton}>
          Reset
        </button>
      </div>
      {statusMessage && <p className={style.statusMessage}>{statusMessage}</p>}
    </div>
  );
}

export default Sodoku;
