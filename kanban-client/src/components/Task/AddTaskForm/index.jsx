import React, { useState } from "react";
import FormSelect from "../../Forms/FormSelect";
import classes from "./AddTaskForm.module.scss";
import formClasses from "../../Forms/Forms.module.scss";
import icons from "../../../img/symbol-defs.svg";

function AddTaskForm() {
  const [displayPage1, setDisplayPage1] = useState(true);
  const [displayPage2, setDisplayPage2] = useState(false);

  const onClickPage1 = (e) => {
    e.preventDefault();
    setDisplayPage1(true);
    setDisplayPage2(false);
  };

  const onClickPage2 = (e) => {
    e.preventDefault();
    setDisplayPage1(false);
    setDisplayPage2(true);
  };

  return (
    <>
      <h3 className="heading--3 mb-sm">Add new task</h3>

      <form className={formClasses.form}>
        {displayPage1 && (
          <fieldset>
            <div className={formClasses.form__group}>
              <label htmlFor="title" className={formClasses.form__label}>
                Title
              </label>
              <input
                type="text"
                id="title"
                className={formClasses.form__input}
                placeholder="e.g. Take coffee break"
              />
            </div>

            <div className={formClasses.form__group}>
              <label htmlFor="description" className={formClasses.form__label}>
                Description
              </label>
              <textarea
                id="description"
                className={formClasses.form__input + " scrollbar"}
                maxLength="180"
                placeholder="e.g. It's always good to take a break. This 15 mins break will recharge the batteries a little."
              />
            </div>

            <div
              className={
                formClasses.form__group + " " + classes.subtasks__container
              }
            >
              <label htmlFor="subtask" className={formClasses.form__label}>
                Subtasks
              </label>
              <div className={formClasses.form__input__group + " scrollbar"}>
                <div className={classes.subtask__input}>
                  <input
                    type="text"
                    id="subtask"
                    className={formClasses.form__input}
                    placeholder="e.g. Make coffee"
                  />
                  <button className="btn">
                    <svg className="svg">
                      <use href={icons + "#icon-clear"}></use>
                    </svg>
                  </button>
                </div>
                <div className={classes.subtask__input}>
                  <input
                    type="text"
                    id="subtask"
                    className={formClasses.form__input}
                    placeholder="e.g. Make coffee"
                  />
                  <button className="btn">
                    <svg className="svg">
                      <use href={icons + "#icon-clear"}></use>
                    </svg>
                  </button>
                </div>
                <div className={classes.subtask__input}>
                  <input
                    type="text"
                    id="subtask"
                    className={formClasses.form__input}
                    placeholder="e.g. Make coffee"
                  />
                  <button className="btn">
                    <svg className="svg">
                      <use href={icons + "#icon-clear"}></use>
                    </svg>
                  </button>
                </div>
                <div className={classes.subtask__input}>
                  <input
                    type="text"
                    id="subtask"
                    className={formClasses.form__input}
                    placeholder="e.g. Make coffee"
                  />
                  <button className="btn">
                    <svg className="svg">
                      <use href={icons + "#icon-clear"}></use>
                    </svg>
                  </button>
                </div>
              </div>

              <button className="btn btn-primary btn-sm btn-lg">
                Add more subtasks
              </button>
            </div>
          </fieldset>
        )}

        {displayPage2 && (
          <fieldset>
            <div className={formClasses.form__group + " mb-md"}>
              <label htmlFor="status" className={formClasses.form__label}>
                Status
              </label>
              <FormSelect />
            </div>
            <button className="btn btn-primary btn-sm btn-lg">
              Create task
            </button>
          </fieldset>
        )}

        <div className={classes.pagination}>
          <button
            className={
              classes.btn__pagination +
              " " +
              (displayPage1 ? classes.btn__active : "")
            }
            onClick={onClickPage1}
          >
            1
          </button>
          <button
            className={
              classes.btn__pagination +
              " " +
              (displayPage2 ? classes.btn__active : "")
            }
            onClick={onClickPage2}
          >
            2
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTaskForm;
