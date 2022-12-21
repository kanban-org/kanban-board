import { useState } from "react";
import classes from "./Checkbox.module.scss";

const Checkbox = ({ id, label, checked }) => {
	const [isChecked, setIsChecked] = useState(checked);

	return (
		<div className={classes["checkbox-wrapper"]}>
			<input
				id={`subtask-${id}`}
				type="checkbox"
				checked={isChecked}
				onChange={() => setIsChecked((prev) => !prev)}
			/>
			<label className="text-sm" htmlFor={`subtask-${id}`}>
				{label}
			</label>
		</div>
	);
};
export default Checkbox;
