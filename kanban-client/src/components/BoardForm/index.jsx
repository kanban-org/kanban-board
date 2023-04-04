import { useState } from "react";
import classes from "../Forms/Forms.module.scss";

function BoardForm(props) {
  const { intitialValues, handleModal } = props;
  const [input, setInput] = useState("");
  const handleFormChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = { boardName: input };
    handleModal(data);
  };

  const { heading, buttonTitle } = intitialValues;

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
        <button className="btn btn-primary btn-sm">{buttonTitle}</button>
      </form>
    </>
  );
}

export default BoardForm;
