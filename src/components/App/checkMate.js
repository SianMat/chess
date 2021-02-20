import lodash from "lodash";
import findAvailableMoves from "./findAvailableMoves";
import findPossibleMoves from "./findPossibleMoves";

function checkMate(defendingColor, attackingColor, gameBoard, kingPosition) {
  //color of defending player, color of attacking player, current state of gameboard, position of defending king
  for (let startRow = 0; startRow < 8; startRow++) {
    for (let startCol = 0; startCol < 8; startCol++) {
      //for each defending piece, find all possible moves
      if (gameBoard[startRow][startCol].pieceColor === defendingColor) {
        const pieceToMove = gameBoard[startRow][startCol].pieceType;
        const numMoves = gameBoard[startRow][startCol].numMoves;
        const possibleMoves = findPossibleMoves(
          startRow,
          startCol,
          pieceToMove,
          numMoves,
          defendingColor,
          gameBoard
        );

        for (let endRow = 0; endRow < 8; endRow++) {
          for (let endCol = 0; endCol < 8; endCol++) {
            //for each possible move, test if defending player will still be in check
            if (possibleMoves[endRow][endCol]) {
              const tempNewState = lodash.cloneDeep(gameBoard);
              const startSquare = tempNewState[startRow][startCol];
              const endSquare = tempNewState[endRow][endCol];

              //empty start square
              startSquare.pieceType = "none";
              startSquare.pieceColor = "none";
              //fill end square with moving piece
              endSquare.pieceType = pieceToMove;
              endSquare.pieceColor = defendingColor;
              //update position of king if king was moved
              if (pieceToMove === "king") {
                kingPosition = [endRow, endCol];
              }
              //check if move takes current player out of check. If it does, player is not in check mate so exit function
              const vulnerablePositions = findAvailableMoves.bind(this)(
                attackingColor,
                tempNewState
              );
              if (!vulnerablePositions[kingPosition[0]][kingPosition[1]]) {
                return false;
              }
            }
          }
        }
      }
    }
  }
  return true;
}
export default checkMate;
