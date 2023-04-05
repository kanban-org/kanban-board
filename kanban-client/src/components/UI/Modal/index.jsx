import React from "react";
import classes from "./Modal.module.scss";

function Modal(props) {
  return (
    <div className={classes.modal} style={props.styles}>
      {props.children}
      <button className={classes.modalCloseBtn} onClick={props.onCloseModal}>
        &#x2715;
      </button>
    </div>
  );
}

export default Modal;
