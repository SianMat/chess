import "./pawnPromotion.css";

function PawnPromotion(props) {
  const styles = {
    display: "none",
  };
  if (props.active !== false) {
    styles.display = "flex";
  }
  const queen = require(`../../Images/${props.color}queen.png`);
  const bishop = require(`../../Images/${props.color}bishop.png`);
  const knight = require(`../../Images/${props.color}knight.png`);
  const rook = require(`../../Images/${props.color}rook.png`);

  return (
    <div className="pawnPromotionDisplay" style={styles}>
      <h1 className="pawnPromotionCongrats">Congratulations!</h1>
      <p className="pawnPromotionInfo">
        Select a piece to promote your pawn to
      </p>
      <div className="pawnPromotionOptions">
        <img
          alt=""
          src={queen.default}
          onClick={props.onClick}
          piececolor={props.color}
          piecetype="queen"
        />
        <img
          alt=""
          src={bishop.default}
          onClick={props.onClick}
          piececolor={props.color}
          piecetype="bishop"
        />
        <img
          alt=""
          src={knight.default}
          onClick={props.onClick}
          piececolor={props.color}
          piecetype="knight"
        />
        <img
          alt=""
          src={rook.default}
          onClick={props.onClick}
          piececolor={props.color}
          piecetype="rook"
        />
      </div>
    </div>
  );
}
export default PawnPromotion;
