import React from "react";
import classes from "./TaskList.module.scss";

import TaskBox from "../../../Task/TaskBox/TaskBox";

function TaskList({ tasks, allColumns, columnName, onScrollHandler }) {
	return (
		<ul className={classes.taskList + " scrollbar"} role={["list"]} onScroll={onScrollHandler}>
			{tasks.map((task) => (
				<TaskBox task={task} key={task.id} allColumnNames={allColumns} currentColumn={columnName} />
			))}
		</ul>
	);
}

export default TaskList;
