// this function finds all available moves for specified player by calling findPossibleMoves for every piece
import findPossibleMoves from "./findPossibleMoves";

function findAvailableMoves(
  color, //color of attacking player
  gameBoard //current state of gameBoard
) {
  //initialise an 8by8 array of false
  let availableMoves = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(false);
    }
    availableMoves.push(row);
  }
  //cycle through current gameboard and find possible moves for each piece of specified color
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++)
      if (gameBoard[row][col].pieceColor === color) {
        const moreAvailableMoves = findPossibleMoves.bind(this)(
          row,
          col,
          gameBoard[row][col].pieceType,
          gameBoard[row][col].numMoves,
          color,
          gameBoard
        );

        //update any possible moves for current piece into avaiableMoves array
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (moreAvailableMoves[i][j]) {
              availableMoves[i][j] = true;
            }
          }
        }
      }
  }

  //return array (of bools) describing whether each square is a possible move or not
  return availableMoves;
}

export default findAvailableMoves;
