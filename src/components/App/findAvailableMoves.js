// this function finds all available moves for specified player by calling findPossibleMoves for every piece
import findPossibleMoves from "./findPossibleMoves";

function findAvailableMoves(colour, gameBoard) {
  //initialise and 8by8 array of false
  let availableMoves = this.initialiseFalse();

  //cycle through current gameboard and find possible moves for each piece of specified colour
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++)
      if (gameBoard[row][col].pieceColor === colour) {
        const moreAvailableMoves = findPossibleMoves.bind(this)(
          row,
          col,
          gameBoard[row][col].pieceType,
          gameBoard[row][col].numMoves,
          colour,
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
