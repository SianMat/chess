//this function is used to determine what to do when a player clicks a square when they have already selected an active piece

import lodash from "lodash";
import findAvailableMoves from "./findAvailableMoves";

function makeMove(
  endRow, //row index of square player is attempting to move to
  endCol //column index of square player is attempting to move to
) {
  //if the clicked square is already selected, deselect it
  if (
    this.state.activePiece[0] === endRow &&
    this.state.activePiece[1] === endCol
  ) {
    //reset possible moves to false
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
    //exit function
    return;
  }

  //if the player clicks on a piece of their own color, do nothing
  if (
    this.state.gameBoard[endRow][endCol].pieceColor === this.state.playerTurn
  ) {
    return;
  }

  //check if attempted move is a possible move, else do nothing and exit function
  const validMove = this.state.possibleMoves[endRow][endCol];
  if (!validMove) {
    return;
  }

  //else check if the move is valid
  const startRow = this.state.activePiece[0]; //row index of square player is trying to move from
  const startCol = this.state.activePiece[1]; //column index of square player is trying to move from
  const pieceToMove = this.state.gameBoard[startRow][startCol].pieceType; //piece type that player is trying to move
  const numMoves = this.state.gameBoard[startRow][startCol].numMoves; //used to track if it is the first move for a pawn

  //simulate moving the piece with a deep copy of the gameboard
  const newState = lodash.cloneDeep(this.state.gameBoard);
  const possibleMoves = lodash.cloneDeep(this.state.possibleMoves);
  const startSquare = newState[startRow][startCol];
  const endSquare = newState[endRow][endCol];
  const whiteCapturedPieces = this.state.whiteCapturedPieces.slice();
  const blackCapturedPieces = this.state.blackCapturedPieces.slice();
  const capturedPiece = this.state.gameBoard[endRow][endCol].pieceType; //piece that current player is trying to take (if there is one, else null)
  const playerTurn = this.state.playerTurn; //color of player whose turn it is

  //reset all simulated possible moves to false
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

  //switch whose turn it is
  let nextPlayer = "white";
  if (playerTurn === "white") {
    nextPlayer = "black";
  }
  //update position of king if king was moved
  let blackKingPosition = lodash.cloneDeep(this.state.blackKingPosition);
  let whiteKingPosition = lodash.cloneDeep(this.state.whiteKingPosition);
  if (playerTurn === "white" && pieceToMove === "king") {
    whiteKingPosition = [endRow, endCol];
  } else if (playerTurn === "black" && pieceToMove === "king") {
    blackKingPosition = [endRow, endCol];
  }
  const kingPosition =
    playerTurn === "white" ? whiteKingPosition : blackKingPosition;

  //check if simulated move will put current player into check
  const vulnerablePositions = findAvailableMoves.bind(this)(
    nextPlayer,
    newState
  );
  //if the move will put current player into check, set illegal move to true and exit function
  if (vulnerablePositions[kingPosition[0]][kingPosition[1]]) {
    this.setState({
      illegalMove: true,
    });
    return;
  } else {
    //if simulated move will not put the player into check, update gameboard
    let blackCheck = false;
    let whiteCheck = false;
    let endGame = false;
    //first check if current player has put opponent into check and update captured pieces if necessary
    if (playerTurn === "white") {
      //check if white will put black into check
      blackCheck = findAvailableMoves.bind(this)(playerTurn, newState)[
        blackKingPosition[0]
      ][blackKingPosition[1]];
      //check if white will take a black piece and add to captured pieces
      if (capturedPiece !== "none") {
        whiteCapturedPieces.push(capturedPiece);
      }
    } else {
      //check if black will put white into check
      whiteCheck = findAvailableMoves.bind(this)(playerTurn, newState)[
        whiteKingPosition[0]
      ][whiteKingPosition[1]];
      //check if black will take a white piece and add to captured pieces
      if (capturedPiece !== "none") {
        blackCapturedPieces.push(capturedPiece);
      }
    }
    //if pawn has reached opposite side of board, call on pawn promotion
    let pawnPromotion = false;
    if (pieceToMove === "pawn") {
      if (
        (playerTurn === "white" && endRow === 0) ||
        (playerTurn === "black" && endRow === 7)
      ) {
        pawnPromotion = [endRow, endCol];
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
      pawnPromotion,
      moveSuccessful: true,
    });
  }
}

export default makeMove;
