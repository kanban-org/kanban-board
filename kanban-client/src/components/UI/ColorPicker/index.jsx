import formClasses from "../../Forms/Forms.module.scss";
import { CirclePicker } from "react-color";
import classes from "./ColorPicker.module.scss";

const ColorPicker = ({ colorChange, currentColor }) => {
  return (
    <div className={formClasses.form__group} style={{ paddingTop: "2rem" }}>
      <label htmlFor="trackColor" className={formClasses.form__label}>
        Choose color for new column
      </label>
      <CirclePicker
        circleSize={23}
        className={classes.circlePicker}
        color={currentColor}
        onChange={(color) => {
          colorChange(color.hex);
        }}
      />
    </div>
  );
};

export default ColorPicker;
