//this function is used to determine what to do when a player clicks a square when they have already selected an active piece

import lodash from "lodash";
import findAvailableMoves from "./findAvailableMoves";
import checkMate from "./checkMate";

function makeMove(row, col) {
  //if the clicked square is already selected, deselect it
  if (this.state.activePiece[0] === row && this.state.activePiece[1] === col) {
    const possibleMoves = lodash.cloneDeep(this.state.possibleMoves);
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        possibleMoves[r][c] = false;
      }
    }
    this.setState({
      possibleMoves: possibleMoves,
      activePiece: false,
    });
    return;
  }

  //if the player clicks on a piece of their own color, do nothing
  if (this.state.gameBoard[row][col].pieceColor === this.state.playerTurn) {
    return;
  }

  //else check if the move is valid
  const startRow = this.state.activePiece[0];
  const startCol = this.state.activePiece[1];
  const pieceToMove = this.state.gameBoard[startRow][startCol].pieceType;
  const numMoves = this.state.gameBoard[startRow][startCol].numMoves; //used to track if it is the first move for a pawn

  const validMove = this.state.possibleMoves[row][col];
  if (!validMove) {
    return;
  }

  //if the move was valid, move the piece by updating the state of gameboard with a deep copy
  const newState = lodash.cloneDeep(this.state.gameBoard);
  const possibleMoves = lodash.cloneDeep(this.state.possibleMoves);
  const startSquare = newState[startRow][startCol];
  const endSquare = newState[row][col];
  const whiteCapturedPieces = this.state.whiteCapturedPieces.slice();
  const blackCapturedPieces = this.state.blackCapturedPieces.slice();
  const capturedPiece = this.state.gameBoard[row][col].pieceType;
  const playerTurn = this.state.playerTurn;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      possibleMoves[r][c] = false;
    }
  }
  //empty start square
  startSquare.pieceType = "none";
  startSquare.pieceColor = "none";
  startSquare.active = false;
  startSquare.numMoves = 0;
  //fill end square with moving piece
  endSquare.pieceType = pieceToMove;
  endSquare.pieceColor = playerTurn;
  endSquare.numMoves = numMoves + 1;

  //switch who's turn it is
  let nextPlayer = "white";
  if (playerTurn === "white") {
    nextPlayer = "black";
  }
  //update position of king if king was moved
  let blackKingPosition = this.state.blackKingPosition;
  let whiteKingPosition = this.state.whiteKingPosition;
  if (playerTurn === "white" && pieceToMove === "king") {
    whiteKingPosition = [row, col];
  } else if (playerTurn === "black" && pieceToMove === "king") {
    blackKingPosition = [row, col];
  }
  const kingPosition =
    playerTurn === "white" ? whiteKingPosition : blackKingPosition;

  //if the move was valid, check if it puts current player into check before finalising move
  const vulnerablePositions = findAvailableMoves.bind(this)(
    nextPlayer,
    newState
  );
  if (vulnerablePositions[kingPosition[0]][kingPosition[1]]) {
    this.setState({
      illegalMove: true,
    });
  } else {
    //if move was valid and will not put the player into check, update gameboard
    let blackCheck = false;
    let whiteCheck = false;
    let endGame = false;

    if (playerTurn === "white") {
      //check if white will put black into check
      blackCheck = findAvailableMoves.bind(this)(playerTurn, newState)[
        blackKingPosition[0]
      ][blackKingPosition[1]];
      //if black is now in check, test for check mate
      if (blackCheck) {
        endGame = checkMate.bind(this)(
          "black",
          "white",
          newState,
          blackKingPosition
        );
      }

      //check if white will take a black piece and add to captured pieces
      if (capturedPiece !== "none") {
        whiteCapturedPieces.push(capturedPiece);
      }
    } else {
      //check if black will put white into check
      whiteCheck = findAvailableMoves.bind(this)(playerTurn, newState)[
        whiteKingPosition[0]
      ][whiteKingPosition[1]];
      //if white is now in check, test for check mate
      if (whiteCheck) {
        endGame = checkMate.bind(this)(
          "white",
          "black",
          newState,
          whiteKingPosition
        );
      }
      //check if black will take a white piece and add to captured pieces
      if (capturedPiece !== "none") {
        blackCapturedPieces.push(capturedPiece);
      }
    }
    //update state of game to finalise move
    this.setState({
      gameBoard: newState,
      possibleMoves,
      playerTurn: nextPlayer,
      activePiece: false,
      // availableMoves: vulnerablePositions,
      blackKingPosition,
      whiteKingPosition,
      blackCheck,
      whiteCheck,
      blackCapturedPieces,
      whiteCapturedPieces,
      checkMate: endGame,
    });
  }

  //if pawn has reached opposite side of board, call on pawn promotion
  if (pieceToMove === "pawn") {
    if (
      (playerTurn === "white" && row === 0) ||
      (playerTurn === "black" && row === 7)
    ) {
      this.setState({
        pawnPromotion: [row, col],
      });
    }
  }
}

export default makeMove;
