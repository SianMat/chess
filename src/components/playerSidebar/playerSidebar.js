import "./playerSidebar.css";
import Toggle from "../toggle/toggle";

function Sidebar(props) {
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
    </section>
  );
}

export default Sidebar;
