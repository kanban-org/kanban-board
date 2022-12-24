import React from "react";
import classes from "./TaskList.module.scss";

import TaskBox from "../../../Task/TaskBox/TaskBox";

function TaskList({ tasks, allColumns, columnName }) {
	return (
		<ul className={classes.taskList + " scrollbar"} role={["list"]}>
			{tasks.map((task) => (
				<TaskBox task={task} key={task.id} allColumnNames={allColumns} currentColumn={columnName} />
			))}
		</ul>
	);
}

export default TaskList;
