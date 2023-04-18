import classes from "./Overlay.module.scss";

function Overlay({ onClick }) {
  return <div className={classes.overlay} onClick={onClick}></div>;
}

export default Overlay;
