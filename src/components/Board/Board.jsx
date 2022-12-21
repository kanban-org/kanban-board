import React, { useEffect, useState } from "react";
import TaskBox from "../TaskBox/TaskBox";
import TaskStatusBar from "../TaskStatusBar/TaskStatusBar";
import classes from "./Board.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";

function Board({ boardData }) {
	const [allColumns, setAllColumns] = useState([]);
	const columns = boardData.columns;

	useEffect(() => {
		const allColumnNames = boardData.columns.map((column) => column.columnName);
		setAllColumns(allColumnNames);
	}, [boardData]);

	return (
		<>
			<ScrollContainer
				className={classes.container + " scrollbar scroll-container"}
				hideScrollbars={false}>
				{columns.map((column) => {
					const totalTasks = column.tasks.length;
					const columnName = column.columnName;
					const colorCode = column.colorCode;
					const tasks = column.tasks;
					return (
						<div className={classes.track + " " + classes.taskContainer} key={column.id}>
							<TaskStatusBar colorCode={colorCode} taskCount={totalTasks} statusName={columnName} />
							<ul className={classes.taskList + " scrollbar"} role={["list"]}>
								{tasks.map((task) => (
									<TaskBox
										task={task}
										key={task.id}
										allColumnNames={allColumns}
										currentColumn={columnName}
									/>
								))}
							</ul>
						</div>
					);
				})}

				<div className={classes.track + " " + classes.addColumn}>
					<button className={"btn " + classes.addColumnBtn}>+ Add Column</button>
				</div>
			</ScrollContainer>
		</>
	);
}

export default Board;
