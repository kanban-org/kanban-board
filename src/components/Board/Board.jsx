import React, { useEffect, useState } from "react";
import classes from "./Board.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import Track from "./StatusTrack/Track/Track";

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
						<Track
							totalTasks={totalTasks}
							columnName={columnName}
							colorCode={colorCode}
							tasks={tasks}
							allColumns={allColumns}
							key={column.id}
						/>
					);
				})}

				<div className={classes.addColumn}>
					<button className={"btn " + classes.addColumnBtn}>+ Add Column</button>
				</div>
			</ScrollContainer>
		</>
	);
}

export default Board;
