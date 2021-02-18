function makeMove(row, col) {
  //if the clicked square is already selected, deselect it
  if (this.state.gameBoard[row][col].active) {
    const currentState = this.state.gameBoard;
    currentState[row][col].active = false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        currentState[r][c].possibleMove = false;
      }
    }
    this.setState({
      gameBoard: currentState,
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

  const validMove = this.state.gameBoard[row][col].possibleMove;
  if (!validMove) {
    return;
  }

  //if the move was valid, move the piece by updating the state of gameboard
  const currentState = this.state.gameBoard;
  const startSquare = currentState[startRow][startCol];
  const endSquare = currentState[row][col];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      currentState[r][c].possibleMove = false;
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
  this.setState({
    playerTurn: nextPlayer,
    activePiece: false,
  });

  //check for check
}

export default makeMove;
