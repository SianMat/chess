import "./square.css";

function Square(props) {
  const name = `square ${props.squareColor}`;
  const styles = {};

  if (props.pieceType !== "none") {
    styles.backgroundImage = `url(${
      process.env.PUBLIC_URL +
      "/Images/" +
      props.pieceColor +
      props.pieceType +
      ".png"
    })`;
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
  return <div style={styles} className={name} onClick={props.onClick}></div>;
}
export default Square;
