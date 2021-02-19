import "./capturedPieces.css";

function CapturedPieces(props) {
  let capturedPieces = [];

  props.pieces.forEach((piece) => {
    const image = require(`../../Images/${props.colour}${piece}.png`);
    capturedPieces.push(<img className="capturedPiece" alt="" src={image.default} />);
  });
  return <div className="capturedPieces">{capturedPieces}</div>;
}
export default CapturedPieces;
