import { useFormik } from "formik";
import classes from "../Forms/Forms.module.scss";
import ColorPicker from "../UI/ColorPicker";
import {
  generateUUID,
  getRandomSubtaskThumbnails,
  toCamelCase,
} from "../../utils";
import { FORM_CONSTANTS } from "../../utils/constants";
import { validateFieldsOfForm } from "../../validate";
import icons from "../../img/symbol-defs.svg";
import Tooltip from "../UI/Tooltip";
import { useCallback } from "react";

function ModalForm(props) {
  const { handleFormSubmit, showColorPicker, taskForm, formId, ...rest } =
    props;

  const formik = useFormik({
    initialValues: FORM_CONSTANTS[formId],
    validate: (values) => {
      return validateFieldsOfForm(values, formId);
    },
    onSubmit: (values) => {
      handleFormSubmit({ ...values, ...rest });
    },
  });

  const handleColorChange = useCallback(
    (hexColor) => {
      formik.setFieldValue("color", hexColor);
    },
    [formik]
  );

  const handleRemoveSubtask = useCallback(
    (subtaskId) => {
      const subtasks = formik.values.subtasks.filter(
        (subtask) => subtask.id !== subtaskId
      );
      formik.setFieldValue("subtasks", subtasks);
    },
    [formik]
  );

  const handleAddNewSubtask = useCallback(
    (event) => {
      event.preventDefault();
      const subtasks = [...formik.values.subtasks];
      subtasks.push({
        id: generateUUID(),
        subtaskValue: "",
        placeholder: getRandomSubtaskThumbnails(),
      });
      formik.setFieldValue("subtasks", subtasks);
    },
    [formik]
  );

  const { heading, buttonTitle, label } = FORM_CONSTANTS[formId];

  return (
    <>
      <h3 className="heading--3 mb-sm">{heading}</h3>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className={classes.form__group}>
          <label htmlFor={toCamelCase(label)} className={classes.form__label}>
            {label}
          </label>
          <input
            type="text"
            id={toCamelCase(label)}
            className={classes.form__input}
            placeholder="e.g. Platform launch"
            name={toCamelCase(label)}
            value={formik.values[`${toCamelCase(label)}`]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched[`${toCamelCase(label)}`] &&
          formik.errors[`${toCamelCase(label)}`] ? (
            <div className={classes.error}>
              {formik.errors[`${toCamelCase(label)}`]}
            </div>
          ) : null}
        </div>
        {taskForm && (
          <>
            <div className={classes.form__group}>
              <label htmlFor="taskDescription" className={classes.form__label}>
                Description
              </label>
              <textarea
                id="taskDescription"
                className={classes.form__input + " scrollbar"}
                maxLength="180"
                placeholder="e.g. It's always good to take a break. This 15 mins break will recharge the batteries a little."
                name="taskDescription"
                value={formik.values.taskDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className={classes.form__group}>
              <div className={classes.subtask__heading}>
                <label htmlFor="subtask" className={classes.form__label}>
                  Subtasks
                </label>
                <Tooltip content="Add New Subtask" delay="0" direction="left">
                  <button
                    className="btn btn-overlay margin-right-0_5"
                    onClick={(e) => handleAddNewSubtask(e)}
                  >
                    <svg
                      className="svg"
                      style={{ paddingTop: "0.2rem", paddingLeft: "0.2rem" }}
                    >
                      <use href={icons + "#icon-plus"}></use>
                    </svg>
                  </button>
                </Tooltip>
              </div>
              <div className={classes.form__input__group + " scrollbar"}>
                {formik.values.subtasks.map((subtask, index) => {
                  return (
                    <div className={classes.subtask__input} key={subtask.id}>
                      <input
                        type="text"
                        id={`subtask${subtask.id}`}
                        className={classes.form__input}
                        placeholder={subtask.placeholder}
                        name={`subtasks[${index}].subtaskValue`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <button
                        className="btn btn-overlay margin-right-0_5"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                      >
                        <svg className="svg">
                          <use href={icons + "#icon-clear"}></use>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {showColorPicker && (
          <ColorPicker
            colorChange={handleColorChange}
            currentColor={formik.values.color}
          />
        )}
        <button type="submit" className="btn btn-primary">
          {buttonTitle}
        </button>
      </form>
    </>
  );
}

export default ModalForm;
