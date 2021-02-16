import "./App.css";
import React from "react";
import Square from "../Square/square";
import initialiseBoard from "./initialiseBoard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: [],
      playerTurn: "white",
      activePiece: false,
    };
    this.renderBoard = this.renderBoard.bind(this);
    initialiseBoard.bind(this)();
  }

  renderBoard() {

    return this.state.gameBoard.map((row, rowIndex) => {
      return row.map((square, columnIndex) => {
        return (
          <Square
            key={`${rowIndex} ${columnIndex}`}
            squareColor={square.squareColor}
            pieceColor={square.pieceColor}
            pieceType={square.pieceType}
          />
        );
      });
    });
  }

  render() {
    return <div className="gameBoard">{this.renderBoard()}</div>;
  }
}

export default App;
