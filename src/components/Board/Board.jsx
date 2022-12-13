import React from "react";
import TaskBox from "../TaskBox/TaskBox";
import TaskStatusBar from "../TaskStatusBar/TaskStatusBar";
import classes from "./Board.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";

function Board() {
	return (
		<ScrollContainer className={classes.container + " scroll-container"} hideScrollbars={false}>
			<div className={classes.track + " " + classes.taskContainer}>
				<TaskStatusBar colorCode={"#d34234"} taskCount={6} statusName={"todo"} />
				<ul className={classes.taskList} role={["list"]}>
					<TaskBox />
					<TaskBox />
					<TaskBox />
					<TaskBox />
					<TaskBox />
					<TaskBox />
				</ul>
			</div>
			<div className={classes.track + " " + classes.taskContainer}>
				<TaskStatusBar colorCode={"#d3d4"} taskCount={3} statusName={"doing"} />
				<ul className={classes.taskList} role={["list"]}>
					<TaskBox />
					<TaskBox />
					<TaskBox />
				</ul>
			</div>
			<div className={classes.track + " " + classes.taskContainer}>
				<TaskStatusBar colorCode={"pink"} taskCount={5} statusName={"done"} />
				<ul className={classes.taskList} role={["list"]}>
					<TaskBox />
					<TaskBox />
					<TaskBox />
					<TaskBox />
					<TaskBox />
				</ul>
			</div>
			<div className={classes.track + " " + classes.addColumn}></div>
		</ScrollContainer>
	);
}

export default Board;
