import React from "react";
import classes from "./Board.module.scss";

function Board() {
	return (
		<div className={classes.container}>
			<div className={classes.track}>
				<h5 className={classes.title}>
					Todo <span>(6)</span>
				</h5>
			</div>
			<div className={classes.track}>Track</div>
			<div className={classes.track}>Track</div>
			<div className={classes.track}>Track</div>
		</div>
	);
}

export default Board;
