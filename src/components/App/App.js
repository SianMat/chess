import "./App.css";
import React from "react";
import Square from "../Square/square";
import initialiseBoard from "./initialiseBoard";
import highlightMoves from "./highlightMoves";
import makeMove from "./makeMove";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: initialiseBoard.bind(this)(),
      playerTurn: "white",
      activePiece: false,
      easyModeWhite: false,
      easyModeBlack: false,
    };
    this.renderBoard = this.renderBoard.bind(this);
    this.selectActivePiece = this.selectActivePiece.bind(this);
    this.toggleEasyBlack = this.toggleEasyBlack.bind(this);
    this.toggleEasyWhite = this.toggleEasyWhite.bind(this);
  }

  renderBoard() {
    let easyMode = false;
    if (this.state.playerTurn === "black" && this.state.easyModeBlack) {
      easyMode = true;
    } else if (this.state.playerTurn === "white" && this.state.easyModeWhite) {
      easyMode = true;
    }
    return this.state.gameBoard.map((row, rowIndex) => {
      return row.map((square, columnIndex) => {
        return (
          <Square
            key={`${rowIndex} ${columnIndex}`}
            squareColor={square.squareColor}
            pieceColor={square.pieceColor}
            pieceType={square.pieceType}
            onClick={this.handleClick(rowIndex, columnIndex)}
            active={square.active}
            possibleMove={square.possibleMove}
            easyMode={easyMode}
          />
        );
      });
    });
  }

  selectActivePiece(row, col) {
    if (this.state.playerTurn === this.state.gameBoard[row][col].pieceColor) {
      const currentState = this.state.gameBoard;
      currentState[row][col].active = true;
      this.setState({
        activePiece: [row, col],
      });
      //set all possible moves to active
      highlightMoves.bind(this)(
        row,
        col,
        currentState[row][col].pieceType,
        currentState[row][col].numMoves,
        this.state.playerTurn
      );
    }
  }

  handleClick(row, col) {
    if (!this.state.activePiece) {
      return () => this.selectActivePiece(row, col);
    } else {
      return () => makeMove.bind(this)(row, col);
    }
  }

  toggleEasyBlack() {
    const easyMode = this.state.easyModeBlack;
    this.setState({
      easyModeBlack: !easyMode,
    });
  }

  toggleEasyWhite() {
    const easyMode = this.state.easyModeWhite;
    this.setState({
      easyModeWhite: !easyMode,
    });
  }

  render() {
    return (
      <div className="page">
        <section className="left">{`${this.state.playerTurn} player's turn`}</section>
        <section className="gameBoard">{this.renderBoard()}</section>
        <section className="easyModeToggles">
          <figure className="toggle">
            <label id="blackEasyMode" class="switch black">
              <input type="checkbox" onChange={this.toggleEasyBlack} />
              <span class="slider round"></span>
            </label>
            <label for="blackEasyMode">Toggle Black Easy Mode</label>
          </figure>
          <figure className="toggle">
            <label id="whiteEasyMode" class="switch white">
              <input type="checkbox" onChange={this.toggleEasyWhite} />
              <span class="slider round"></span>
            </label>
            <label for="whiteEasyMode">Toggle White Easy Mode</label>
          </figure>
        </section>
      </div>
    );
  }
}

export default App;
