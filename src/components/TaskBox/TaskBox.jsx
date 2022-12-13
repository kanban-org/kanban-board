import React from "react";
import Task from "../Task/Task";
import classes from "./TaskBox.module.scss";

function TaskBox() {
	return (
		<li className={classes.taskBox}>
			<Task />
		</li>
	);
}

export default TaskBox;
