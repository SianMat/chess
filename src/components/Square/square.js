import "./square.css";

function Square(props) {
  const name = `square ${props.squareColor}`;
  const imgSrc = `url("../../images/${props.pieceColor}${props.pieceType}.png")`;
  const styles = {};
  if (props.pieceType !== "none") {
    styles.backgroundImage = imgSrc;
  }
  return (
    <div
      style={styles}
      className={name}
      pieceColor={props.pieceColor}
      pieceType={props.pieceType}
    ></div>
  );
}
export default Square;
