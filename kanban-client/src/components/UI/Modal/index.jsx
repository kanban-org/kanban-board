import classes from "./Modal.module.scss";

function Modal({ styles, children, onCloseModal }) {
  return (
    <div className={classes.modal} style={styles}>
      {children}
      <button className={classes.modalCloseBtn} onClick={onCloseModal}>
        &#x2715;
      </button>
    </div>
  );
}

export default Modal;
