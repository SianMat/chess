import lodash from "lodash";

function initialiseBoard() {
  //initialise board of empty squares
  const newSquare = {
    squareColor: "",
    pieceType: "none",
    pieceColor: "none",
    numMoves: 0,
  };
  let board = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(lodash.cloneDeep(newSquare));
    }
    board.push(row);
  }
  for (let i = 0; i < 8; i++) {
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
          pieceType = "queen";
        } else {
          pieceType = "king";
        }
      }

      //update object describing each square
      board[i][j].pieceType = pieceType;
      board[i][j].pieceColor = pieceColor;
      board[i][j].squareColor = squareColor;


      //alternate square colour
      if (squareColor === "white") {
        squareColor = "black";
      } else {
        squareColor = "white";
      }
    }
  }
  return board;
}

export default initialiseBoard;
