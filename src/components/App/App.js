import "./App.css";
import React from "react";
import lodash from "lodash";
import GameBoard from "../gameBoard/gameBoard";
import Sidebar from "../playerSidebar/playerSidebar";
import IllegalMoveButton from "../illegalMoveButton/illegalMoveButton";
import PawnPromotion from "../pawnPromotion/pawnPromotion";
import EndGame from "../endGame/endGame";
import initialiseBoard from "./initialiseBoard";
import selectActivePiece from "./selectActivePiece";
import findAvailableMoves from "./findAvailableMoves";
import makeMove from "./makeMove";
import checkMate from "./checkMate";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: initialiseBoard.bind(this)(), //8by8 array containing square color, and piece type, color and number of moves
      playerTurn: "white",
      activePiece: false, //false if no piece is selected, else gives coordinates
      possibleMoves: this.initialiseFalse(), //this keeps a record of all possible moves from active piece
      // availableMoves: this.initialiseFalse(), //this keeps a record of all available moves for player whose turn it is
      easyModeBlack: false,
      easyModeWhite: false,
      blackKingPosition: [0, 4],
      whiteKingPosition: [7, 4],
      blackCheck: false,
      whiteCheck: false,
      blackCapturedPieces: [], //track which white pieces the black player has captured
      whiteCapturedPieces: [], //track which black pieces the white player has captured
      illegalMove: false, //tracks if player has attempted to make a move that will put them into check
      pawnPromotion: false,
      checkMate: false,
    };
    this.baseState = this.state;
    this.handleEndGame = this.handleEndGame.bind(this);
  }

  //used to initialise an 8by8 grid of falses for the constructor
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

  //performs an additional check for check or checkmate if a pawn promotion has just been made
  componentDidUpdate(prevProps, prevState) {
    //check if a pawn promotion was made, as an additional check for check will be required
    if (!this.state.pawnPromotion && prevState.pawnPromotion) {
      //this is called after the promotion is made and at the beginning of the next players turn
      let blackCheck = false;
      let whiteCheck = false;
      let endGame = false;
      const playerTurn = this.state.playerTurn;
      if (playerTurn === "white") {
        //check if white is in check
        whiteCheck = findAvailableMoves.bind(this)(
          "black",
          this.state.gameBoard
        )[this.state.whiteKingPosition[0]][this.state.whiteKingPosition[1]];
        //if white is now in check, test for check mate
        if (whiteCheck) {
          endGame = checkMate.bind(this)(
            "white",
            "black",
            this.state.gameBoard,
            this.state.whiteKingPosition
          );
        }
      } else {
        //check if black is in check
        blackCheck = findAvailableMoves.bind(this)(
          "white",
          this.state.gameBoard
        )[this.state.blackKingPosition[0]][this.state.blackKingPosition[1]];
        //if black is now in check, test for check mate
        if (blackCheck) {
          endGame = checkMate.bind(this)(
            "black",
            "white",
            this.state.gameBoard,
            this.state.blackKingPosition
          );
        }
      }
      this.setState({
        blackCheck,
        whiteCheck,
        endGame,
      });
    }
  }

  //swaps piece on gameBoard with chosen promotion piece
  handlePawnPromotion(e) {
    const gameBoard = lodash.cloneDeep(this.state.gameBoard);
    gameBoard[this.state.pawnPromotion[0]][
      this.state.pawnPromotion[1]
    ].pieceType = e.target.getAttribute("piecetype");
    gameBoard[this.state.pawnPromotion[0]][
      this.state.pawnPromotion[1]
    ].pieceColor = e.target.getAttribute("piececolor");
    this.setState({
      gameBoard,
      pawnPromotion: false,
    });
  }

  //closes the warning box and allows play to resume
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

  //toggles easy mode on and off for relevant color
  handleToggle(color) {
    if (color === "black") {
      const easyMode = this.state.easyModeBlack;
      this.setState({
        easyModeBlack: !easyMode,
      });
    } else if (color === "white") {
      const easyMode = this.state.easyModeWhite;
      this.setState({
        easyModeWhite: !easyMode,
      });
    }
  }

  handleEndGame() {
    this.setState(this.baseState);
  }

  render() {
    return (
      <div className="page">
        <Sidebar
          className="whitePlayerInfo"
          playerTurn={this.state.playerTurn}
          check={this.state.whiteCheck}
          toggleEasyMode={this.handleToggle.bind(this, "white")}
          color="white"
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
          pawnPromotion={this.state.pawnPromotion}
          // availableMoves={this.state.availableMoves}
        />
        <Sidebar
          className="blackPlayerInfo"
          playerTurn={this.state.playerTurn}
          check={this.state.blackCheck}
          toggleEasyMode={this.handleToggle.bind(this, "black")}
          color="black"
          capturedPieces={this.state.blackCapturedPieces}
        />
        <IllegalMoveButton
          active={this.state.illegalMove}
          onClick={this.handleWarningClick.bind(this)}
        />
        <EndGame
          active={this.state.checkMate}
          winner={this.state.whiteCheck ? "black" : "white"}
          onClick={this.handleEndGame}
        />
        <PawnPromotion
          color={this.state.playerTurn === "white" ? "black" : "white"}
          active={this.state.pawnPromotion}
          onClick={this.handlePawnPromotion.bind(this)}
        />
      </div>
    );
  }
}

export default App;
