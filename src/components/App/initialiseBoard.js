function initialiseBoard() {
  for (let i = 0; i < 8; i++) {
    let row = [];

    //set the square colour
    let squareColor;
    if (i % 2 === 0) {
      squareColor = "white";
    } else {
      squareColor = "black";
    }

    //set the piece colour for starting positions (black at top, white at bottom)
    let pieceColor = "none";
    if (i === 0 || i === 1) {
      pieceColor = "black";
    } else if (i === 6 || i === 7) {
      pieceColor = "white";
    }

    for (let j = 0; j < 8; j++) {
      //set the initial position of playing pieces
      let pieceType = "none";
      if (i === 1 || i === 6) {
        pieceType = "pawn";
      } else if (i === 0 || i === 7) {
        if (j === 0 || j === 7) {
          pieceType = "rook";
        } else if (j === 1 || j === 6) {
          pieceType = "knight";
        } else if (j === 2 || j === 5) {
          pieceType = "bishop";
        } else if (j === 3) {
          pieceType = "king";
        } else {
          pieceType = "queen";
        }
      }

      //create an object describing each square
      const newSquare = {
        squareColor,
        active: false,
        pieceType,
        pieceColor,
      };
      row.push(newSquare);
      if (squareColor === "white") {
        squareColor = "black";
      } else {
        squareColor = "white";
      }
    }
    this.state.gameBoard.push(row);
  }
}

export default initialiseBoard;
