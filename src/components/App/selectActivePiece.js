import findPossibleMoves from "./findPossibleMoves";

function selectActivePiece(row, col) {
  if (this.state.playerTurn === this.state.gameBoard[row][col].pieceColor) {
    const currentState = this.state.gameBoard;
    this.setState({
      activePiece: [row, col],
    });
    //set all possible moves from selected piece to true
    const possibleMoves = findPossibleMoves.bind(this)(
      row,
      col,
      currentState[row][col].pieceType,
      currentState[row][col].numMoves,
      this.state.playerTurn,
      this.state.gameBoard
    );
    this.setState({
      possibleMoves: possibleMoves,
    });
  }
}

export default selectActivePiece;
