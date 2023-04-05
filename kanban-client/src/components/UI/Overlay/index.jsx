import classes from "./Overlay.module.scss";

function Overlay({ onClickAction }) {
	return <div className={classes.overlay} onClick={onClickAction}></div>;
}

export default Overlay;
