import "./App.css";
import React from "react";
import GameBoard from "../gameBoard/gameBoard";
import Sidebar from "../playerSidebar/playerSidebar";
import IllegalMoveButton from "../illegalMoveButton/illegalMoveButton";
import initialiseBoard from "./initialiseBoard";
import selectActivePiece from "./selectActivePiece";
import makeMove from "./makeMove";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: initialiseBoard.bind(this)(), //8by8 array containing square colour, and piece type, colour and number of moves
      playerTurn: "white",
      activePiece: false, //false if no piece is selected, else gives coordinates
      possibleMoves: this.initialiseFalse(), //this keeps a record of all possible moves from active piece
      availableMoves: this.initialiseFalse(), //this keeps a record of all available moves for player whose turn it is
      easyModeBlack: false,
      easyModeWhite: false,
      blackKingPosition: [0, 4],
      whiteKingPosition: [7, 4],
      blackCheck: false,
      whiteCheck: false,
      blackCapturedPieces: [], //track which white pieces the black player has captured
      whiteCapturedPieces: [], //track which black pieces the white player has captured
      illegalMove: false, //tracks if player has attempted to make a move that will put them into check
    };
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

  handleWarningClick() {
    this.setState({
      illegalMove: false,
    });
  }

  //determines whether to select a piece or make a move when a square is clicked
  handleClick(row, col) {
    if (!this.state.activePiece) {
      return () => selectActivePiece.bind(this)(row, col);
    } else {
      return () => makeMove.bind(this)(row, col);
    }
  }

  //toggles easy mode on and off for relevant colour
  handleToggle(colour) {
    if (colour === "black") {
      const easyMode = this.state.easyModeBlack;
      this.setState({
        easyModeBlack: !easyMode,
      });
    } else if (colour === "white") {
      const easyMode = this.state.easyModeWhite;
      this.setState({
        easyModeWhite: !easyMode,
      });
    }
  }

  render() {
    return (
      <div className="page">
        <Sidebar
          className="whitePlayerInfo"
          playerTurn={this.state.playerTurn}
          check={this.state.whiteCheck}
          toggleEasyMode={this.handleToggle.bind(this, "white")}
          colour="white"
          capturedPieces={this.state.whiteCapturedPieces}
        />
        <GameBoard
          playerTurn={this.state.playerTurn}
          easyModeBlack={this.state.easyModeBlack}
          easyModeWhite={this.state.easyModeWhite}
          gameBoard={this.state.gameBoard}
          activeRow={this.state.activePiece[0]}
          activeColumn={this.state.activePiece[1]}
          handleClick={this.handleClick.bind(this)}
          possibleMoves={this.state.possibleMoves}
          availableMoves={this.state.availableMoves}
        />
        <Sidebar
          className="blackPlayerInfo"
          playerTurn={this.state.playerTurn}
          check={this.state.blackCheck}
          toggleEasyMode={this.handleToggle.bind(this, "black")}
          colour="black"
          capturedPieces={this.state.blackCapturedPieces}
        />
        <IllegalMoveButton
          active={this.state.illegalMove}
          onClick={this.handleWarningClick.bind(this)}
        />
      </div>
    );
  }
}

export default App;
