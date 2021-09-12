import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 1.0 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        let trueOrFalse = Math.random() < chanceLightStartsOn ? true : false;
        row.push(trueOrFalse);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i][j] === true) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCells = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it and around it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          //flip cells around it
          if (y - 1 >= 0) boardCopy[y - 1][x] = !boardCopy[y - 1][x];
          if (x + 1 < ncols) boardCopy[y][x + 1] = !boardCopy[y][x + 1];
          if (y + 1 < nrows) boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          if (x - 1 >= 0) boardCopy[y][x - 1] = !boardCopy[y][x - 1];
        }
      };

      //Make a (deep) copy of the oldBoard
      const boardCopy = [...board];
      //in the copy, flip this cell and the cells around it
      flipCells(y, x, boardCopy);
      return boardCopy;
    });
  }

  function restartGame() {
    setBoard(createBoard());
  }
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>
        <h1>You Won!</h1> <button onClick={restartGame}>Restart</button>
      </div>
    );
  }
  // make table board
  return (
    <div>
      <table className="gameBoard">
        <tbody>
          {board.map((row, y) => (
            <tr>
              {row.map((elem, x) => (
                <Cell
                  key={`${y}-${x}`}
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  isLit={elem}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
