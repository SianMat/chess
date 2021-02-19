import "./illegalMoveButton.css";

function IllegalMoveButton(props) {
  const styles = {
    display: "none",
  };
  if (props.active) {
    styles.display = "flex";
  }
  return (
    <div className="illegalMoveButton" style={styles}>
      <p className="illegalMoveWarning">
        This would but you into check, make another move
      </p>
      <button className="illegalMoveOk" onClick={props.onClick}>
        OK
      </button>
    </div>
  );
}
export default IllegalMoveButton;
