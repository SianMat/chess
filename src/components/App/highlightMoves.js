function highlightMoves(startRow, startCol, pieceToMove, numMoves, playerTurn) {
  const currentState = this.state.gameBoard;
  if (pieceToMove === "pawn") {
    //white is moving up the board, black is moving down the board
    //pawns can make the following moves
    //1. move forward one if space is free
    //2. move forward two if both spaces are free and it is in the start position
    //3. move diagonally one to take a piece of the opposite colour

    //1. move forward one space
    if (
      playerTurn === "white" &&
      startRow - 1 >= 0 &&
      currentState[startRow - 1][startCol].pieceType === "none"
    ) {
      currentState[startRow - 1][startCol].possibleMove = true;
    } else if (
      playerTurn === "black" &&
      startRow + 1 < 8 &&
      currentState[startRow + 1][startCol].pieceType === "none"
    ) {
      currentState[startRow + 1][startCol].possibleMove = true;
    }

    //2. Move forward two spaces if first move
    if (numMoves === 0) {
      if (
        playerTurn === "white" &&
        startRow - 2 >= 0 &&
        currentState[startRow - 1][startCol].pieceType === "none" &&
        currentState[startRow - 2][startCol].pieceType === "none"
      ) {
        currentState[startRow - 2][startCol].possibleMove = true;
      } else if (
        playerTurn === "black" &&
        startRow + 2 < 8 &&
        currentState[startRow + 1][startCol].pieceType === "none" &&
        currentState[startRow + 2][startCol].pieceType === "none"
      ) {
        currentState[startRow + 2][startCol].possibleMove = true;
      }
    }

    //3. Move diagonally to take a piece
    if (playerTurn === "white" && startRow - 1 >= 0) {
      if (
        startCol - 1 >= 0 &&
        currentState[startRow - 1][startCol - 1].pieceColor === "black"
      ) {
        currentState[startRow - 1][startCol - 1].possibleMove = true;
      }
      if (
        startCol + 1 < 8 &&
        currentState[startRow - 1][startCol + 1].pieceColor === "black"
      ) {
        currentState[startRow - 1][startCol + 1].possibleMove = true;
      }
    } else if (playerTurn === "black" && startRow + 1 < 8) {
      if (
        startCol + 1 < 8 &&
        currentState[startRow + 1][startCol + 1].pieceColor === "white"
      ) {
        currentState[startRow + 1][startCol + 1].possibleMove = true;
      }
      if (
        startCol - 1 >= 0 &&
        currentState[startRow + 1][startCol - 1].pieceColor === "white"
      ) {
        currentState[startRow + 1][startCol - 1].possibleMove = true;
      }
    }
  } else if (pieceToMove === "knight") {
    //knights move in an L shape and can jump over other pieces
    const possibleMoves = [
      [1, 2],
      [1, -2],
      [2, -1],
      [2, 1],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
    for (let i = 0; i < possibleMoves.length; i++) {
      if (
        startRow + possibleMoves[i][0] >= 0 &&
        startRow + possibleMoves[i][0] < 8 &&
        startCol + possibleMoves[i][1] >= 0 &&
        startCol + possibleMoves[i][1] < 8 &&
        currentState[startRow + possibleMoves[i][0]][
          startCol + possibleMoves[i][1]
        ].pieceColor !== playerTurn
      ) {
        currentState[startRow + possibleMoves[i][0]][
          startCol + possibleMoves[i][1]
        ].possibleMove = true;
      }
    }
  } else if (
    pieceToMove === "queen" ||
    pieceToMove === "rook" ||
    pieceToMove === "bishop"
  ) {
    //queens can move in any direction as far as line of sight
    if (pieceToMove === "rook" || pieceToMove === "queen") {
      //rooks can move in a straight line in any direction as far as line of sight

      //1. Move up
      for (let i = startRow - 1; i >= 0; i--) {
        if (currentState[i][startCol].pieceType === "none") {
          currentState[i][startCol].possibleMove = true;
        } else {
          if (currentState[i][startCol].pieceColor !== playerTurn) {
            currentState[i][startCol].possibleMove = true;
          }
          i = -1;
        }
      }
      //2. Move down
      for (let i = startRow + 1; i < 8; i++) {
        if (currentState[i][startCol].pieceType === "none") {
          currentState[i][startCol].possibleMove = true;
        } else {
          if (currentState[i][startCol].pieceColor !== playerTurn) {
            currentState[i][startCol].possibleMove = true;
          }
          i = 8;
        }
      }
      //3. Move left
      for (let i = startCol - 1; i >= 0; i--) {
        if (currentState[startRow][i].pieceType === "none") {
          currentState[startRow][i].possibleMove = true;
        } else {
          if (currentState[startRow][i].pieceColor !== playerTurn) {
            currentState[startRow][i].possibleMove = true;
          }
          i = -1;
        }
      }
      //4. Move right
      for (let i = startCol + 1; i < 8; i++) {
        if (currentState[startRow][i].pieceType === "none") {
          currentState[startRow][i].possibleMove = true;
        } else {
          if (currentState[startRow][i].pieceColor !== playerTurn) {
            currentState[startRow][i].possibleMove = true;
          }
          i = 8;
        }
      }
    }
    if (pieceToMove === "bishop" || pieceToMove === "queen") {
      //bishops can move diagonally as far as line of sight

      //1. up and left
      for (let i = 1; i < 8; i++) {
        if (startRow - i >= 0 && startCol - i >= 0) {
          if (currentState[startRow - i][startCol - i].pieceType === "none") {
            currentState[startRow - i][startCol - i].possibleMove = true;
          } else {
            if (
              currentState[startRow - i][startCol - i].pieceColor !== playerTurn
            ) {
              currentState[startRow - i][startCol - i].possibleMove = true;
            }
            i = 8;
          }
        } else {
          i = 8;
        }
      }

      //2. up and right
      for (let i = 1; i < 8; i++) {
        if (startRow - i >= 0 && startCol + i < 8) {
          if (currentState[startRow - i][startCol + i].pieceType === "none") {
            currentState[startRow - i][startCol + i].possibleMove = true;
          } else {
            if (
              currentState[startRow - i][startCol + i].pieceColor !== playerTurn
            ) {
              currentState[startRow - i][startCol + i].possibleMove = true;
            }
            i = 8;
          }
        } else {
          i = 8;
        }
      }

      //3. down and left
      for (let i = 1; i < 8; i++) {
        if (startRow + i < 8 && startCol - i >= 0) {
          if (currentState[startRow + i][startCol - i].pieceType === "none") {
            currentState[startRow + i][startCol - i].possibleMove = true;
          } else {
            if (
              currentState[startRow + i][startCol - i].pieceColor !== playerTurn
            ) {
              currentState[startRow + i][startCol - i].possibleMove = true;
            }
            i = 8;
          }
        } else {
          i = 8;
        }
      }

      //4. down and right
      for (let i = 1; i < 8; i++) {
        if (startRow + i < 8 && startCol + i < 8) {
          if (currentState[startRow + i][startCol + i].pieceType === "none") {
            currentState[startRow + i][startCol + i].possibleMove = true;
          } else {
            if (
              currentState[startRow + i][startCol + i].pieceColor !== playerTurn
            ) {
              currentState[startRow + i][startCol + i].possibleMove = true;
            }
            i = 8;
          }
        } else {
          i = 8;
        }
      }
    }
  } else if (pieceToMove === "king") {
    //king can move one square in any direction
    const possibleMoves = [
      [1, 1],
      [1, 0],
      [1, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, 1],
      [0, -1],
    ];
    for (let i = 0; i < possibleMoves.length; i++) {
      if (
        startRow + possibleMoves[i][0] >= 0 &&
        startRow + possibleMoves[i][0] < 8 &&
        startCol + possibleMoves[i][1] >= 0 &&
        startCol + possibleMoves[i][1] < 8 &&
        currentState[startRow + possibleMoves[i][0]][
          startCol + possibleMoves[i][1]
        ].pieceColor !== playerTurn
      ) {
        currentState[startRow + possibleMoves[i][0]][
          startCol + possibleMoves[i][1]
        ].possibleMove = true;
      }
    }
  }
  return false;
}

export default highlightMoves;
