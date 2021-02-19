import lodash from "lodash";
import findAvailableMoves from "./findAvailableMoves";

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

  //if the move was valid, move the piece by updating the state of gameboard with a deep copy
  const newState = lodash.cloneDeep(this.state.gameBoard);
  const possibleMoves = lodash.cloneDeep(this.state.possibleMoves);
  const startSquare = newState[startRow][startCol];
  const endSquare = newState[row][col];
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
  endSquare.pieceColor = this.state.playerTurn;
  endSquare.numMoves = numMoves + 1;
  //switch who's turn it is
  let nextPlayer = "white";
  if (this.state.playerTurn === "white") {
    nextPlayer = "black";
  }
  //update position of king if king was moved
  let blackKingPosition = this.state.blackKingPosition;
  let whiteKingPosition = this.state.whiteKingPosition;
  if (this.state.playerTurn === "white" && pieceToMove === "king") {
    whiteKingPosition = [row, col];
  } else if (this.state.playerTurn === "black" && pieceToMove === "king") {
    blackKingPosition = [row, col];
  }
  const kingPosition =
    this.state.playerTurn === "white" ? whiteKingPosition : blackKingPosition;

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
    if (this.state.playerTurn === "white") {
      //check if white put black into check
      blackCheck = findAvailableMoves.bind(this)(
        this.state.playerTurn,
        newState
      )[blackKingPosition[0]][blackKingPosition[1]];
    } else {
      //check if black put white into check
      whiteCheck = findAvailableMoves.bind(this)(
        this.state.playerTurn,
        newState
      )[whiteKingPosition[0]][whiteKingPosition[1]];
    }
    //update state of game to finalise move
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
