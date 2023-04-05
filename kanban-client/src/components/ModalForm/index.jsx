import { useEffect, useRef, useState } from "react";
import classes from "../Forms/Forms.module.scss";
import ColorPicker from "../UI/ColorPicker";
import { toCamelCase } from "../../utils";

function ModalForm(props) {
  const { initialValues, handleFormSubmit, showColorPicker, ...rest } = props;
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#3f51b5");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleColorChange = (hexColor) => {
    setColor(hexColor);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const data = { input, color, ...rest };
    handleFormSubmit(data);
  };

  const { heading, buttonTitle, label } = initialValues;

  return (
    <>
      <h3 className="heading--3 mb-sm">{heading}</h3>
      <form className={classes.form} autoComplete="off" onSubmit={onFormSubmit}>
        <div className={classes.form__group}>
          <label htmlFor={toCamelCase(label)} className={classes.form__label}>
            {label}
          </label>
          <input
            type="text"
            id={toCamelCase(label)}
            className={classes.form__input}
            placeholder="e.g. Platform launch"
            value={input}
            ref={inputRef}
            onChange={handleInputChange}
          />
        </div>
        {showColorPicker && (
          <ColorPicker colorChange={handleColorChange} currentColor={color} />
        )}
        <button className="btn btn-primary">{buttonTitle}</button>
      </form>
    </>
  );
}

export default ModalForm;
