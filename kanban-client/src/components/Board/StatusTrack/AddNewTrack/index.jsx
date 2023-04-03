import React, { useState } from "react";
import classes from "./AddNewTrack.module.scss";
import formClasses from "../../../Forms/Forms.module.scss";
import { CirclePicker } from "react-color";

function AddNewTrack() {
  const [hex, setHex] = useState("#3f51b5");

  return (
    <>
      <h3 className="heading--3 mb-sm">Add new track</h3>
      <form className={formClasses.form} autoComplete="off">
        <div className={formClasses.form__group}>
          <label htmlFor="trackName" className={formClasses.form__label}>
            Track Name
          </label>
          <input
            type="text"
            id="trackName"
            className={formClasses.form__input}
            placeholder="e.g. Pending"
          />
        </div>
        <div className={formClasses.form__group}>
          <label htmlFor="trackColor" className={formClasses.form__label}>
            Choose color for new column
          </label>
          <CirclePicker
            circleSize={23}
            className={classes.circlePicker}
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />
        </div>
        <button className="btn btn-primary btn-sm">Create new track</button>
      </form>
    </>
  );
}

export default AddNewTrack;
