import classes from "./Checkbox.module.scss";

const Checkbox = ({ id, label, status, updateSubtaskStatus }) => {
  return (
    <div className={classes["checkbox-wrapper"]}>
      <input
        id={`subtask-${id}`}
        type="checkbox"
        checked={status}
        onChange={() => updateSubtaskStatus(id)}
      />
      <label className="text-sm" htmlFor={`subtask-${id}`}>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;
