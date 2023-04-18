import { useFormik } from "formik";
import classes from "../Forms/Forms.module.scss";
import ColorPicker from "../UI/ColorPicker";
import { toCamelCase } from "../../utils";
import { FORM_CONSTANTS } from "../../utils/constants";
import { validateFieldsOfForm } from "../../validate";

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

  const handleColorChange = (hexColor) => {
    formik.setFieldValue("color", hexColor);
  };

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
