import React from "react";
import TaskDetails from "../TaskDetails/TaskDetails";
import classes from "./TaskBox.module.scss";

function TaskBox() {
	return (
		<li className={classes.taskBox}>
			<TaskDetails />
		</li>
	);
}

export default TaskBox;
