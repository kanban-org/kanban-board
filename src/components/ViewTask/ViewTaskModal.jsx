import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import classes from "./ViewTaskModal.module.scss";
import FormSelect from "../FormSelect/FormSelect";

function ViewTaskModal({
	id,
	title,
	description,
	subtasks,
	totalSubtasks,
	comepletedSubtasks,
	allColumnNames,
	currentColumn
}) {
	return (
		<div className={classes.container}>
			<h3 className="heading--3 mb-sm">{title}</h3>
			<p className="heading--6 mb-sm">{description}</p>
			<h5 className="heading--5 mb-xs">
				Subtasks ({comepletedSubtasks} of {totalSubtasks})
			</h5>
			<div className={classes.inputContainer + " scrollbar"}>
				{subtasks.map((subtask) => {
					return (
						<Checkbox
							label={subtask.description}
							id={subtask.id}
							checked={subtask.completed}
							key={subtask.id}
						/>
					);
				})}
			</div>

			<h5 className="heading--5 mb-xxs">status</h5>
			<FormSelect />
		</div>
	);
}

export default ViewTaskModal;
