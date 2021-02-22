//this function finds the possible moves for the piece specified in the parameters

function findPossibleMoves(
  startRow, //rowIndex of piece to check
  startCol, //colIndex of piece to check
  pieceToMove, //piece type to check
  numMoves, //the number of moves this piece has already taken
  playerTurn, //the color representing whose turn it is
  gameBoard //the current state of the gameboard
) {
  //initialise an 8by8 array of false
  let possibleMoves = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(false);
    }
    possibleMoves.push(row);
  }

  if (pieceToMove === "pawn") {
    //white is moving up the board, black is moving down the board
    //pawns can make the following moves
    //1. move forward one if space is free
    //2. move forward two if both spaces are free and it is in the start position
    //3. move diagonally one to take a piece of the opposite color

    //1. move forward one space
    if (
      playerTurn === "white" &&
      startRow - 1 >= 0 &&
      gameBoard[startRow - 1][startCol].pieceType === "none"
    ) {
      possibleMoves[startRow - 1][startCol] = true;
    } else if (
      playerTurn === "black" &&
      startRow + 1 < 8 &&
      gameBoard[startRow + 1][startCol].pieceType === "none"
    ) {
      possibleMoves[startRow + 1][startCol] = true;
    }

    //2. Move forward two spaces if first move
    if (numMoves === 0) {
      if (
        playerTurn === "white" &&
        startRow - 2 >= 0 &&
        gameBoard[startRow - 1][startCol].pieceType === "none" &&
        gameBoard[startRow - 2][startCol].pieceType === "none"
      ) {
        possibleMoves[startRow - 2][startCol] = true;
      } else if (
        playerTurn === "black" &&
        startRow + 2 < 8 &&
        gameBoard[startRow + 1][startCol].pieceType === "none" &&
        gameBoard[startRow + 2][startCol].pieceType === "none"
      ) {
        possibleMoves[startRow + 2][startCol] = true;
      }
    }

    //3. Move diagonally to take a piece
    if (playerTurn === "white" && startRow - 1 >= 0) {
      if (
        startCol - 1 >= 0 &&
        gameBoard[startRow - 1][startCol - 1].pieceColor === "black"
      ) {
        possibleMoves[startRow - 1][startCol - 1] = true;
      }
      if (
        startCol + 1 < 8 &&
        gameBoard[startRow - 1][startCol + 1].pieceColor === "black"
      ) {
        possibleMoves[startRow - 1][startCol + 1] = true;
      }
    } else if (playerTurn === "black" && startRow + 1 < 8) {
      if (
        startCol + 1 < 8 &&
        gameBoard[startRow + 1][startCol + 1].pieceColor === "white"
      ) {
        possibleMoves[startRow + 1][startCol + 1] = true;
      }
      if (
        startCol - 1 >= 0 &&
        gameBoard[startRow + 1][startCol - 1].pieceColor === "white"
      ) {
        possibleMoves[startRow + 1][startCol - 1] = true;
      }
    }
  } else if (pieceToMove === "knight") {
    //knights move in an L shape and can jump over other pieces
    const moves = [
      [1, 2],
      [1, -2],
      [2, -1],
      [2, 1],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
    for (let i = 0; i < moves.length; i++) {
      if (
        startRow + moves[i][0] >= 0 &&
        startRow + moves[i][0] < 8 &&
        startCol + moves[i][1] >= 0 &&
        startCol + moves[i][1] < 8 &&
        gameBoard[startRow + moves[i][0]][startCol + moves[i][1]].pieceColor !==
          playerTurn
      ) {
        possibleMoves[startRow + moves[i][0]][startCol + moves[i][1]] = true;
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
        if (gameBoard[i][startCol].pieceType === "none") {
          possibleMoves[i][startCol] = true;
        } else {
          if (gameBoard[i][startCol].pieceColor !== playerTurn) {
            possibleMoves[i][startCol] = true;
          }
          i = -1;
        }
      }
      //2. Move down
      for (let i = startRow + 1; i < 8; i++) {
        if (gameBoard[i][startCol].pieceType === "none") {
          possibleMoves[i][startCol] = true;
        } else {
          if (gameBoard[i][startCol].pieceColor !== playerTurn) {
            possibleMoves[i][startCol] = true;
          }
          i = 8;
        }
      }
      //3. Move left
      for (let i = startCol - 1; i >= 0; i--) {
        if (gameBoard[startRow][i].pieceType === "none") {
          possibleMoves[startRow][i] = true;
        } else {
          if (gameBoard[startRow][i].pieceColor !== playerTurn) {
            possibleMoves[startRow][i] = true;
          }
          i = -1;
        }
      }
      //4. Move right
      for (let i = startCol + 1; i < 8; i++) {
        if (gameBoard[startRow][i].pieceType === "none") {
          possibleMoves[startRow][i] = true;
        } else {
          if (gameBoard[startRow][i].pieceColor !== playerTurn) {
            possibleMoves[startRow][i] = true;
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
          if (gameBoard[startRow - i][startCol - i].pieceType === "none") {
            possibleMoves[startRow - i][startCol - i] = true;
          } else {
            if (
              gameBoard[startRow - i][startCol - i].pieceColor !== playerTurn
            ) {
              possibleMoves[startRow - i][startCol - i] = true;
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
          if (gameBoard[startRow - i][startCol + i].pieceType === "none") {
            possibleMoves[startRow - i][startCol + i] = true;
          } else {
            if (
              gameBoard[startRow - i][startCol + i].pieceColor !== playerTurn
            ) {
              possibleMoves[startRow - i][startCol + i] = true;
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
          if (gameBoard[startRow + i][startCol - i].pieceType === "none") {
            possibleMoves[startRow + i][startCol - i] = true;
          } else {
            if (
              gameBoard[startRow + i][startCol - i].pieceColor !== playerTurn
            ) {
              possibleMoves[startRow + i][startCol - i] = true;
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
          if (gameBoard[startRow + i][startCol + i].pieceType === "none") {
            possibleMoves[startRow + i][startCol + i] = true;
          } else {
            if (
              gameBoard[startRow + i][startCol + i].pieceColor !== playerTurn
            ) {
              possibleMoves[startRow + i][startCol + i] = true;
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
    const moves = [
      [1, 1],
      [1, 0],
      [1, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, 1],
      [0, -1],
    ];
    for (let i = 0; i < moves.length; i++) {
      if (
        startRow + moves[i][0] >= 0 &&
        startRow + moves[i][0] < 8 &&
        startCol + moves[i][1] >= 0 &&
        startCol + moves[i][1] < 8 &&
        gameBoard[startRow + moves[i][0]][startCol + moves[i][1]].pieceColor !==
          playerTurn
      ) {
        possibleMoves[startRow + moves[i][0]][startCol + moves[i][1]] = true;
      }
    }
  }
  return possibleMoves;
}

export default findPossibleMoves;
