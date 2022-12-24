import React from "react";
import classes from "./Track.module.scss";

import TaskStatusBar from "../TaskStatusBar/TaskStatusBar";
import TaskList from "../TaskList/TaskList";

function Track({ totalTasks, columnName, colorCode, tasks, allColumns }) {
	return (
		<div className={classes.track}>
			<TaskStatusBar colorCode={colorCode} taskCount={totalTasks} statusName={columnName} />
			<TaskList tasks={tasks} allColumns={allColumns} columnName={columnName} />
		</div>
	);
}

export default Track;
