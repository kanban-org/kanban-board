import { useState } from "react";
import classes from "../Forms/Forms.module.scss";
import ColorPicker from "../UI/ColorPicker";

function BoardForm(props) {
  const { initialValues, handleBoardFormSubmit, showColorPicker } = props;
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#3f51b5");

  const handleColorChange = (hexColor) => {
    setColor(hexColor);
  };

  const handleFormChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = { input, color };
    handleBoardFormSubmit(data);
  };

  const { heading, buttonTitle } = initialValues;

  return (
    <>
      <h3 className="heading--3 mb-sm">{heading}</h3>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <div className={classes.form__group}>
          <label htmlFor="boardName" className={classes.form__label}>
            Board Name
          </label>
          <input
            type="text"
            id="boardName"
            className={classes.form__input}
            placeholder="e.g. Platform launch"
            value={input}
            onChange={handleFormChange}
          />
        </div>
        {showColorPicker && (
          <ColorPicker colorChange={handleColorChange} currentColor={color} />
        )}
        <button className="btn btn-primary btn-sm">{buttonTitle}</button>
      </form>
    </>
  );
}

export default BoardForm;
