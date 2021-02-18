import "./App.css";
import React from "react";
import Square from "../Square/square";
import initialiseBoard from "./initialiseBoard";
import findPossibleMoves from "./findPossibleMoves";
import makeMove from "./makeMove";
import lodash from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: initialiseBoard.bind(this)(),
      playerTurn: "white",
      activePiece: false,
      easyModeWhite: false,
      easyModeBlack: false,
      possibleMoves: this.initialiseFalse(),
      availableMoves: this.initialiseFalse(),
      blackKingPosition: [0, 3],
      whiteKingPosition: [7, 3],
      blackCheck: false,
      whiteCheck: false,
    };
    this.renderBoard = this.renderBoard.bind(this);
    this.selectActivePiece = this.selectActivePiece.bind(this);
    this.toggleEasyBlack = this.toggleEasyBlack.bind(this);
    this.toggleEasyWhite = this.toggleEasyWhite.bind(this);
    this.findAvailableMoves = this.findAvailableMoves.bind(this);
  }

  initialiseFalse() {
    let grid = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push(false);
      }
      grid.push(row);
    }
    return grid;
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
        let active = false;
        if (
          rowIndex === this.state.activePiece[0] &&
          columnIndex === this.state.activePiece[1]
        ) {
          active = true;
        }
        return (
          <Square
            key={`${rowIndex} ${columnIndex}`}
            squareColor={square.squareColor}
            pieceColor={square.pieceColor}
            pieceType={square.pieceType}
            onClick={this.handleClick(rowIndex, columnIndex)}
            active={active}
            possibleMove={this.state.possibleMoves[rowIndex][columnIndex]}
            availableMove={this.state.availableMoves[rowIndex][columnIndex]}
            easyMode={easyMode}
          />
        );
      });
    });
  }

  selectActivePiece(row, col) {
    if (this.state.playerTurn === this.state.gameBoard[row][col].pieceColor) {
      const currentState = this.state.gameBoard;
      this.setState({
        activePiece: [row, col],
      });
      //set all possible moves to active
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

  findAvailableMoves(colour, gameBoard) {
    // console.log(`finding moves for ${colour}`);
    let availableMoves = this.initialiseFalse();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++)
        if (gameBoard[row][col].pieceColor === colour) {
          const moreAvailableMoves = findPossibleMoves.bind(this)(
            row,
            col,
            gameBoard[row][col].pieceType,
            gameBoard[row][col].numMoves,
            colour,
            gameBoard
          );
          console.log(
            `found available moves for ${colour} ${gameBoard[row][col].pieceType}`
          );
          console.log(moreAvailableMoves);
          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
              if (moreAvailableMoves[i][j]) {
                availableMoves[i][j] = true;
              }
            }
          }
        }
    }
    return availableMoves;
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
        <section className="sideBar white">
          <div className="playerHeading">White Player</div>
          <div className="yourTurn white">
            {this.state.playerTurn === "white" && "Your turn"}
          </div>
          <figure className="toggle">
            <label id="whiteEasyMode" className="switch white">
              <input type="checkbox" onChange={this.toggleEasyWhite} />
              <span className="slider round"></span>
            </label>
            <label htmlFor="whiteEasyMode">Easy Mode</label>
          </figure>
          <div className="check">{this.state.whiteCheck && "CHECK"}</div>
        </section>

        <section className="gameBoard">{this.renderBoard()}</section>
        <section className="sideBar black">
          <div className="playerHeading">Black Player</div>
          <div className="yourTurn black">
            {this.state.playerTurn === "black" && "Your turn"}
          </div>
          <figure className="toggle">
            <label id="blackEasyMode" className="switch black">
              <input type="checkbox" onChange={this.toggleEasyBlack} />
              <span className="slider round"></span>
            </label>
            <label htmlFor="blackEasyMode">Easy Mode</label>
          </figure>
          <div className="check">{this.state.blackCheck && "CHECK"}</div>
        </section>
      </div>
    );
  }
}

export default App;
