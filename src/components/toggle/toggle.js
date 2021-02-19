import "./toggle.css";

function Toggle(props) {
  return (
    <figure className="toggle">
      <label id={props.labelId} className="switch">
        <input type="checkbox" onChange={props.toggleEasyMode} />
        <span className="slider round"></span>
      </label>
      <label htmlFor={props.labelId}>Easy Mode</label>
    </figure>
  );
}
export default Toggle;
