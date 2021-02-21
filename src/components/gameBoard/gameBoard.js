import Square from "../Square/square";
import "./gameBoard.css";

function GameBoard(props) {
  let easyMode = false;
  if (props.playerTurn === "black" && props.easyModeBlack) {
    easyMode = true;
  } else if (props.playerTurn === "white" && props.easyModeWhite) {
    easyMode = true;
  }

  function renderSquares() {
    return props.gameBoard.map((row, rowIndex) => {
      return row.map((square, columnIndex) => {
        let active = false;
        if (
          rowIndex === props.activeRow &&
          columnIndex === props.activeColumn
        ) {
          active = true;
        }
        return (
          <Square
            key={`${rowIndex} ${columnIndex}`}
            squareColor={square.squareColor}
            pieceColor={square.pieceColor}
            pieceType={square.pieceType}
            onClick={props.handleClick(rowIndex, columnIndex)}
            active={active}
            possibleMove={props.possibleMoves[rowIndex][columnIndex]}
            // availableMove={props.availableMoves[rowIndex][columnIndex]}
            easyMode={easyMode}
          />
        );
      });
    });
  }

  return <div className="gameBoard">{renderSquares()}</div>;
}

export default GameBoard;
