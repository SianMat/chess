import "./capturedPieces.css";

function CapturedPieces(props) {
  let capturedPieces = [];

  props.pieces.forEach((piece, i) => {
    const image = require(`../../Images/${props.color}${piece}.png`);
    capturedPieces.push(
      <img className="capturedPiece" alt="" src={image.default} key={i} />
    );
  });
  return <div className="capturedPieces">{capturedPieces}</div>;
}
export default CapturedPieces;
