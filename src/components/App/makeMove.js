import lodash from "lodash";

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
  //if the player clicks on a piece of their own colour, do nothing
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

  //if the move was valid, move the piece by updating the state of gameboard
  const newState = lodash.cloneDeep(this.state.gameBoard);
  const possibleMoves = lodash.cloneDeep(this.state.possibleMoves);
  const startSquare = newState[startRow][startCol];
  const endSquare = newState[row][col];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      possibleMoves[r][c] = false;
    }
  }
  startSquare.pieceType = "none";
  startSquare.pieceColor = "none";
  startSquare.active = false;
  startSquare.numMoves = 0;
  endSquare.pieceType = pieceToMove;
  endSquare.pieceColor = this.state.playerTurn;
  endSquare.numMoves = numMoves + 1;
  let nextPlayer = "white";
  if (this.state.playerTurn === "white") {
    nextPlayer = "black";
  }
  let kingPosition = [];
  let blackKingPosition = this.state.blackKingPosition;
  let whiteKingPosition = this.state.whiteKingPosition;
  if (this.state.playerTurn === "white") {
    kingPosition = whiteKingPosition;
  } else {
    kingPosition = blackKingPosition;
  }
  if (pieceToMove === "king") {
    kingPosition = [row, col];
    if (this.state.playerTurn === "white") {
      whiteKingPosition = kingPosition;
    } else {
      blackKingPosition = kingPosition;
    }
  }

  //if the move was valid, check if it puts current player into check before finalising move
  const vulnerablePositions = this.findAvailableMoves(nextPlayer, newState);
  if (vulnerablePositions[kingPosition[0]][kingPosition[1]]) {
    alert(`This would but you into check, make another move`);
  } else {
    //if valid move and not in check, update gameboard
    let blackCheck = false;
    let whiteCheck = false;
    if (this.state.playerTurn === "white") {
      whiteCheck =
        vulnerablePositions[whiteKingPosition[0]][whiteKingPosition[1]];
      blackCheck = this.findAvailableMoves(this.state.playerTurn, newState)[
        blackKingPosition[0]
      ][blackKingPosition[1]];
    } else {
      blackCheck =
        vulnerablePositions[blackKingPosition[0]][blackKingPosition[1]];
      whiteCheck = this.findAvailableMoves(this.state.playerTurn, newState)[
        whiteKingPosition[0]
      ][whiteKingPosition[1]];
    }
    this.setState({
      gameBoard: newState,
      possibleMoves,
      playerTurn: nextPlayer,
      activePiece: false,
      availableMoves: vulnerablePositions,
      whiteKingPosition,
      blackKingPosition,
      blackCheck,
      whiteCheck,
    });
  }
}

export default makeMove;
