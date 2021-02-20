import "./square.css";

function Square(props) {
  const name = `square ${props.squareColor}`;
  const styles = {};
  let image;

  if (props.pieceType !== "none") {
    image = require(`../../Images/${props.pieceColor}${props.pieceType}.png`);
    // styles.backgroundImage = `url(${image.default})`;
  }
  // if (props.availableMove) {
  //   styles.backgroundColor = "green";
  // }
  if (props.possibleMove && props.easyMode) {
    styles.backgroundColor = "yellow";
  }

  if (props.active) {
    styles.backgroundColor = "red";
  }

  function renderImage() {
    if (image) {
      return <img className="chessPiece" src={image.default} alt="" />;
    }
  }

  return (
    <div style={styles} className={name} onClick={props.onClick}>
      {renderImage()}
    </div>
  );
}
export default Square;
