import "./endGame.css";

function EndGame(props) {
  const styles = {
    display: "none",
  };
  if (props.active) {
    styles.display = "flex";
  }
  return (
    <div className="endGameButton" style={styles}>
      <p className="endGameWarning">Check Mate</p>
      <p>{props.winner} wins!</p>
      <button className="endGameRestart" onClick={props.onClick}>
        Restart
      </button>
    </div>
  );
}
export default EndGame;
