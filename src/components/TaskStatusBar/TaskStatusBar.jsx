import React from "react";
import classes from "./TaskStatusBar.module.scss";

function TaskStatusBar({ colorCode, statusName, taskCount }) {
	return (
		<div className={classes.statusBar}>
			<div className={classes.statusColorBox} style={{ backgroundColor: `${colorCode}` }}></div>
			<h5 className="heading--5">
				{statusName} <span>({taskCount})</span>
			</h5>
		</div>
	);
}

export default TaskStatusBar;
