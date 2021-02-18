import "./square.css";

function Square(props) {
  const name = `square ${props.squareColor}`;
  const imgSrc = `url("../../images/${props.pieceColor}${props.pieceType}.png")`;
  const styles = {};
  if (props.pieceType !== "none") {
    styles.backgroundImage = imgSrc;
  }
  if (props.possibleMove && props.easyMode) {
    styles.backgroundColor = "yellow";
  }
  if (props.active) {
    styles.backgroundColor = "red";
  }
  return <div style={styles} className={name} onClick={props.onClick}></div>;
}
export default Square;
