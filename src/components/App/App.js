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
      playerTurn: "white", //white goes first
      activePiece: false, //false if no piece is selected, else gives coordinates of active piece
      possibleMoves: this.initialiseFalse(), //this keeps a record of all possible moves from active piece
      // availableMoves: this.initialiseFalse(), //this keeps a record of all available moves for player whose turn it is
      easyModeBlack: false, //track if black player has selected to play in easy mode
      easyModeWhite: false, //track if white player has selected to play in easy mode
      blackKingPosition: [0, 4], //track the position of the black king to make checking for check quicker
      whiteKingPosition: [7, 4], //track the position of the white king to make checking for check quicker
      blackCheck: false, //track if black is in check
      whiteCheck: false, //track if white is in check
      blackCapturedPieces: [], //track which white pieces the black player has captured
      whiteCapturedPieces: [], //track which black pieces the white player has captured
      illegalMove: false, //tracks if player has attempted to make a move that will put them into check
      pawnPromotion: false, //track if a pawn promotion has just been made so that additional checks for check can be made
      checkMate: false, //Check if a player is in checkMate to end the game
      moveSuccessful: false, //track if a move has been succesfully made so that checks for checkmate can be made
    };
    this.baseState = this.state; //used to reset the game
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

  //performs a check for check mate after every move. Also does an additional check for check if pawn promotion has just been made
  componentDidUpdate(prevProps, prevState) {
    const playerTurn = this.state.playerTurn;

    //check if a pawn promotion was made, as an additional check for check will be required
    //this is called after the promotion is made and at the beginning of the next players turn
    let blackCheck = this.state.blackCheck;
    let whiteCheck = this.state.whiteCheck;
    if (!this.state.pawnPromotion && prevState.pawnPromotion) {
      if (playerTurn === "white") {
        //check if white is in check
        whiteCheck = findAvailableMoves.bind(this)(
          "black",
          this.state.gameBoard
        )[this.state.whiteKingPosition[0]][this.state.whiteKingPosition[1]];
      } else {
        //check if black is in check
        blackCheck = findAvailableMoves.bind(this)(
          "white",
          this.state.gameBoard
        )[this.state.blackKingPosition[0]][this.state.blackKingPosition[1]];
      }
      this.setState({
        whiteCheck,
        blackCheck,
        moveSuccessful: true, //reset this back to true to check for check mate with new piece
      });
    }

    //if a move has successfully been made, check for check mate
    //this is called at the beginning of a players turn
    let endGame = false;
    if (this.state.moveSuccessful) {
      //check for check mate after every move (a player does not have to be in check to be in check mate)
      if (playerTurn === "white") {
        endGame = checkMate.bind(this)(
          "white",
          "black",
          this.state.gameBoard,
          this.state.whiteKingPosition
        );
      } else {
        endGame = checkMate.bind(this)(
          "black",
          "white",
          this.state.gameBoard,
          this.state.blackKingPosition
        );
      }
      this.setState({
        checkMate: endGame,
        moveSuccessful: false,
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

  //closes the illegal move warning box and allows play to resume
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

  //toggles easy mode on and off for relevant player
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

  //resets the board at the end of the game
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
