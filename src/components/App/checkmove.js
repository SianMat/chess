//no longer used as use highlightmoves instead

function checkMove(
  endRow,
  endCol,
  pieceToTake,
  startRow,
  startCol,
  pieceToMove,
  numMoves,
  playerTurn
) {
  if (pieceToMove === "pawn") {
    //white is moving up the board, black is moving down the board

    //pawns can make the following moves
    //-move forward one if space is free
    //-move forward two if both spaces are free and it is in the start position
    //-move diagonally one to take a piece of the opposite colour

    //if new space is empty
    if (pieceToTake === "none") {
      //if the pawn is moving one square
      if (Math.abs(startRow - endRow) === 1 && startCol === endCol)
        if (playerTurn === "white") {
          if (startRow - endRow === 1) {
            return true;
          }
        } else {
          if (startRow - endRow === -1) {
            return true;
          }
        }

      //if the pawn has not already moved, it can move 2 if not blocked
      if (Math.abs(startRow - endRow) === 2 && startCol === endCol) {
        if (numMoves === 0) {
          //check that pawn is not blocked in intermediate square
          const centerRow = (startRow + endRow) / 2;
          if (this.state.gameBoard[centerRow][startCol].pieceType === "none") {
            if (playerTurn === "white") {
              if (startRow - endRow === 2) {
                return true;
              }
            } else {
              if (startRow - endRow === -2) {
                return true;
              }
            }
          }
        }
      }
    }
    //else if player is trying to take a piece check the player is moving diagonally one square
    else if (
      Math.abs(startCol - endCol) === 1 &&
      Math.abs(startRow - endRow) === 1
    ) {
      if (playerTurn === "white") {
        if (startRow - endRow === 1) {
          return true;
        }
      } else {
        if (startRow - endRow === -1) {
          return true;
        }
      }
    }
    return false;
  } else if (pieceToMove === "rook") {
    //rooks can move in a straight line in any direction as far as line of sight
    if (startRow === endRow) {
      //check that nothing is in between
      for (
        let col = Math.min(startCol, endCol) + 1;
        col < Math.max(startCol, endCol);
        col++
      ) {
        if (this.state.gameBoard[startRow][col].pieceType !== "none") {
          return false;
        }
      }
      return true;
    } else if (startCol - endCol === 0) {
      //check that nothing is in between
      for (
        let row = Math.min(startRow, endRow) + 1;
        row < Math.max(startRow, endRow);
        row++
      ) {
        if (this.state.gameBoard[row][startCol].pieceType !== "none") {
          return false;
        }
      }
      return true;
    }
    return false;
  } else if (pieceToMove === "knight") {
    //knights move in an L shape and can jump over other pieces
    if (
      (Math.abs(startRow - endRow) === 1 &&
        Math.abs(startCol - endCol) === 2) ||
      (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1)
    ) {
      return true;
    }
    return false;
  } else if (pieceToMove === "bishop") {
    //bishops can move diagonally as far as line of sight
    //leading diagonal
    if (startRow - endRow === startCol - endCol) {
      let row = Math.min(startRow, endRow);
      let col = Math.min(startCol, endCol);
      for (let i = 1; i < Math.abs(startRow - endRow); i++) {
        if (this.state.gameBoard[row + i][col + i].pieceType !== "none") {
          return false;
        }
      }
      return true;
    }
    //backwards diagonal
    else if (startRow - endRow === -(startCol - endCol)) {
      let row = Math.min(startRow, endRow);
      let col = Math.max(startCol, endCol);
      for (let i = 1; i < Math.abs(startRow - endRow); i++) {
        if (this.state.gameBoard[row + i][col - i].pieceType !== "none") {
          return false;
        }
      }
      return true;
    }
  } else if (pieceToMove === "queen") {
    //queen can move in any direction as far as line of sight
    //leading diagonal
    if (startRow - endRow === startCol - endCol) {
      let row = Math.min(startRow, endRow);
      let col = Math.min(startCol, endCol);
      //check for obstacles
      for (let i = 1; i < Math.abs(startRow - endRow); i++) {
        if (this.state.gameBoard[row + i][col + i].pieceType !== "none") {
          return false;
        }
      }
      return true;
    }
    //backwards diagonal
    else if (startRow - endRow === -(startCol - endCol)) {
      let row = Math.min(startRow, endRow);
      let col = Math.max(startCol, endCol);
      //check for obstacles
      for (let i = 1; i < Math.abs(startRow - endRow); i++) {
        if (this.state.gameBoard[row + i][col - i].pieceType !== "none") {
          return false;
        }
      }
      return true;
      //horizontal
    } else if (startRow === endRow) {
      //check that nothing is in between
      for (
        let col = Math.min(startCol, endCol) + 1;
        col < Math.max(startCol, endCol);
        col++
      ) {
        if (this.state.gameBoard[startRow][col].pieceType !== "none") {
          return false;
        }
      }
      return true;
      //vertical
    } else if (startCol - endCol === 0) {
      //check that nothing is in between
      for (
        let row = Math.min(startRow, endRow) + 1;
        row < Math.max(startRow, endRow);
        row++
      ) {
        if (this.state.gameBoard[row][startCol].pieceType !== "none") {
          return false;
        }
      }
      return true;
    }
    return false;
  } else if (pieceToMove === "king") {
    //king can move one square in any direction
    if (Math.abs(startCol - endCol) <= 1 && Math.abs(startRow - endRow) <= 1) {
      return true;
    }
    return false;
  }
  return false;
}

export default checkMove;
