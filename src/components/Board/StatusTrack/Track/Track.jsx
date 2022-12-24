import React from "react";
import classes from "./Track.module.scss";

import TaskStatusBar from "../TaskStatusBar/TaskStatusBar";
import TaskList from "../TaskList/TaskList";
import { useScrollShadow } from "../../../../hooks/useScrollShadow";

function Track({ totalTasks, columnName, colorCode, tasks, allColumns }) {
	const { applyBoxShadow, onScrollHandler } = useScrollShadow(false);

	return (
		<div className={classes.track}>
			<TaskStatusBar
				colorCode={colorCode}
				taskCount={totalTasks}
				statusName={columnName}
				addShadowBottom={applyBoxShadow}
			/>
			<TaskList
				tasks={tasks}
				allColumns={allColumns}
				columnName={columnName}
				onScrollHandler={onScrollHandler}
			/>
		</div>
	);
}

export default Track;
