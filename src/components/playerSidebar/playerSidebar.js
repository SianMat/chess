import "./playerSidebar.css";
import Toggle from "../toggle/toggle";
import CapturedPieces from "../capturedPieces/capturedPieces";

function Sidebar(props) {
  let opponent = "white";
  if (props.color === "white") {
    opponent = "black";
  }
  const sectionClassName = `sidebar ${props.color}`;
  const playerHeading = `${props.color} Player`;
  const labelId = `${props.color}EasyMode`;
  return (
    <section className={sectionClassName}>
      <div className="playerHeading">{playerHeading}</div>
      <div className="yourTurn">
        {props.playerTurn === props.color && "Your turn"}
      </div>
      <Toggle
        labelId={labelId}
        toggleEasyMode={props.toggleEasyMode}
        color={props.color}
      />
      <div className="check">{props.check && "CHECK"}</div>
      <CapturedPieces
        pieces={props.capturedPieces}
        color={opponent}
      ></CapturedPieces>
    </section>
  );
}

export default Sidebar;
