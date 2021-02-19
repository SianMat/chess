import "./playerSidebar.css";
import Toggle from "../toggle/toggle";
import CapturedPieces from "../capturedPieces/capturedPieces";

function Sidebar(props) {
  let opponent = "white";
  if (props.colour === "white") {
    opponent = "black";
  }
  const sectionClassName = `sidebar ${props.colour}`;
  const playerHeading = `${props.colour} Player`;
  const labelId = `${props.colour}EasyMode`;
  return (
    <section className={sectionClassName}>
      <div className="playerHeading">{playerHeading}</div>
      <div className="yourTurn">
        {props.playerTurn === props.colour && "Your turn"}
      </div>
      <Toggle
        labelId={labelId}
        toggleEasyMode={props.toggleEasyMode}
        colour={props.colour}
      />
      <div className="check">{props.check && "CHECK"}</div>
      <CapturedPieces
        pieces={props.capturedPieces}
        colour={opponent}
      ></CapturedPieces>
    </section>
  );
}

export default Sidebar;
